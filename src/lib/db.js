import mongo from 'mongoose';

const MONGO_URI = 'mongodb://localhost/koaTest';

mongo.connect(MONGO_URI, { useNewUrlParser: true });
mongo.connection.on('connected', async () => {
  console.log('MoogoDB connect success');
});
mongo.connection.on('error', () => { console.error('MoogoDB connect fail'); });
mongo.connection.on('disconnected', () => { console.error('MoogoDB connect disconnected'); });
