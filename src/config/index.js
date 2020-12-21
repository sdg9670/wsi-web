class ConfigManager {
  static config = require(`./${process.env.NODE_ENV}.json`);
}

export default ConfigManager;
