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
    locales: ["ua", "en"],
    defaultLocale: "ua",
  },
}

module.exports = nextConfig
