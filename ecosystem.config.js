/* Deixamos como pedido no site do pm2, porém, com apenas o array 'apps' e setando o endereço
de 'script' para o nosso server */
module.exports = {
  apps : [{
    name: "app",
    script: "./src/server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
