import Joi from 'joi';

const get = Joi.object({
    limit: Joi.number().required().default(null),
    // limit: Joi.number().integer().positive().required(),
    // page: Joi.string().required(),
});

const getById = Joi.object({
    id: Joi.string().required(),
});
const documentById = Joi.object({
    documentId: Joi.number().required(),
});
export default { get, getById, documentById };
