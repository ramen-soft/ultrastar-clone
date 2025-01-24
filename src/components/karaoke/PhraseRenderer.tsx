import { Phrase } from "../../lib/songParser";

export const PhraseRenderer = ({
	phrase,
	time,
}: {
	phrase: Phrase;
	time: number;
}) => {
	return (
		<svg viewBox="0 0 400 70" xmlns="http://www.w3.org/2000/svg">
			<text y={50} x="50%" textAnchor="middle">
				{phrase.notes.map((note, i) => {
					const sang = note.startMs < time;
					return (
						<tspan
							key={i}
							className={sang ? "fill-pink-500" : "fill-gray-400"}
						>
							{note.text}
						</tspan>
					);
				})}
			</text>
		</svg>
	);
};
