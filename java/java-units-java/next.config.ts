import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/java",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
