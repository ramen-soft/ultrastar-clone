import { APIResult } from "./APIResult";

export interface ISong {
	id: string;
	name: string;
	description: string;
	artist: string;
	downloaded: boolean;
}

export interface ISongProp {
	name: string;
	value: string;
}
export interface ISongFile {
	filename: string;
	type: string;
}

export type ISongDetails = ISong & {
	props: ISongProp[];
	files: ISongFile[];
};

export type SongResults = APIResult<ISong>;
