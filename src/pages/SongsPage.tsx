import { useCallback, useEffect, useState } from "react";
import { ISong } from "../dto/ISong";
import { SelectedSongDetail } from "../components/songs/SelectedSongDetail";
import { SongList } from "../components/songs/SongList";
import { getSongs } from "../services/song.service";
import { SongSearchBar } from "../components/songs/SongSearchBar";

export const SongsPage = () => {
	const [songs, setSongs] = useState<ISong[]>([]);
	const [page, setPage] = useState<number>(0);
	const [searchTerm, setSearchTerm] = useState<string>();
	const [selectedSong, setSelectedSong] = useState<ISong>();

	useEffect(() => {
		getSongs({ q: searchTerm, downloaded: 1, page })
			.then((results) => {
				setSongs(results.results);
			})
			.catch((err) => {
				console.error(err);
				setSongs([]);
			});
	}, [searchTerm, page]);

	useEffect(() => {
		if (songs.length) {
			setSelectedSong(songs[0]);
		}
	}, [songs]);

	const handleSongSelected = useCallback((song: ISong) => {
		setSelectedSong(song);
	}, []);

	return (
		<>
			<SongSearchBar
				onSearch={(term) => setSearchTerm(term)}
				className="mb-4"
			/>
			<div className="flex">
				<SelectedSongDetail song={selectedSong} />
				<SongList songs={songs} onSongSelected={handleSongSelected} />
			</div>
		</>
	);
};
