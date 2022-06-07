const withPlugins = require("next-compose-plugins");
const path = require("path");
const withTM = require("next-transpile-modules")(["@nosearch/ui"]);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 60 * 10,
    domains: [
      "ns-api-server.s3.ap-northeast-2.amazonaws.com",
      "nosearch.com",
      "ns-api-server-test.s3.ap-northeast-2.amazonaws.com",
      "nosearch-cdn-1.s3.amazonaws.com",
      "ns-curation.s3.ap-northeast-2.amazonaws.com",
      "d21x3meyyr2jva.cloudfront.net",
      "api.nosearch.com",
      "nosearch-cdn-1.s3.ap-northeast-2.amazonaws.com",
      "m.store.nosearch.com",
      "phinf.pstatic.net",
    ],
  },
  generateBuildId: () => "build_" + new Date().getTime(),
  typescript: {
    ignoreBuildErrors: true,
  },
};

const workspaceRoot = path.resolve(__dirname, "../..");
const projectRoot = __dirname;
module.exports = withPlugins(
  [
    withTM({
      webpack: (config) => {
        // if (options.isServer) {
        //   config.externals = ["react", ...config.externals];
        // }

        config.resolve.modules = [
          ...config.resolve.modules,
          path.resolve(projectRoot, "node_modules"),
          path.resolve(workspaceRoot, "node_modules"),
        ];

        return config;
      },
    }),
  ],
  nextConfig
);
