module.exports = {
  apps: [
    {
      name: "snaphunt-api",
      script: "./build/index.js",
      watch: false,
      env: {
        NODE_ENV: "staging"
      }
    }
  ]
};
