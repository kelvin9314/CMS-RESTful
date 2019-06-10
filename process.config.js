module.exports = {
  apps: [
    {
      name: "MP-Library-CMS",
      script: "src/api/server.js",
      instances: 1,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
}