// setup configuration to mongodb database
import mongoose, { ConnectOptions } from 'mongoose';
import { setEnvVarsConfig, Config } from './config';

export default function () {
  const config: Config = setEnvVarsConfig();

  try {
    mongoose.connect(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    } as ConnectOptions);
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error(error);
  }
}
