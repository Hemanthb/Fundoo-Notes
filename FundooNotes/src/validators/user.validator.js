import Joi from '@hapi/joi';

export const newUserValidator = (req, res, next) => {
  const schema = Joi.object({
    FirstName: Joi.string().min(4).required(),
    LastName: Joi.string().min(1).required(),
    EmailId:Joi.string().email().required(),
    Password:Joi.string().min(8).required()

  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
