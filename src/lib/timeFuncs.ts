export const getTimeForBeats = (BPM: number, beats: number): number => {
	return ((60 / BPM) * beats) / 4;
};

export const getBeats = (BPM: number, millis: number): number => {
	return (BPM * millis) / 60;
};

export const getTimeFromBeat = (
	beat: number,
	BPM: number,
	gap: number = 0
): number => {
	return gap / 1000 + (beat * 60) / BPM;
};
