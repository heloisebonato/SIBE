import React, { Component, SyntheticEvent, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "../../assets/scss/cadastros.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CadastroEngates= (props) => {

    const [nome, setNome] = useState("");
    const [codigo, setCodigo] = useState("");
    const [marca, setMarca] = useState("");

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroEngates, setCadastroEngate] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.get('' + marca);

        //setClienteId(props.match.params.cliente_id);
        console.log(data);
        if (!data) {
            const response = await axios.post('carros/', {
                nome: nome,
                codigo: codigo,
                marca: marca,
                cliente_id: props.match.params.cliente_id,
            });
            console.log(response);
            window.confirm('Engate cadastrado com sucesso')
        } else {
            window.confirm('Esse engate já está cadastrado!')
        }

        if (!redirectCadastroEngates) {
            setRedirectHome(true);
        }

    }

    if (redirectHome === true) {
        return <Redirect to={'/'}></Redirect>
    } else if (redirectCadastroEngates === true) {
        return <Redirect to={'/clientes'}></Redirect>
    }

    return (
        <Wrapper>
            <div className="login-box bg-light">
                <div className="form-cadastro">
                    <div class="container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="title">Cadastro de Novo Engate</h1>
                                </div>
                                <div className="col-12">
                                    <h2 className="subtitle">Dados Básicos</h2>
                                </div>
                                <div className="col-lg-6">
                                    <div className="forms-input">
                                        <label className='labels'>Código do Engate</label>
                                        <input
                                            id="codigo"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite o código"
                                            name="codigo"
                                            onChange={e => setCodigo(e.target.value)}
                                            required
                                        />
                                        <input
                                            id="id"
                                            class="form-field form-lg"
                                            type="text"
                                            name="id"
                                            value={props.match.params.cliente_id}
                                            required
                                            hidden
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Nome do Engate</label>
                                        <input
                                            id="nomeEngate"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite o nome"
                                            name="nome"
                                            onChange={e => setNome(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className="labels">Marca</label>
                                        <input
                                            id="marca"
                                            class="form-field form-lg"
                                            type="float"
                                            placeholder="Digite a marca"
                                            name="marca"
                                            maxlength="20"
                                            onChange={e => setMarca(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row pt-lg-4">
                                <div className="col d-flex justify-content-center">
                                    <button class="form-field button-submit" type="submit" >
                                        {/* onClick={this.onClickCadastrar} */}
                                        Cadastrar
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper >

    );
    // }
}

export default CadastroEngates;