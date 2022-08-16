import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "../../assets/scss/cadastros.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CarroEditar= (props) => {

    const [tipo, setTipo] = useState("");
    const [renavam, setRenavam] = useState("");
    const [placa, setPlaca] = useState("");
    const [status, setStatus] = useState("operante");
    const [cliente_id, setClienteId] = useState(0);

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroCarreta, setCadastroCarreta] = useState(false);

    const [carros, setCarros] = useState([]);

    const getCarros = async () => {

        const { data } = await axios.get('carros/');

        console.log("Carros aqui");
        console.log(data);

        setCarros(data);

    }

    useEffect(() => {
        (
            async () => {
                
                const { data } = await axios.get(`carros/${props.match.params.carro_id}`);

                setTipo(data.tipo);
                setRenavam(data.renavam);
                setPlaca(data.placa);
                setStatus(data.status);
            }
        )()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        getCarros();

        console.log("teste");

        if (window.confirm('Você tem certeza que deseja editar este Veículo?')) {

            const response = await axios.put(`carros/${props.match.params.carro_id}`, {
                tipo: tipo,
                renavam: renavam,
                placa: placa,
                status: status
            });
        }
        setRedirectHome(true)

    }

    if (redirectHome === true) {
        return <Redirect to={'/'}></Redirect>
    } else if (redirectCadastroCarreta === true) {
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
                                            defaultValue={placa}
                                            required
                                        />
                                        <input
                                            id="id"
                                            class="form-field form-lg"
                                            type="text"
                                            name="id"
                                            value={props.match.params.carro_id}
                                            required
                                            hidden

                                        />
                                    </div>
                                    <div className="forms-input">
                                        <label className='labels'>Tipo do Veículo</label>

                                        <select class="form-field select-box" name="tipo" id="tipo" onChange={e => setTipo(e.target.value)}  defaultValue={tipo}>
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
                                            id="renavam"
                                            class="form-field form-lg"
                                            type="float"
                                            placeholder="Informe o Preço da Locação"
                                            name="renavam"
                                            maxlength="11"
                                            onChange={e => setRenavam(e.target.value)}
                                            defaultValue={renavam}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="forms-input">
                                        <label className='labels'>Status do Veículo</label>

                                        <select class="form-field select-box" name="status" id="status" onChange={e => setStatus(e.target.value)}  defaultValue={status}>
                                            <option value="">Selecione</option>
                                            <option value="operante">Operante</option>
                                            <option value="inoperante">Inoperante</option>
                                        </select >
                                    </div>
                            </div>
                            <div className="row pt-lg-4">
                                <div className="col d-flex justify-content-center">
                                    <button class="form-field button-submit" type="submit" >
                                        {/* onClick={this.onClickCadastrar} */}
                                        Editar
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

export default CarroEditar;