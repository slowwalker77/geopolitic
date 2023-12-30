/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {};
const path = require('path');

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 절대 경로 설정
    config.resolve.alias['@'] = path.join(__dirname, '.');

    // 추가적인 webpack 설정을 여기에 작성할 수 있습니다.

    return config;
  },
  
  images: {
    domains: ['cdn.steemitimages.com'], // 이미지 호스트를 추가
  },
};
