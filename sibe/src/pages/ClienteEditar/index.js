import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "../../assets/scss/cadastros.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const ClienteEditar = (props) => {

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

    const [telefone, setTelefone] = useState("");
    const [celular, setCelular] = useState("");
    const [redirect, setRedirect] = useState(false);

    const [clientes, setClientes] = useState([]);

    const getClientes = async () => {

        const { data } = await axios.get('clientes/');

        console.log("Clientes aqui");
        console.log(data);

        setClientes(data);

    }

    useEffect(() => {
        (
            async () => {
                ///clientes/:cliente_id
                const { data } = await axios.get(`clientes/${props.match.params.cliente_id}`);

                setNome(data.nome);
                setDtNasc(data.data_nascimento);
                setCnh(data.cnh);
                setCpf(data.cpf);
                setRg(data.rg);
                setCep(data.cep);
                setEndereco(data.endereco);
                setN_casa(data.n_casa);
                setCidade(data.cidade);
                setEstado(data.estado);
                setNomeMae(data.nome_mae);
                setRenavam(data.renavam);
                setPlaca(data.placa);
                setTelefone(data.telefone);
                setCelular(data.celular);
            }
        )()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        getClientes();

        if (window.confirm('Você tem certeza que deseja editar este Cliente?')) {

            const response = await axios.put(`clientes/${props.match.params.cliente_id}`, {
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
                placa: placa,
                telefone: telefone,
                celular: celular,
            });
        }
        setRedirect(true)
    }



    // render () {

    if (redirect === true) {
        return <Redirect to={'/clientes'}></Redirect>
    }

    return (
        <Wrapper>
            <div className="login-box">
                <div className="form-cadastro">
                    <div class="container-fluid">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="title">Editar Cliente</h1>
                                </div>
                                <div className="col-12">
                                    <h2 className="subtitle">Dados Básicos</h2>
                                </div>
                                <div className="col-lg-6">
                                    <div className="forms-input">
                                        <label className='labels'>Nome Completo</label>
                                        <input
                                            id="nome"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite o nome completo"
                                            name="nome"
                                            onChange={e => setNome(e.target.value)}
                                            required
                                            defaultValue={nome}
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Data de Nascimento</label>
                                        <input
                                            id="data_nascimento"
                                            class="form-field"
                                            type="date"
                                            name="data_nascimento"
                                            onChange={e => setDtNasc(e.target.value)}
                                            required
                                            defaultValue={data_nascimento}
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Celular</label>
                                        <input
                                            id="celular"
                                            class="form-field"
                                            type="text"
                                            placeholder="Digite o telefone celular"
                                            name="celular"
                                            maxlength="10"
                                            onChange={e => setCelular(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className="labels">CPF</label>
                                        <input
                                            id="cpf"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite o CPF"
                                            name="cpf"
                                            maxlength="15"
                                            onChange={e => setCpf(e.target.value)}
                                            required
                                            defaultValue={cpf}
                                        />
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
                                            onChange={e => setRg(e.target.value)}
                                            defaultValue={rg}
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Telefone Fixo (opcional)</label>
                                        <input
                                            id="telefone"
                                            class="form-field"
                                            type="text"
                                            placeholder="Digite o telefone"
                                            name="telefone"
                                            maxlength="10"
                                            onChange={e => setTelefone(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-12 pt-4">
                                    <h2 className='subtitle'>Dados Complementares</h2>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className="labels">CNH</label>
                                        <input
                                            id="cnh"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite a CNH"
                                            name="cnh"
                                            maxlength="15"
                                            onChange={e => setCnh(e.target.value)}
                                            required
                                            defaultValue={cnh}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className='labels'>Nome da Mãe</label>
                                        <input
                                            id="nome_mae"
                                            class="form-field form-lg"
                                            placeholder="Digite o nome da mãe"
                                            type="text"
                                            name="nome_mae"
                                            onChange={e => setNomeMae(e.target.value)}
                                            defaultValue={nome_mae}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 pt-5">
                                    <div className="forms-input">
                                        <label className='labels'>Endereço</label>
                                        <input
                                            id="endereco"
                                            class="form-field form-xg"
                                            type="text"
                                            placeholder="Digite o endereço"
                                            name="endereco"
                                            onChange={e => setEndereco(e.target.value)}
                                            defaultValue={endereco}
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className='labels'>CEP</label>
                                        <input
                                            id="cep"
                                            class="form-field form-md"
                                            type="text"
                                            placeholder="Digite o CEP"
                                            name="cep"
                                            maxlength="10"
                                            onChange={e => setCep(e.target.value)}
                                            defaultValue={cep}
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Estado</label>
                                        <select class="form-field select-box" name="estado" id="estado" onChange={e => setEstado(e.target.value)} defaultValue={estado} >
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
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className='labels'>Número</label>
                                        <input
                                            id="n_casa"
                                            class="form-field form-sm"
                                            type="text"
                                            placeholder="Digite o número"
                                            name="n_casa"
                                            maxlength="10"
                                            onChange={e => setN_casa(e.target.value)}
                                            defaultValue={n_casa}
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Cidade</label>
                                        <input
                                            id="cidade"
                                            class="form-field form-md"
                                            type="text"
                                            placeholder="Digite a cidade"
                                            name="cidade"
                                            onChange={e => setCidade(e.target.value)}
                                            defaultValue={cidade}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-lg-4">
                                <div className="col d-flex justify-content-center">
                                    <button class="form-field button-submit" type="submit" >
                                        {/* onClick={this.onClickCadastrar} */}
                                        Editar Cliente
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
}

export default ClienteEditar;