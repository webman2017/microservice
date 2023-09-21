import Joi from 'joi';

const form = Joi.object({
    name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
});

export default { form };
