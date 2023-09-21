import config from '../config'

const configMongodb = config.mongoDbUsername
  ? `mongodb://${encodeURIComponent(config.mongoDbUsername)}:${encodeURIComponent(
      config.mongoDbPassword?.toString() ?? ""
    )}@${config.mongoDbHost}:${config.mongoDbPort}/${config.mongoDbDatabase}`
  : `mongodb://${config.mongoDbHost}:${config.mongoDbPort}/${config.mongoDbDatabase}`;


export default { configMongodb };

  
  
