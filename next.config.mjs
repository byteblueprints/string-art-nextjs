/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: function (config, env) {
    config.resolve.alias["@"] = path.resolve(__dirname);
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
