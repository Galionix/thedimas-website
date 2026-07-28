/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
		domains: [
			'via.placeholder.com',
			'picsum.photos',
			'res.cloudinary.com',
		],
  },
  i18n: {
    locales: ["default", "ua", "en"],
    defaultLocale: "default",
    localeDetection: false,
  },
}

module.exports = nextConfig
