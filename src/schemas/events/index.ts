import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  start: Joi.string().required(),
  end: Joi.string().required(),
});
