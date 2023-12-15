/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    // You can define the host and port here
    HOST: "103.195.101.44", // Change as needed
    PORT: process.env.PORT || 5050, // Use the environment port or a default
  },
};

module.exports = nextConfig;
