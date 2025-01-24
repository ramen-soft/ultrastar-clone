import { useEffect, useState } from "react";
import { COVERS_URL, ENDPOINT_URL } from "../../consts";
import { ISong, ISongDetails } from "../../dto/ISong";
import { SongPreviewVideo } from "./SongPreviewVideo";
import { getSongDetails } from "../../services/song.service";
import { Link } from "@tanstack/react-router";

export const SelectedSongDetail = ({ song }: { song?: ISong }) => {
	const [songDetails, setSongDetails] = useState<ISongDetails>();

	useEffect(() => {
		if (song) {
			getSongDetails(song.id).then((details) => setSongDetails(details));
		}
	}, [song]);

	const poster = song ? `${COVERS_URL}/${song.id}.jpg` : undefined;
	const videoFile = songDetails?.files.find((f) => f.type === "VIDEO");
	const audioFile = songDetails?.files.find((f) => f.type === "AUDIO");
	const videoUrl = videoFile
		? `${ENDPOINT_URL}/files/${videoFile.filename}`
		: undefined;
	const audioUrl = audioFile
		? `${ENDPOINT_URL}/files/${audioFile.filename}`
		: undefined;
	return (
		<div className="w-[360px] mr-4">
			{songDetails && (
				<>
					<SongPreviewVideo
						src={videoUrl}
						audioSrc={audioUrl}
						poster={poster}
					/>

					<div className="mb-4">
						<h2 className="text-2xl">{songDetails.name}</h2>
						<h3 className="text-xl mb-2">{songDetails.artist}</h3>
						<p className="text-sm">{songDetails.description}</p>
					</div>

					<Link
						to="/sing/$songId"
						params={{ songId: songDetails.id }}
						className="block text-center w-full px-4 py-2 bg-black rounded-md text-white"
					>
						Cantar
					</Link>
				</>
			)}
		</div>
	);
};
