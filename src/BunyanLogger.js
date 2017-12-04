import bunyan from 'bunyan';

class BunyanLogger {

  constructor() {
    this.logger = bunyan.createLogger({name: "App"});
  }

  log(message) {
    this.logger.info(message);
  }

}

export let Logger = new BunyanLogger();
