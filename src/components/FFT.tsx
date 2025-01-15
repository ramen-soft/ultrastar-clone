import { useEffect, useState } from "react";
import webfft from "webfft";

const noteNames = [
	"C",
	"C#",
	"D",
	"D#",
	"E",
	"F",
	"F#",
	"G",
	"G#",
	"A",
	"A#",
	"B",
];

const getNoteFromFrequency = (frequency: number): string => {
	if (frequency <= 0) return "Unknown";

	// Calcular el número MIDI
	const midiNumber = Math.round(69 + 12 * Math.log2(frequency / 440));

	// Calcular la octava y el nombre de la nota
	const noteIndex = midiNumber % 12;
	const octave = Math.floor(midiNumber / 12) - 1;
	const noteName = noteNames[noteIndex];

	return `${noteName}${octave}`;
};

const getFundFreq = (audioData: Float32Array, sampleRate: number) => {
	const fftSize = audioData.length / 2;
	const fft = new webfft(fftSize);
	const spectrum = fft.fft(audioData);
	const magnitudes = new Float32Array(fftSize / 2);

	for (let i = 0; i < fftSize / 2; i++) {
		const real = spectrum[2 * i];
		const imag = spectrum[2 * i + 1];
		magnitudes[i] = Math.sqrt(real * real + imag * imag);
	}

	let maxMag = -Infinity;
	let maxIndex = -1;
	for (let i = 1; i < magnitudes.length; i++) {
		if (magnitudes[i] > maxMag) {
			maxMag = magnitudes[i];
			maxIndex = i;
		}
	}

	const fund = (maxIndex * sampleRate) / fftSize;
	return { freq: fund, mag: maxMag };
};

export const FFT = () => {
	const [note, setNote] = useState<string>("-");
	const [freq, setFreq] = useState<number>();
	const [mag, setMag] = useState<number>(0);

	useEffect(() => {
		const analizarAudio = async () => {
			const audioContext = new AudioContext();
			const anal = audioContext.createAnalyser();
			const fftSize = 4096;

			anal.fftSize = fftSize;

			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			const source = audioContext.createMediaStreamSource(stream);
			source.connect(anal);

			const audioData = new Float32Array(fftSize * 2);

			const processAudio = () => {
				const tddata = new Float32Array(fftSize);
				anal.getFloatTimeDomainData(tddata);

				for (let i = 0; i < fftSize; i++) {
					audioData[2 * i] = tddata[i];
					audioData[2 * i + 1] = 0;
				}

				const fund = getFundFreq(audioData, audioContext.sampleRate);

				if (fund.mag > 50) {
					setFreq(fund.freq);
					setMag(fund.mag);
					const detectedNote = getNoteFromFrequency(fund.freq);
					setNote(detectedNote);
				}

				requestAnimationFrame(processAudio);
			};

			processAudio();
		};

		analizarAudio();
	}, []);
	return (
		<>
			<p>FFT</p>
			{freq} - {note} - {mag}
		</>
	);
};
