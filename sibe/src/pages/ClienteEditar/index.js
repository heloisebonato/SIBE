import React, {Component, SyntheticEvent, useState} from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "./styleCadastroCliente.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const EditarCliente = (props) => {

    const [nome, setNome] = useState("");
    const [data_nascimento, setDtNasc] = useState("");
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

    const [redirect, setRedirect] = useState(false);

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {
        
        const {data} = await axios.get('clientes/');

        console.log("Clientes aqui");
        console.log(data);

        setClientes(data);
        
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log({
            nome: nome,
            data_nascimento: data_nascimento,
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
            placa: placa

            });

        getClientes();      

        //   const response = await axios.post('clientes/', {
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
        //     placa: placa,
        // });

        // console.log(response)
        setRedirect(true)
    }

      

    // render () {

        if(redirect == true){
            return <Redirect to={'/'}></Redirect>
        }

        return (
            <Wrapper>
                <div class="login-box"> 
                  <div class="form-container-cadastro-cliente">
                  <form class="register-form" onSubmit={handleSubmit}>
                  <h1 class="title">Cadastro de Novo Cliente</h1>
                  <input
                      id="nome"
                      class="form-field"
                      type="text"
                      placeholder="Nome"
                      name="nome"
                      onChange={e => setNome(e.target.value)}  
                      required  

                  />
                  <input
                      id="data_nascimento"
                      class="form-field"
                      type="date"
                      name="data_nascimento"
                      onChange={e => setDtNasc(e.target.value)}
                      required  
                  />
                  <input
                      id="cnh"
                      class="form-field"
                      type="text"
                      placeholder="CNH"
                      name="cnh"
                      maxlength="15"
                      onChange={e => setCnh(e.target.value)}
                      required  

                  />
                  <input
                      id="cpf"
                      class="form-field"
                      type="text"
                      placeholder="CPF"
                      name="cpf"
                      maxlength="15"
                      onChange={e => setCpf(e.target.value)}  
                      required  

                  />
                  <input
                      id="rg"
                      class="form-field"
                      type="text"
                      placeholder="RG"
                      name="rg"
                      maxlength="15"
                      onChange={e => setRg(e.target.value)}  
                  />
                  <input
                      id="cep"
                      class="form-field"
                      type="text"
                      placeholder="CEP"
                      name="cep"
                      maxlength="10"
                      onChange={e => setCep(e.target.value)}  
                  />
                  <input
                      id="endereco"
                      class="form-field"
                      type="text"
                      placeholder="Endereço"
                      name="endereco"
                      onChange={e => setEndereco(e.target.value)}  
                  />
                  <input
                      id="n_casa"
                      class="form-field"
                      type="text"
                      placeholder="Número"
                      name="n_casa"
                      maxlength="10"
                      onChange={e => setN_casa(e.target.value)}  
                  />
                  <input
                      id="cidade"
                      class="form-field"
                      type="text"
                      placeholder="Cidade"
                      name="cidade"
                      onChange={e => setCidade(e.target.value)}  
                  />
                  <select class="form-field select-box" name="estado" id="estado" onChange={e => setEstado(e.target.value)}  >
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

                  <input
                      id="nome_mae"
                      class="form-field"
                      type="text"
                      placeholder="Nome Mãe"
                      name="nome_mae"
                      onChange={e => setNomeMae(e.target.value)}  
                  />
                  <input
                      id="renavam"
                      class="form-field"
                      type="text"
                      placeholder="Renavam"
                      name="renavam"
                      maxlength="11"
                      onChange={e => setRenavam(e.target.value)}  
                  />
                  <input
                      id="placa"
                      class="form-field"
                      type="text"
                      placeholder="Placa do Veículo"
                      name="placa"
                      maxlength="7"
                      onChange={e => setPlaca(e.target.value)}  
                  />
                  <button class="form-field button-submit" type="submit" >
                  {/* onClick={this.onClickCadastrar} */}
                      Cadastrar
                  </button>
                  </form>
              </div>
            </div>
          </Wrapper>

        );
    // }
}

export default EditarCliente;