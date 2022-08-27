import { Injectable } from '@nestjs/common';

import * as Joi from 'joi';
import * as dotenv from 'dotenv';
import { join, resolve } from 'path';

@Injectable()
export class ConfigService {
  constructor() {
    this.setEnvVarsConfig();
  }

  setEnvVarsConfig() {
    // Set the NODE_ENV to 'development' by default
    const dirname = resolve();
    const envPath = join(dirname, '/.env');
    const envFound = dotenv.config({ path: envPath });
    process.env.NODE_ENV = process.env.NODE_ENV || 'development';

    if (envFound.error) {
      // This error should crash whole process
      throw new Error("⚠️  Couldn't find .env file  ⚠️");
    }

    // Define validation for all the env vars
    const envVarsSchema = () => {
      return Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        API_VERSION: Joi.string().default('v1'),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRES_IN: Joi.string().default('15m'),
        JWT_REFRESH_TOKEN_EXPIRES_IN: Joi.string().default('15m'),
        // JWT_SECRET: Joi.string().required().description('JWT Secret required to sign'),
        // JWT_EXPIRATION_MINUTES: Joi.number()
        //   .default(30)
        //   .description('minutes after which tokens expire'),
        // JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
        //   .default(30)
        //   .description('days after which refresh tokens expire'),
        MONGODB_CLUSTER: Joi.string()
          .required()
          .description('Mongo DB cluster url'),
        MONGODB_USERNAME: Joi.string()
          .required()
          .description('Mongo DB username'),
        MONGODB_PASSWORD: Joi.string()
          .required()
          .description('Mongo DB password'),
        MONGODB_URI_DEV: Joi.string()
          .required()
          .description('Mongo DB host url'),
        MONGODB_URI_PROD: Joi.string()
          .required()
          .description('Mongo DB host url'),
      }).unknown();
    };

    // const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
    let envVars = null;
    let config = {};
    (function () {
      try {
        envVars = envVarsSchema().validate(process.env);
      } catch (error) {
        console.log(error);
        throw new Error(`Config validation error: ${error.message}`);
      }
    })();
    if (envVars) {
      const mongoDB_URI =
        envVars.NODE_ENV === 'production'
          ? `mongodb+srv://${envVars.MONGODB_USERNAME}:${envVars.MONGO_PASSWORD}@${envVars.MONGODB_CLUSTER}.${envVars.MONGODB_URI_PROD}`
          : `mongodb+srv://${envVars.MONGODB_USERNAME}:${envVars.MONGO_PASSWORD}@${envVars.MONGODB_CLUSTER}.${envVars.MONGODB_URI_DEV}`;

      config = {
        env: envVars.NODE_ENV,
        port: envVars.PORT,
        apiVersion: envVars.API_VERSION,
        // jwtSecret: envVars.JWT_SECRET,
        // jwtExpirationInterval: envVars.JWT_EXPIRATION_MINUTES,
        // jwtRefreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        mongo: {
          uri: mongoDB_URI,
        },
      };
      return config;
    }
  }
}
