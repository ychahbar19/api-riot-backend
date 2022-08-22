import Mongoose from 'mongoose';
import Joi from 'joi';
import { objectId } from '../plugins/validation.plugin';

const defaultFields: object = {
  createdBy: Joi.string().custom(objectId),
  updatedBy: Joi.string().custom(objectId),
};

const defaultSchema: object = {
  createdBy: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  updatedBy: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
};

export { defaultFields, defaultSchema };
