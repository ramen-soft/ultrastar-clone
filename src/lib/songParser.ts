import { getTimeForBeats } from "./timeFuncs";

const HEADER_TYPES: Record<
	string,
	{ name: string; type: "number" | "string" }
> = {
	TITLE: { name: "title", type: "string" },
	ARTIST: { name: "artist", type: "string" },
	LANGUAGE: { name: "language", type: "string" },
	GENRE: { name: "genre", type: "string" },
	YEAR: { name: "year", type: "string" },
	COVER: { name: "cover", type: "string" },
	VIDEO: { name: "video", type: "string" },
	MP3: { name: "audio", type: "string" },
	BPM: { name: "bpm", type: "number" },
	GAP: { name: "gap", type: "number" },
	MEDLEYSTARTBEAT: { name: "medleyStart", type: "number" },
	MEDLEYENDBEAT: { name: "medleyEnd", type: "number" },
	P1: { name: "player1", type: "string" },
	P2: { name: "player2", type: "string" },
};

const NOTE_STANDARD = ":";
const NOTE_GOLDEN = "*";
const NOTE_FREESTYLE = "F";
const NOTE_RAP = "R";
const NOTE_RAP_GOLDEN = "G";

const NOTECHAR = [
	NOTE_STANDARD,
	NOTE_GOLDEN,
	NOTE_FREESTYLE,
	NOTE_RAP,
	NOTE_RAP_GOLDEN,
];

const PHRASE_END = "-";
const EOF = "E";

export type Note = {
	type: string;
	start: number;
	startMs: number;
	length: number;
	lengthMs: number;
	pitch: number;
	text: string;
};

type EndOfPhrase = {
	type: string;
	start: number;
};

type EndOfFile = {
	type: string;
};

export type Phrase = {
	start: number;
	startMs: number;
	lengthMs: number;
	notes: Array<Note>;
};

export interface ISongDescriptor {
	headers: Record<string, number | string>;
	phrases: Array<Phrase>;
}

export const parseSong = (source: string): ISongDescriptor => {
	const lines = source.split("\n");
	const headers: Record<string, number | string> = {};
	const notes: Array<Note | EndOfPhrase | EndOfFile> = [];
	for (const line of lines) {
		if (line[0] == "#") {
			//es un header
			const headerEntry = /#([A-Z]+):(.*)/.exec(line);
			if (headerEntry) {
				const htype: { name: string; type: string } =
					HEADER_TYPES[String(headerEntry[1])];
				if (htype) {
					headers[htype.name] =
						htype.type === "number"
							? Number(headerEntry[2].replace(",", "."))
							: String(headerEntry[2]);
				}
			}
		} else {
			//es una nota
			const character = line[0];
			switch (character) {
				case NOTE_STANDARD:
				case NOTE_GOLDEN:
				case NOTE_RAP:
				case NOTE_RAP_GOLDEN:
				case NOTE_FREESTYLE:
					{
						const parts = /.\s(\d+)\s(\d+)\s(-?\d+)\s(.*)/.exec(
							line
						);
						if (parts) {
							console.log(headers.bpm);
							const lengthMs = getTimeForBeats(
								Number(headers.bpm),
								Number(parts[2])
							);
							const startMs = getTimeForBeats(
								Number(headers.bpm),
								Number(parts[1])
							);
							const note: Note = {
								type: character,
								start: Number(parts[1]),
								startMs,
								length: Number(parts[2]),
								lengthMs,
								pitch: Number(parts[3]),
								text: parts[4],
							};
							notes.push(note);
						}
					}
					break;
				case PHRASE_END:
					{
						const parts = /.\s(\d+)/.exec(line);
						if (parts) {
							const phraseEnd: EndOfPhrase = {
								type: character,
								start: Number(parts[1]),
							};
							notes.push(phraseEnd);
						}
					}
					break;
				case EOF: {
					const eofNote: EndOfFile = {
						type: character,
					};
					notes.push(eofNote);
				}
			}
		}
	}
	const phrases: Array<Phrase> = [];
	let phrase: Phrase = {
		start: 0,
		startMs: 0,
		lengthMs: 0,
		notes: new Array<Note>(),
	};
	//separamos las notas en frases:
	for (const note of notes) {
		if (note.type === PHRASE_END || note.type === EOF) {
			const end = (note as EndOfPhrase).start;
			const endMs = getTimeForBeats(Number(headers.bpm), end);
			phrase.lengthMs = endMs;
			phrases.push(phrase);
			phrase = {
				start: end,
				startMs: endMs,
				lengthMs: 0,
				notes: new Array<Note>(),
			};
			continue;
		}
		if (NOTECHAR.includes(note.type)) {
			phrase.notes.push(note as Note);
		}
	}

	const descriptor: ISongDescriptor = {
		phrases,
		headers,
	};
	return descriptor;
};
