import React, { Component, SyntheticEvent, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "./CadastroCarro.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CadastroCarro= (props) => {

    const [tipo, setTipo] = useState("");
    const [renavam, setRenavam] = useState("");
    const [placa, setPlaca] = useState("");
    const [status, setStatus] = useState("operante");
    const [cliente_id, setClienteId] = useState(0);

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroCarreta, setCadastroCarreta] = useState(false);

    const [carros, setCarros] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('carros/placa/' + placa);
        const { data } = await axios.get('carros/placa/' + placa);
        
        //setClienteId(props.match.params.cliente_id);
        console.log("Log AQUI!!!!");
        console.log(data);
        if (!data) {
            const response = await axios.post('carros/', {
                placa: placa,
                tipo: tipo,
                renavam: renavam,
                cliente_id: props.match.params.cliente_id,
                status: status,
            });
            console.log(response);
            window.confirm('Veículo cadastrado com sucesso')
        } else {
            window.confirm('Esse Veículo já está cadastrado, verificar Veículo deste Cliente')
        }

        if (!redirectCadastroCarreta) {
            setRedirectHome(true);
        }

    }

    if (redirectHome == true) {
        return <Redirect to={'/'}></Redirect>
    } else if (redirectCadastroCarreta == true) {
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
                                    <h1 className="title">Cadastro de Novo Veículo</h1>
                                </div>
                                <div className="col-12">
                                    <h2 className="subtitle">Dados Básicos</h2>
                                </div>
                                <div className="col-lg-6">
                                    <div className="forms-input">
                                        <label className='labels'>Placa do Veículo</label>
                                        <input
                                            id="placa"
                                            class="form-field form-lg"
                                            type="text"
                                            placeholder="Digite a Placa"
                                            name="placa"
                                            onChange={e => setPlaca(e.target.value)}
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
                                        <label className='labels'>Tipo do Veículo</label>

                                        <select class="form-field select-box" name="tipo" id="tipo" onChange={e => setTipo(e.target.value)}  >
                                            <option value="">Selecione</option>
                                            <option value="carro">Carro</option>
                                            <option value="moto">Moto</option>
                                        </select >
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className="forms-input">
                                        <label className="labels">Renavam</label>
                                        <input
                                            id="preco"
                                            class="form-field form-lg"
                                            type="float"
                                            placeholder="Informe o Preço da Locação"
                                            name="preco"
                                            maxlength="11"
                                            onChange={e => setRenavam(e.target.value)}
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

export default CadastroCarro;