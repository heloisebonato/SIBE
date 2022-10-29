import React from "react";
import "./index.css";
import "./dashboard.css";
import Login from "./pages/login";

import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Funcionario from "./pages/Funcionarios";
import Register from "./pages/Register";
import CadastroCliente from "./pages/CadastroCliente";
import Clientes from "./pages/Clientes";
import ClienteEditar from "./pages/ClienteEditar";
import CadastroCarreta from "./pages/CadastroCarreta";
import Carretas from "./pages/Carretas";
import CarretaEditar from "./pages/CarretaEditar";
import CadastroCarro from "./pages/CadastroCarro";
import CadastroLocacao from "./pages/CadastroLocacao";
import Locacoes from "./pages/Locacoes";
import LocacaoEditar from "./pages/LocacaoEditar";
import CarroEditar from "./pages/CarroEditar";
import HistoricoCliente from "./pages/HistoricoCliente";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Route path={"/"} exact component={Dashboard} />
        <Route path={"/funcionarios"} component={Funcionario} />
        <Route path={"/registrar"} component={Register} />
        <Route path={"/login"} component={Login} />
        <Route path={"/cadastroCliente"} component={CadastroCliente} />
        <Route exact path={"/clientes"} component={Clientes} />
        <Route path={"/cliente/:cliente_id/editar"} component={ClienteEditar} />

        <Route path={"/cadastroCarreta"} component={CadastroCarreta} />
        <Route exact path={"/carretas"} component={Carretas} />
        <Route path={"/carreta/:carreta_id/editar"} component={CarretaEditar} />

        <Route path={"/carro/:carro_id/editar"} component={CarroEditar} />

        <Route path={"/cadastroCarro/:cliente_id"} component={CadastroCarro} />

        <Route path={"/locacoes"} component={Locacoes} />
        <Route path={"/cadastroLocacao"} component={CadastroLocacao} />
        <Route path={"/locacao/:locacao_id/editar"} component={LocacaoEditar} />

        <Route exact path={"/clientes/cpf/:cpf"} component={Clientes} />
        <Route exact path={"/carretas/placa/:placa"} component={Carretas} />

        <Route
          exact
          path={"/historico/:cliente_id"}
          component={HistoricoCliente}
        />
      </BrowserRouter>
    </div>
  );
}
