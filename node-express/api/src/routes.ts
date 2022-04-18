import { Router } from "express";
import {AuthMiddleware} from "./middleware/auth.middleware";

import {AuthenticatedFuncionario, Login, Logout, Register, UpdateInfoFuncionario, UpdateSenha } from "./controller/auth.controller";
import { CreateFuncionario, DeleteFuncionario, Funcionarios, GetFuncionario, UpdateFuncionario } from "./controller/funcionario.controller";
import { Clientes, CreateCliente, DeleteCliente, GetCliente, UpdateCliente } from "./controller/cliente.controller";

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
    router.put('/clientes/:cliente_id', AuthMiddleware, UpdateCliente);
    router.delete('/clientes/:cliente_id', AuthMiddleware, DeleteCliente);
}