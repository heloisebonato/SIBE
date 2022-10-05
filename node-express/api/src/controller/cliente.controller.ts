import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Cliente} from "../entity/cliente.entity";
//import bcyptjs from "bcryptjs";

export const Clientes = async (req: Request, res: Response) => {
    // const take = 15;
    // const page = parseInt(req.query.page as string || '1');


    const repository = getManager().getRepository(Cliente);

    const clientes = await repository.find();


    res.send(clientes.map(U => {
        const data = U;

        return data;
    }));

    // const [data, total] = await repository.findAndCount({
    //     take,
    //     skip: (page - 1) * take,
    //     relations: ['role']
    // })

    // res.send({
    //     data: data.map(u => {
    //         const {password, ...data} = u;

    //         return data;
    //     }),
    //     meta: {
    //         total,
    //         page,
    //         last_page: Math.ceil(total / take)
    //     }
    // });
}

export const CreateCliente = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Cliente);

    const cliente = await repository.save(body)

    res.status(201).send(cliente);
}
// where: { 
//     funcionario_id: funcionario.funcionario_id 
// } 
export const GetCliente = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Cliente);
    //{relations: ['role']
    const cliente = await repository.findOne({
        where: { 
            cliente_id: Number(req.params.cliente_id) 
        }

        });

    res.send(cliente);
}

// export const GetClienteByCpf = async (req: Request, res: Response) => {
//     // const take = 15;
//     // const page = parseInt(req.query.page as string || '1');


//     const repository = getManager().getRepository(Cliente);

//     const clientes = await repository.find();


//     res.send(clientes.map(U => {
//         const data = U;

//         return data;
//     }));

export const GetClienteByCpf = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Cliente);
    //{relations: ['role']
    const cliente = await repository.find({
        where: { 
            cpf: req.params.cpf 
        }

        });
    
    res.send(cliente.map(U => {
        const data = U;

        return data;
    }));

    //res.send(cliente);
}

export const UpdateCliente = async (req: Request, res: Response) => {
    const body = req.body;

    const repository = getManager().getRepository(Cliente);

    await repository.update(req.params.cliente_id, body);

    const cliente = await repository.findOne({
        where: { 
            cliente_id: Number(req.params.cliente_id) 
        }

        });

    res.status(202).send(cliente);
}

export const DeleteCliente = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Cliente);

    await repository.delete(req.params.cliente_id);

    res.status(204).send(null);
}

export const GetHistoricoCliente = async (req: Request, res: Response) => {


    const query = `call historicoCliente(` + req.params.cliente_id + `);`;

    console.log(query);

    const rawData = await getManager().query(query);

    console.log(rawData);


    //const repository = getManager().getRepository(Locacao);

    //const locacoes = await repository.find();


    res.send(rawData.map(U => {
        const data = U;

        return data;
    }));

    // const repository_carreta = getManager().getRepository(Carreta);
    
    // const carreta = await repository_carreta.findOne({
    //     where: { 
    //         placa: req.params.valor 
    //     }

    //     });
    
    // if (carreta != null){
    //     res.send(carreta);
    // }
    
    // const repository_cliente = getManager().getRepository(Cliente);

    // const clienteCpf = await repository_cliente.findOne({
    //     where: { 
    //         cpf: req.params.valor
    //     }

    //     });
    
    // if (clienteCpf != null){
    //     res.send(clienteCpf);
    // }

    // const clienteNome = await repository_cliente.findOne({
    //     where: { 
    //         nome: req.params.valor
    //     }

    //     });
    
    // if (clienteNome != null){
    //     res.send(clienteNome);
    // }

    //res.status(404).send(null);
}