import { Note } from "../../lib/songParser";

export const NoteText = ({ note }: { note: Note }) => {
	return <text y={100}>{note.text}</text>;
};
