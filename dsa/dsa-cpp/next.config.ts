import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dsa",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
