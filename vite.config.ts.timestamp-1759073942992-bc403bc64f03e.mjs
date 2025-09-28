// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import obfuscator from "file:///home/project/node_modules/rollup-plugin-obfuscator/dist/rollup-plugin-obfuscator.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      mangle: {
        toplevel: true
      }
    },
    rollupOptions: {
      plugins: [
        obfuscator({
          compact: true,
          controlFlowFlattening: true,
          controlFlowFlatteningThreshold: 0.75,
          deadCodeInjection: true,
          deadCodeInjectionThreshold: 0.4,
          debugProtection: true,
          debugProtectionInterval: true,
          disableConsoleOutput: true,
          identifierNamesGenerator: "hexadecimal",
          log: false,
          renameGlobals: false,
          rotateStringArray: true,
          selfDefending: true,
          stringArray: true,
          stringArrayEncoding: ["base64"],
          stringArrayThreshold: 0.75,
          transformObjectKeys: true,
          unicodeEscapeSequence: false
        })
      ],
      output: {
        manualChunks: void 0,
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        assetFileNames: "[name].[hash].[ext]"
      }
    }
  },
  optimizeDeps: {
    exclude: ["lucide-react"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgb2JmdXNjYXRvciBmcm9tICdyb2xsdXAtcGx1Z2luLW9iZnVzY2F0b3InO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBiYXNlOiAnLi8nLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcbiAgICB0ZXJzZXJPcHRpb25zOiB7XG4gICAgICBjb21wcmVzczoge1xuICAgICAgICBkcm9wX2NvbnNvbGU6IHRydWUsXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICB9LFxuICAgICAgbWFuZ2xlOiB7XG4gICAgICAgIHRvcGxldmVsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgb2JmdXNjYXRvcih7XG4gICAgICAgICAgY29tcGFjdDogdHJ1ZSxcbiAgICAgICAgICBjb250cm9sRmxvd0ZsYXR0ZW5pbmc6IHRydWUsXG4gICAgICAgICAgY29udHJvbEZsb3dGbGF0dGVuaW5nVGhyZXNob2xkOiAwLjc1LFxuICAgICAgICAgIGRlYWRDb2RlSW5qZWN0aW9uOiB0cnVlLFxuICAgICAgICAgIGRlYWRDb2RlSW5qZWN0aW9uVGhyZXNob2xkOiAwLjQsXG4gICAgICAgICAgZGVidWdQcm90ZWN0aW9uOiB0cnVlLFxuICAgICAgICAgIGRlYnVnUHJvdGVjdGlvbkludGVydmFsOiB0cnVlLFxuICAgICAgICAgIGRpc2FibGVDb25zb2xlT3V0cHV0OiB0cnVlLFxuICAgICAgICAgIGlkZW50aWZpZXJOYW1lc0dlbmVyYXRvcjogJ2hleGFkZWNpbWFsJyxcbiAgICAgICAgICBsb2c6IGZhbHNlLFxuICAgICAgICAgIHJlbmFtZUdsb2JhbHM6IGZhbHNlLFxuICAgICAgICAgIHJvdGF0ZVN0cmluZ0FycmF5OiB0cnVlLFxuICAgICAgICAgIHNlbGZEZWZlbmRpbmc6IHRydWUsXG4gICAgICAgICAgc3RyaW5nQXJyYXk6IHRydWUsXG4gICAgICAgICAgc3RyaW5nQXJyYXlFbmNvZGluZzogWydiYXNlNjQnXSxcbiAgICAgICAgICBzdHJpbmdBcnJheVRocmVzaG9sZDogMC43NSxcbiAgICAgICAgICB0cmFuc2Zvcm1PYmplY3RLZXlzOiB0cnVlLFxuICAgICAgICAgIHVuaWNvZGVFc2NhcGVTZXF1ZW5jZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB1bmRlZmluZWQsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnW25hbWVdLltoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnW25hbWVdLltoYXNoXS5bZXh0XSdcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUFvQjtBQUN0UCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxnQkFBZ0I7QUFHdkIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1o7QUFBQSxJQUNGO0FBQUEsSUFDQSxlQUFlO0FBQUEsTUFDYixTQUFTO0FBQUEsUUFDUCxXQUFXO0FBQUEsVUFDVCxTQUFTO0FBQUEsVUFDVCx1QkFBdUI7QUFBQSxVQUN2QixnQ0FBZ0M7QUFBQSxVQUNoQyxtQkFBbUI7QUFBQSxVQUNuQiw0QkFBNEI7QUFBQSxVQUM1QixpQkFBaUI7QUFBQSxVQUNqQix5QkFBeUI7QUFBQSxVQUN6QixzQkFBc0I7QUFBQSxVQUN0QiwwQkFBMEI7QUFBQSxVQUMxQixLQUFLO0FBQUEsVUFDTCxlQUFlO0FBQUEsVUFDZixtQkFBbUI7QUFBQSxVQUNuQixlQUFlO0FBQUEsVUFDZixhQUFhO0FBQUEsVUFDYixxQkFBcUIsQ0FBQyxRQUFRO0FBQUEsVUFDOUIsc0JBQXNCO0FBQUEsVUFDdEIscUJBQXFCO0FBQUEsVUFDckIsdUJBQXVCO0FBQUEsUUFDekIsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxRQUNkLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxjQUFjO0FBQUEsRUFDMUI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
