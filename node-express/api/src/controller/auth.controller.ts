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

    // const query_procedures = `DROP PROCEDURE IF EXISTS filterSearch
    // CREATE PROCEDURE filterSearch(pesquisa text)
    // BEGIN
    //     IF EXISTS (SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa)
    //     THEN
    //     SELECT * FROM sibe.cliente WHERE cpf = pesquisa OR nome = pesquisa;
    //     else
    //     SELECT * FROM sibe.carreta WHERE placa = pesquisa;
    //     END IF;
    // END;`;
    

    // const rawData = await getManager().query(query_procedures);

    // var query_procedures =
	// 	"DROP PROCEDURE IF EXISTS sibe.notificacao\n"
    //     "CREATE PROCEDURE sibe.notificacao()\n" +
    //     "BEGIN\n" +
    //     "SELECT T1.locacao_id,T1.data_entrada,T1.data_prevista_entrada,T1.data_saida ,T1.data_prevista_saida ,T1.preco_total,T1.status,CASE WHEN (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900' AND data_saida = '01/01/1900') THEN 'Atrasado Retirada' WHEN (date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900') THEN 'Atrasado Retorno' ELSE 'Sem Atraso' END as status_agendamento ,TCarro.placa as placa_carro ,TCarreta.placa as placa_carreta ,TCliente.nome\n" +
	// 	"FROM locacao as T1 inner join carreta_locacao as T2 on T1.locacao_id = T2.locacao_id inner join carro_locacao as T3 on T1.locacao_id = T3.locacao_id inner join carro as TCarro on T3.carro_id = TCarro.carro_id inner join carreta as TCarreta on T2.carreta_id = TCarreta.carreta_id inner join Cliente as TCliente on TCliente.cliente_id = TCarro.cliente_id\n" +
	// 	"WHERE (date_format(str_to_date(data_prevista_entrada, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_entrada = '01/01/1900') OR\n" +
	// 	"(date_format(str_to_date(data_prevista_saida, '%Y-%m-%d'), '%Y-%m-%d') < CURDATE() AND data_saida = '01/01/1900')\n" +
    //     "END //\n" + ";"

    // const rawData = await getManager().query(query_procedures);

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
