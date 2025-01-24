import { CanvasProvider } from "../../contexts/CanvasProvider";
import { Phrase } from "../../lib/songParser";
import { NotePill } from "../karaoke/NotePill";

export const NotesRenderer = ({ phrase }: { phrase: Phrase }) => {
	const lastNote = phrase.notes[phrase.notes.length - 1];
	const phraseLengthInMillis =
		lastNote.startMs + lastNote.lengthMs - phrase.notes[0].startMs;
	const firstNoteStart = phrase.notes[0].startMs;

	return (
		<>
			<CanvasProvider width={800} height={600}>
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
