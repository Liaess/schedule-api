import Joi from "joi";

export const eventSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.string().required(),
  endDate: Joi.string().required(),
});
