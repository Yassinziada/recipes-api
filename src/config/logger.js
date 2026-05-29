const pinoModule = require("pino");
const env = require("./env");

const pino = pinoModule.pino || pinoModule;

const logger = pino({
  level: env.logLevel
});

module.exports = logger;