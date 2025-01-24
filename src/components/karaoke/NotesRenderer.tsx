import { Phrase } from "../../lib/songParser";

export const NotesRenderer = ({ phrase }: { phrase: Phrase }) => {
	const lastNote = phrase.notes[phrase.notes.length - 1];
	const phraseLengthInMillis =
		lastNote.startMs + lastNote.lengthMs - phrase.notes[0].startMs;
	const firstNoteStart = phrase.notes[0].startMs;

	return (
		<svg className="z-50" viewBox="0 0 800 600">
			{phrase.notes.map((note, i) => (
				<rect
					key={i}
					fill="red"
					x={
						((note.startMs - firstNoteStart) /
							phraseLengthInMillis) *
						800
					}
					y={500 - (60 + note.pitch * 15)}
					width={800 * (note.lengthMs / phraseLengthInMillis)}
					height={20}
				/>
			))}
		</svg>
	);
};
