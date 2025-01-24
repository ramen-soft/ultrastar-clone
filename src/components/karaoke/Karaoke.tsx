import { useEffect, useState } from "react";
import { getSongDetails, getSongLyrics } from "../../services/song.service";
import { ISongDescriptor, parseSong, Phrase } from "../../lib/songParser";
import { ISongDetails } from "../../dto/ISong";
import { PlaybackContext } from "../../contexts/videoplay.provider";
import { VideoTimer } from "./VideoTimer";
import { ENDPOINT_URL } from "../../consts";
import { Lyrics } from "./Lyrics";
import { NotesRenderer } from "./NotesRenderer";

export const Karaoke = ({ songId }: { songId: string }) => {
	const [song, setSong] = useState<ISongDetails>();
	const [info, setInfo] = useState<ISongDescriptor>();
	const [currentPhrase, setCurrentPhrase] = useState<Phrase | undefined>(
		info?.phrases[0]
	);

	useEffect(() => {
		getSongDetails(songId).then((song) => {
			setSong(song);
			getSongLyrics(song).then((lyr) => {
				const parsed = parseSong(lyr);
				setInfo(parsed);
				setCurrentPhrase(parsed.phrases[0]);
			});
		});
	}, [songId]);

	const videoFile = song?.files.find((f) => f.type == "VIDEO")?.filename;
	const audioFile = song?.files.find((f) => f.type == "AUDIO")?.filename;

	const handlePhraseChange = (phrase: Phrase) => setCurrentPhrase(phrase);

	return (
		<div className="absolute left-0 top-0 bottom-0 right-0 overflow-hidden flex flex-col">
			{videoFile && (
				<>
					{currentPhrase && <NotesRenderer phrase={currentPhrase} />}

					<PlaybackContext
						src={`${ENDPOINT_URL}/files/${videoFile}`}
						audioSrc={
							audioFile
								? `${ENDPOINT_URL}/files/${audioFile}`
								: undefined
						}
					>
						<VideoTimer />
						{info && (
							<Lyrics
								data={info}
								onPhraseChange={handlePhraseChange}
							/>
						)}
					</PlaybackContext>
				</>
			)}
		</div>
	);
};
