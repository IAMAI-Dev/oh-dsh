/**
 * Build-time facts injected by scripts/build.mjs via esbuild `define`. The
 * packaged client never reads repository files; each `declare const` is
 * replaced with a literal at bundle time.
 */

/** Pinned upstream DeepSeek Harness release from dsh-source.json. */
declare const __OH_DSH_SOURCE_VERSION__: string

/** Bundled plugin identities and versions from every plugin manifest. */
declare const __OH_DSH_PLUGIN_VERSIONS__: string

/** Key toolchain dependency versions from the root package.json. */
declare const __OH_DSH_DEPENDENCY_VERSIONS__: string

export interface VersionEntry {
  id: string
  version: string
}

function parseEntries(raw: string): VersionEntry[] {
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((entry): entry is VersionEntry => {
      return typeof entry === 'object' && entry !== null
        && typeof (entry as VersionEntry).id === 'string'
        && typeof (entry as VersionEntry).version === 'string'
    })
  } catch {
    return []
  }
}

export interface AboutVersions {
  dependencies: VersionEntry[]
  plugins: VersionEntry[]
  sourceVersion: string
}

export function aboutVersions(): AboutVersions {
  return {
    dependencies: parseEntries(__OH_DSH_DEPENDENCY_VERSIONS__),
    plugins: parseEntries(__OH_DSH_PLUGIN_VERSIONS__),
    sourceVersion: typeof __OH_DSH_SOURCE_VERSION__ === 'string'
      ? __OH_DSH_SOURCE_VERSION__
      : '0.0.0',
  }
}
