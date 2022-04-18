import {Joi} from "express-validation";

export const RegisterValidation = Joi.object({
    nome: Joi.string().required(),
    funcao: Joi.string().required(),
    login: Joi.string().required(),
    senha: Joi.string().required(),
    confirma_senha: Joi.string().required(),

});