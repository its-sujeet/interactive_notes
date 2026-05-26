import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/dsa",
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
