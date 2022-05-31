import React, { Component, SyntheticEvent, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "../../assets/scss/cadastros.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CadastroCarreta = (props) => {

    const [tipo, setTipo] = useState("");
    const [preco, setPreco] = useState("");
    const [placa, setPlaca] = useState("");
    const [status, setStatus] = useState("operante");

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroCarreta, setCadastroCarreta] = useState(false);

    const [carretas, setCarretas] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const { data } = await axios.get('carretas/placa/' + placa);
        console.log(data);
        if (!data) {
            const response = await axios.post('carretas/', {
                placa: placa,
                tipo: tipo,
                preco: preco,
                status: status,
            });
            console.log(response);
            window.confirm('Carreta cadastrada com sucesso')
        } else {
            window.confirm('Essa carreta já está cadastrada, verificar seção "Carretas"')
        }

        if (!redirectCadastroCarreta) {
            setRedirectHome(true);
        }

    }

    if (redirectHome == true) {
        return <Redirect to={'/'}></Redirect>
    } else if (redirectCadastroCarreta == true) {
        return <Redirect to={'/cadastroCarreta'}></Redirect>
    }

    return (
        <Wrapper>
            <div className="login-box bg-light">
                <div className="form-cadastro">
                    <div class="container">
                        <form className="register-form" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <h1 className="title">Cadastro de Nova Carreta</h1>
                                </div>
                                <div className="col-12">
                                    <h2 className="subtitle">Dados Básicos</h2>
                                </div>
                                <div className="col-lg-6">
                                    <div className="forms-input">
                                        <label className='labels'>Placa da Carreta</label>
                                        <input
                                            id="placa"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite a Placa"
                                            name="placa"
                                            onChange={e => setPlaca(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Tipo da Carreta</label>
                                        <input
                                            id="tipo"
                                            class="form-field"
                                            type="text"
                                            name="tipo"
                                            onChange={e => setTipo(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className="labels">Preço da Locação</label>
                                        <input
                                            id="preco"
                                            class="form-field form-lg"
                                            type="float"
                                            placeholder="Informe o Preço da Locação"
                                            name="preco"
                                            maxlength="15"
                                            onChange={e => setPreco(e.target.value)}
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

export default CadastroCarreta;