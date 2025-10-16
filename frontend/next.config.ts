/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Build sırasında ESLint hatalarını yok say
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type hataları build'i durdurmasın
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
