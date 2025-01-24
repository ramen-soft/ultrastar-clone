import React from "react";
import { ISong } from "../../dto/ISong";
import { downloadSong } from "../../services/song.service";
import { SongSquare } from "./SongSquare";

export const SongList = React.memo(
	({
		songs,
		onSongSelected,
	}: {
		songs: ISong[];
		onSongSelected: (song: ISong) => void;
	}) => {
		const handleSongClick = (song: ISong) => {
			if (song.downloaded) {
				onSongSelected(song);
			} else {
				downloadSong(song.id);
			}
		};

		return (
			<>
				<div className="grid w-full grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2">
					{songs.map((song) => (
						<SongSquare
							onClick={handleSongClick}
							key={song.id}
							songInfo={song}
						/>
					))}
				</div>
			</>
		);
	}
);
