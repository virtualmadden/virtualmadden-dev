import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/content'

type Release = { tag_name: string; draft: boolean }

// The newest release of each project's GitHub repo, pre-releases included, keyed by the project's
// href. It is read at build time because the page's CSP allows only same-origin requests; the
// nightly deploy keeps it fresh. A failed lookup leaves that project's status tag in place.
async function latestReleases(): Promise<Record<string, string>> {
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const found = await Promise.all(
    projects.map(async ({ href }) => {
      const repo = href?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)$/)?.[1]
      if (!href || !repo) return []
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=5`, {
          headers,
          signal: AbortSignal.timeout(10_000),
        })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const release = ((await response.json()) as Release[]).find((r) => !r.draft)
        return release ? [[href, release.tag_name] as const] : []
      } catch (error) {
        console.warn(`Could not read the latest release of ${repo}: ${String(error)}`)
        return []
      }
    }),
  )
  return Object.fromEntries(found.flat())
}

// https://vite.dev/config/
export default defineConfig(async ({ command }) => ({
  plugins: [react()],
  define: {
    __RELEASES__: JSON.stringify(command === 'build' ? await latestReleases() : {}),
  },
}))
