import mongo from 'mongoose';
import globalEventEmitter, { GLOBAL_EVENT } from '../core/GloabelEventEmitter';

const MONGO_URI = 'mongodb://localhost/koaTest';

const options = {
  useNewUrlParser: true,
  server: {
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000,
    },
    reconnectTries: 30,
    reconnectInterval: 3000,
  },
};

class MongoDB {
  static connect() {
    mongo.connect(MONGO_URI, options);
  }

  static initEvent() {
    mongo.connection.on('connected', async () => {
      console.log('MoogoDB connect success');
      globalEventEmitter.fireEvent({ name: GLOBAL_EVENT.MONGODB_INITED });
    });
    mongo.connection.on('error', () => { console.error('MoogoDB connect fail'); });
    mongo.connection.on('disconnected', () => { console.error('MoogoDB connect disconnected'); });
  }

  static init() {
    MongoDB.connect();
    MongoDB.initEvent();
  }

  static get STATE() {
    return mongo.STATES;
  }
}

export default MongoDB;
