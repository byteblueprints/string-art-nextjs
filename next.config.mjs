/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: function (config, env) {
        // set resolve.fallback
        config.resolve.fallback = {
          fs: false,
          path: false,
          crypto: false,
        };
        return config;
      }
};

export default nextConfig;
