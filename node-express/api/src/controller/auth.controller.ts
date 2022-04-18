import { Request, Response } from "express";
import { RegisterValidation } from "../validation/register.validation";
import {Funcionario} from "../entity/funcionario.entity";
import bcyptjs from "bcryptjs";
import { getManager } from "typeorm";
import {sign, verify} from "jsonwebtoken";

export const Register = async (req: Request, res: Response) => {
    const body = req.body;

    const {error} = RegisterValidation.validate(body);

    if (error) {
        return res.status(400).send(error.details);
    }

    if(body.senha !== body.confirma_senha) {
        return res.status(400).send({
            message: "Verificar confirmação de senha"
        })
    }

    const repository = getManager().getRepository(Funcionario);
    //console.log(body);
    const {senha, ...funcionario} = await repository.save({
        nome: body.nome,
        funcao: body.funcao,
        login: body.login,
        senha: await bcyptjs.hash(body.senha, 10)
    });

    res.send(funcionario);
}

export const Login = async (req: Request, res: Response) => {

    const body = req.body;
    const repository = getManager().getRepository(Funcionario);

    const funcionario = await repository.findOne({
        where: { 
            login: body.login 
          } 

        });

    if (!funcionario) {
        return res.status(400).send({
            message: 'invalid credentials!'
        })
    }

    if (!await bcyptjs.compare(req.body.senha, funcionario.senha)) {
        return res.status(400).send({
            message: 'invalid credentials!'
        })
    }

    const token = sign({funcionario_id: funcionario.funcionario_id}, process.env.SECRET_KEY);

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1day
    });

    res.send({
        message: 'success'
    });

    //const {senha, ...data} = funcionario;

    //res.send(data);
}

export const AuthenticatedFuncionario = async (req: Request, res: Response) => {

    const {senha, ...funcionario} = req['funcionario'];

    res.send(funcionario);

}

export const Logout = async (req: Request, res: Response) => {
    res.cookie('jwt', '', {maxAge: 0});

    res.send({
        message: 'success'
    })
}

export const UpdateInfoFuncionario = async (req: Request, res: Response) => {
    const funcionario = req['funcionario'];

    const repository = getManager().getRepository(Funcionario);

    await repository.update(funcionario.funcionario_id, req.body);

    const {senha, ...data} = await repository.findOne({
        where: { 
            funcionario_id: funcionario.funcionario_id 
        } 

        });

    res.send(data);
}

export const UpdateSenha = async (req: Request, res: Response) => {
    const funcionario = req['funcionario'];

    if (req.body.senha !== req.body.confirma_senha) {
        return res.status(400).send({
            message: "Senhas não batem"
        });
    }

    const repository = getManager().getRepository(Funcionario);

    await repository.update(funcionario.funcionario_id, {
        senha: await bcyptjs.hash(req.body.senha, 10)
    });

    const {senha, ...data} = funcionario;

    res.send(data);
}
