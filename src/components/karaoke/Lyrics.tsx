import { useContext, useState } from "react";
import { ISongDescriptor, Phrase } from "../../lib/songParser";
import { VideoPlayContext } from "../../contexts/videoplay.context";
import { PhraseRenderer } from "./PhraseRenderer";

export const Lyrics = ({
	data,
	onPhraseChange,
}: {
	data: ISongDescriptor;
	onPhraseChange: (phrase: Phrase) => void;
}) => {
	const lyrics = data.phrases;
	const { playbackTime } = useContext(VideoPlayContext);
	const [currentLine, setCurrentLine] = useState(0);

	const pbgap = Math.max(0, playbackTime - Number(data.headers.gap) / 1000);

	if (lyrics[currentLine].lengthMs < pbgap) {
		onPhraseChange(lyrics[currentLine + 1]);
		setCurrentLine((current) => current + 1);
	}
	return (
		<div className="absolute z-10 w-full bottom-0">
			<PhraseRenderer phrase={lyrics[currentLine]} time={pbgap} />
		</div>
	);
};
