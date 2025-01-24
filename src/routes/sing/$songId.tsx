import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getSongDetails, getSongLyrics } from "../../services/song.service";
import { ISongDescriptor, parseSong, Phrase } from "../../lib/songParser";
import { PhraseRenderer } from "../../components/phrase/PhraseRenderer";
import { Karaoke } from "../../components/karaoke/Karaoke";

export const Route = createFileRoute("/sing/$songId")({
	component: RouteComponent,
});

function RouteComponent() {
	const { songId } = Route.useParams();
	const [lyrics, setLyrics] = useState<ISongDescriptor>();
	const [currentPhrase, setCurrentPhrase] = useState<number>(0);

	useEffect(() => {
		getSongDetails(songId).then((song) => {
			getSongLyrics(song).then((lyr) => {
				const parsed = parseSong(lyr);
				console.log(parsed);
				setLyrics(parsed);
			});
		});
	}, [songId]);

	const phrase = lyrics?.phrases[currentPhrase];

	return (
		<>
			<Karaoke songId={songId} />
			{/*
			<button
				onClick={() => setCurrentPhrase((cp) => Math.max(0, cp - 1))}
			>
				Anterior
			</button>
			<button
				onClick={() =>
					setCurrentPhrase((cp) =>
						Math.min(lyrics!.phrases.length - 1, cp + 1)
					)
				}
			>
				Siguiente
			</button>

			{phrase && <PhraseRenderer song={lyrics} phrase={phrase} />}
			<pre>{JSON.stringify(phrase, null, 4)}</pre>
			*/}
		</>
	);
}
