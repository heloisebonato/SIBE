import React, { Component, SyntheticEvent, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import "../../assets/scss/cadastros.css";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { TextField } from "@mui/material";

const CadastroCliente = (props) => {
  const [nome, setNome] = useState("");
  const [data_nascimento, setDtNasc] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [cnh, setCnh] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [n_casa, setN_casa] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [nome_mae, setNomeMae] = useState("");
  const [renavam, setRenavam] = useState("");
  const [placa, setPlaca] = useState("");

  const [redirectHome, setRedirectHome] = useState(false);
  const [redirectCadastroCliente, setCadastroCliente] = useState(false);

  const [clientes, setClientes] = useState([]);

  const getClienteByCpf = async () => {
    const { data } = await axios.get("clientes/cpf/" + cpf);

    if (data) {
      if (
        window.confirm(
          'Esse cliente já está cadastrado, verificar seção "Clientes"'
        )
      ) {
        setCadastroCliente(true);
      }
    } else {
      setClientes(data);
    }

    return data;
  };
  const [inputError, setInputError] = useState("");

  function cpfIsValid() {
    if (cpf.length !== 11) {
      setInputError("CPF deve ter 11 dígitos");
      return;
    }
    setInputError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({
    //     nome: nome,
    //     data_nascimento: data_nascimento,
    //     cnh: cnh,
    //     cpf: cpf,
    //     rg: rg,
    //     cep: cep,
    //     endereco: endereco,
    //     n_casa: n_casa,
    //     cidade: cidade,
    //     estado: estado,
    //     nome_mae: nome_mae,
    //     renavam: renavam,
    //     placa: placa

    //     });
    const { data } = await axios.get("clientes/cpf/" + cpf);
    console.log(data);
    if (!data) {
      const response = await axios.post("clientes/", {
        nome: nome,
        data_nascimento: data_nascimento,
        telefone: telefone,
        celular: celular,
        cnh: cnh,
        cpf: cpf,
        rg: rg,
        cep: cep,
        endereco: endereco,
        n_casa: n_casa,
        cidade: cidade,
        estado: estado,
        nome_mae: nome_mae,
        renavam: renavam,
        placa: placa,
      });
      console.log(response);
      window.confirm("Cliente cadastrado com sucesso");
    } else {
      window.confirm(
        'Esse cliente já está cadastrado, verificar seção "Clientes"'
      );
    }

    if (!redirectCadastroCliente) {
      setRedirectHome(true);
    }
  };

  // render () {

  if (redirectHome === true) {
    return <Redirect to={"/Clientes"}></Redirect>;
  } else if (redirectCadastroCliente === true) {
    return <Redirect to={"/cadastroCliente"}></Redirect>;
  }

  return (
    <Wrapper>
      <div className="login-box bg-light">
        <div className="form-cadastro">
          <div class="container">
            <form className="register-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <h1 className="title">Cadastro de Novo Cliente</h1>
                </div>
                <div className="col-12">
                  <h2 className="subtitle">Dados Básicos</h2>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <label className="labels">Nome Completo</label>
                    <input
                      id="nome"
                      class="form-field form-lg"
                      type="text"
                      placeholder="Digite o nome completo"
                      name="nome"
                      onChange={(e) => setNome(e.target.value)}
                      required
                    />
                  </div>
                  <div className="forms-input">
                    <label className="labels">Data de Nascimento</label>
                    <input
                      id="data_nascimento"
                      class="form-field"
                      type="date"
                      name="data_nascimento"
                      onChange={(e) => setDtNasc(e.target.value)}
                      required
                    />
                  </div>
                  <div className="forms-input">
                    <label className="labels">Celular</label>
                    <input
                      id="celular"
                      class="form-field"
                      type="text"
                      placeholder="Digite o telefone celular"
                      name="celular"
                      maxlength="10"
                      onChange={(e) => setCelular(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <TextField>
                      required value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      onBlur={cpfIsValid}
                      error={!!inputError}
                      helperText={inputError}
                      label="CPF"
                      variant="outlined"
                      margin="normal"
                      id="cpf"
                      class="form-field form-lg"
                    </TextField>
                  </div>
                  <div className="forms-input">
                    <label className="labels">RG</label>
                    <input
                      id="rg"
                      placeholder="Digite o RG"
                      class="form-field form-md"
                      type="text"
                      name="rg"
                      maxlength="15"
                      onChange={(e) => setRg(e.target.value)}
                    />
                  </div>
                  <div className="forms-input">
                    <label className="labels">Telefone (opcional)</label>
                    <input
                      id="telefone"
                      class="form-field"
                      type="text"
                      placeholder="Digite o telefone"
                      name="telefone"
                      maxlength="10"
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 pt-4">
                  <h2 className="subtitle">Dados Complementares</h2>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <label className="labels">CNH</label>
                    <input
                      id="cnh"
                      class="form-field form-lg"
                      type="text"
                      placeholder="Digite a CNH"
                      name="cnh"
                      maxlength="15"
                      onChange={(e) => setCnh(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <label className="labels">Nome da Mãe</label>
                    <input
                      id="nome_mae"
                      class="form-field form-lg"
                      placeholder="Digite o nome da mãe"
                      type="text"
                      name="nome_mae"
                      onChange={(e) => setNomeMae(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 pt-5">
                  <div className="forms-input">
                    <label className="labels">Endereço</label>
                    <input
                      id="endereco"
                      class="form-field form-xg"
                      type="text"
                      placeholder="Digite o endereço"
                      name="endereco"
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <label className="labels">CEP</label>
                    <input
                      id="cep"
                      class="form-field form-md"
                      type="text"
                      placeholder="Digite o CEP"
                      name="cep"
                      maxlength="10"
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </div>
                  <div className="forms-input">
                    <label className="labels">Estado</label>
                    <select
                      class="form-field select-box"
                      name="estado"
                      id="estado"
                      onChange={(e) => setEstado(e.target.value)}
                    >
                      <option value="">Selecione</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AM">AM</option>
                      <option value="AP">AP</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MG">MG</option>
                      <option value="MS">MS</option>
                      <option value="MT">MT</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="PR">PR</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SE">SE</option>
                      <option value="SP">SP</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="forms-input">
                    <label className="labels">Número</label>
                    <input
                      id="n_casa"
                      class="form-field form-sm"
                      type="text"
                      placeholder="Digite o número"
                      name="n_casa"
                      maxlength="10"
                      onChange={(e) => setN_casa(e.target.value)}
                    />
                  </div>
                  <div className="forms-input">
                    <label className="labels">Cidade</label>
                    <input
                      id="cidade"
                      class="form-field form-md"
                      type="text"
                      placeholder="Digite a cidade"
                      name="cidade"
                      onChange={(e) => setCidade(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row pt-lg-4">
                <div className="col d-flex justify-content-center">
                  <button class="form-field button-submit" type="submit">
                    {/* onClick={this.onClickCadastrar} */}
                    Cadastrar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  );
  // }
};

export default CadastroCliente;
