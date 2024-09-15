/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: function (config, env) {
    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
    };
    return config;
  },
  output: "export",
};

export default nextConfig;
