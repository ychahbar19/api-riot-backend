import mongoose from 'mongoose';
import joigoose from 'joigoose';
import Joi from 'joi';

import type { Joigoose } from 'joigoose';
// import type { SchemaLike } from 'joi';
import type { SchemaDefinition, Schema, Model } from 'mongoose';

import { defaultFields, defaultSchema } from 'src/config/defaultSchema';
// import { objectId } from 'src/plugins/validation.plugin';

const Joigoose: Joigoose = joigoose(mongoose);

const validation: any = Joi.object().keys({
  ...defaultFields,
});

const joiSchema: any = Joigoose.convert(validation);

Object.assign(joiSchema, defaultSchema);
// joiSchema.management = {
//   type: Mongoose.Schema.Types.ObjectId,
//   ref: 'Management',
// };

const schema: Schema = new mongoose.Schema(joiSchema, {
  timestamps: true,
});

// schema.virtual('archives', {
//   ref: 'Archive',
//   localField: '_id',
//   foreignField: 'buildings',
// });

schema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret.id;
  },
});

const model: Model<any> = mongoose.model('Game', schema, 'games');

export { validation as gamesValidation, schema as gameSchema, model as Game };
