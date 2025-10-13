let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config');
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    unoptimized: true
  },
  experimental: {
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true
  }
};

mergeConfig(nextConfig, userConfig);

/**
 * Merge a user-supplied Next.js configuration into a base Next.js config object.
 *
 * Shallowly merges top-level keys: when a key in both configs is an object (and not an array),
 * its properties are merged with `userConfig` taking precedence; otherwise the key is replaced.
 * This function mutates `nextConfig` in place.
 *
 * @param {Object} nextConfig - The base Next.js configuration object to be modified.
 * @param {Object|undefined|null} userConfig - The user-provided configuration overrides; if falsy, no changes are made.
 */
function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return;
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key]
      };
    } else {
      nextConfig[key] = userConfig[key];
    }
  }
}

export default nextConfig;