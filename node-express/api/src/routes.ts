import { Router } from "express";
import {AuthMiddleware} from "./middleware/auth.middleware";

import {AuthenticatedFuncionario, Login, Logout, Register, UpdateInfoFuncionario, UpdateSenha } from "./controller/auth.controller";
import { CreateFuncionario, DeleteFuncionario, Funcionarios, GetFuncionario, UpdateFuncionario } from "./controller/funcionario.controller";
import { Clientes, CreateCliente, DeleteCliente, GetCliente, GetClienteByCpf, GetHistoricoCliente, UpdateCliente } from "./controller/cliente.controller";
import { Carretas, CreateCarreta, GetCarreta, UpdateCarreta, DeleteCarreta, GetCarretaByPlaca } from "./controller/carreta.controller";
import { Carros, CreateCarro, CreateCarroCliente, DeleteCarro, GetCarro, GetCarroByPlaca, GetCarrosByCliente, UpdateCarro } from "./controller/carro.controller";
import { CreateLocacao, GetInfoPesquisar, Locacoes, Locacoes_, Locacoes_por_Id, UpdateLocacao } from "./controller/locacao.controller";

export const routes = (router: Router) => {
    router.post('/register', Register);
    router.post('/login', Login);
    router.get('/funcionario', AuthMiddleware, AuthenticatedFuncionario);
    router.post('/logout', AuthMiddleware,  Logout);
    router.put('/funcionario/info', AuthMiddleware, UpdateInfoFuncionario);
    router.put('/funcionario/senha', AuthMiddleware, UpdateSenha);

    router.get('/funcionarios', AuthMiddleware, Funcionarios);
    router.post('/funcionarios', CreateFuncionario);
    router.get('/funcionarios/:funcionario_id', AuthMiddleware, GetFuncionario);
    router.put('/funcionarios/:funcionario_id', AuthMiddleware, UpdateFuncionario);
    router.delete('/funcionarios/:funcionario_id', AuthMiddleware, DeleteFuncionario);

    router.get('/clientes', AuthMiddleware, Clientes);
    router.post('/clientes', CreateCliente);
    router.get('/clientes/:cliente_id', AuthMiddleware, GetCliente);
    router.get('/clientes/cpf/:cpf', AuthMiddleware, GetClienteByCpf);
    router.put('/clientes/:cliente_id', AuthMiddleware, UpdateCliente);
    router.delete('/clientes/:cliente_id', AuthMiddleware, DeleteCliente);

    router.get('/historico/:cliente_id', AuthMiddleware, GetHistoricoCliente);

    router.get('/carretas', AuthMiddleware, Carretas);
    router.post('/carretas', CreateCarreta);
    router.get('/carretas/:carreta_id', AuthMiddleware, GetCarreta);
    router.get('/carretas/placa/:placa', AuthMiddleware, GetCarretaByPlaca);
    router.put('/carretas/:carreta_id', AuthMiddleware, UpdateCarreta);
    router.delete('/carretas/:carreta_id', AuthMiddleware, DeleteCarreta);

    router.get('/carros', AuthMiddleware, Carros);
    router.post('/carros', CreateCarro);
    router.post('/carros/cliente', CreateCarroCliente);
    router.get('/carros/:carro_id', AuthMiddleware, GetCarro);
    router.get('/carros/placa/:placa', AuthMiddleware, GetCarroByPlaca);
    router.get('/carros/cliente/:cliente_id', AuthMiddleware, GetCarrosByCliente);
    

    router.put('/carros/:carro_id', AuthMiddleware, UpdateCarro);
    router.delete('/carros/:carro_id', AuthMiddleware, DeleteCarro);


    router.post('/locacoes/:placa_carro/:placa_carreta', CreateLocacao);
    router.get('/locacoes', Locacoes_);
    router.get('/locacoes/:locacao_id', Locacoes_por_Id);
    router.put('/locacoes/:locacao_id', AuthMiddleware, UpdateLocacao);

    router.get('/pesquisar/:valor', AuthMiddleware, GetInfoPesquisar);

    //router.post('/carro', CreateCarro);
}