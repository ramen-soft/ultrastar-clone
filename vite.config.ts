import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"pffft.simd": "/src/lib/pffft/pffft.simd.js",
		},
	},
	plugins: [TanStackRouterVite(), react()],
});
