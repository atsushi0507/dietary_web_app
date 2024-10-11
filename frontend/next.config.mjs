/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true // SWC を強制使用
    },
    compiler: {
        styledComponents: true
    }
};

export default nextConfig;