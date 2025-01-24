import { CanvasProvider } from "../../contexts/CanvasProvider";
import { ISongDescriptor, Phrase } from "../../lib/songParser";
import { NotePill } from "../karaoke/NotePill";
import { TimeMarker } from "./TimeMarker";

export const PhraseRenderer = ({
	phrase,
}: {
	song: ISongDescriptor;
	phrase: Phrase;
}) => {
	const lastNote = phrase.notes[phrase.notes.length - 1];
	const phraseLengthInMillis =
		lastNote.startMs + lastNote.lengthMs - phrase.notes[0].startMs;
	const firstNoteStart = phrase.notes[0].startMs;

	return (
		<>
			{/*<pre>{JSON.stringify(phrase, null, 4)}</pre>*/}
			<CanvasProvider width={800} height={600}>
				<TimeMarker mark={1.5} phraseMillis={phraseLengthInMillis} />
				{phrase.notes.map((note) => (
					<NotePill
						x={
							((note.startMs - firstNoteStart) /
								phraseLengthInMillis) *
							800
						}
						y={500 - (60 + note.pitch * 15)}
						length={800 * (note.lengthMs / phraseLengthInMillis)}
						text={note.text}
					/>
				))}
			</CanvasProvider>
		</>
	);
};
