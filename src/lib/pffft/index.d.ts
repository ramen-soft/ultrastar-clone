declare module "pffft.simd" {
	const pffft_simd: () => Promise<unknown>;
	export default pffft_simd;
}
