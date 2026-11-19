/// <reference types="vite/client" />

/** The latest release tag of each project, keyed by its href; filled in by vite.config.ts. */
declare const __RELEASES__: Record<string, string>

/** vite-imagetools `as=picture` imports: srcsets per format plus the largest fallback image. */
declare module '*&as=picture' {
  const picture: { sources: Record<string, string>; img: { src: string; w: number; h: number } }
  export default picture
}
