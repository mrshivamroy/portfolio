/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Applies to all routes across the entire site
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" } ,
          { key: "X-Content-Type-Options", value: "nosniff" } ,
          { key: "X-XSS-Protection", value: "1; mode=block" } ,
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" } ,
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ],
      },
    ] ;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // allow all images from Cloudinary
      },
    ],
  },
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
  reactCompiler: true,
};

export default nextConfig;
