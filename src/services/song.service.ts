import { ENDPOINT_URL } from "../consts";
import { ISongDetails, SongResults } from "../dto/ISong";

interface ISongSearchParams {
	q?: string;
	page?: number;
	ipp?: number;
	downloaded?: 0 | 1;
}

const getSongs = async (params: ISongSearchParams): Promise<SongResults> => {
	const searchParams = new URLSearchParams();
	if (typeof params.page != "undefined") {
		searchParams.append("page", String(params.page));
	}
	if (typeof params.ipp != "undefined") {
		searchParams.append("ipp", String(params.ipp));
	}
	if (typeof params.q != "undefined") {
		searchParams.append("q", String(params.q));
	}
	if (typeof params.downloaded != "undefined") {
		searchParams.append("downloaded", String(params.downloaded));
	}

	const res = await fetch(`${ENDPOINT_URL}/songs?${searchParams}`);
	return res.json();
};

const getSongDetails = async (songId: string) => {
	const res = await fetch(`${ENDPOINT_URL}/songs/${songId}`);
	return res.json();
};

const getSongLyrics = async (song: ISongDetails) => {
	const res = await fetch(
		`${ENDPOINT_URL}/files/${song.files.find((f) => f.type === "TXT")?.filename}`
	);
	const buffer = await res.arrayBuffer();
	const decoder = new TextDecoder();
	//const decoder = new TextDecoder("iso-8859-1");
	const text = decoder.decode(buffer);
	return text;
};

const downloadSong = async (songId: string) => {
	const res = await fetch(`${ENDPOINT_URL}/songs/torrent/${songId}`);
	return res.json();
};

export { getSongs, getSongDetails, getSongLyrics, downloadSong };
