export interface APIResult<T> {
	total: number;
	page: number;
	totalPages: number;
	count: number;
	results: T[];
}
