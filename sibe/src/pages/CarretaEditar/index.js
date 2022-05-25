import React, { Component, SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "./styleEditarCarretas.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const CarretaEditar = (props) => {

    const [tipo, setTipo] = useState("");
    const [preco, setPreco] = useState("");
    const [placa, setPlaca] = useState("");
    const [status, setStatus] = useState("");

    const [redirect, setRedirect] = useState(false);

    const [carretas, setCarretas] = useState([]);

    const getCarretas = async () => {

        const { data } = await axios.get('carretas/');

        console.log("Carretas aqui");
        //console.log(data);

        setCarretas(data);

    }

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`carretas/${props.match.params.carreta_id}`);

                setTipo(data.tipo);
                setPreco(data.preco);
                setPlaca(data.placa);
                setStatus(data.status);
            }
        )()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        getCarretas();

        if (window.confirm('Você tem certeza que deseja editar esta Carreta?')) {

            const response = await axios.put(`carretas/${props.match.params.carreta_id}`, {
                placa: placa,
                tipo: tipo,
                preco: preco,
                status: status
            });
        }
        setRedirect(true)
    }



    // render () {

    if (redirect == true) {
        return <Redirect to={'/carretas'}></Redirect>
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
                                            defaultValue={placa}
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
                                            defaultValue={tipo}
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
                                            defaultValue={preco}
                                        />
                                    </div>
                                </div>
                                <div className="forms-input">
                                        <label className='labels'>Status</label>
                                        <select class="form-field select-box" name="status" id="status" onChange={e => setStatus(e.target.value)} defaultValue={status} >
                                            <option value="">Selecione</option>
                                            <option value="operante">Operante</option>
                                            <option value="inoperante">Inoperante</option>
                                        </select>
                                </div>
                            </div>
                            <div className="row pt-lg-4">
                                <div className="col d-flex justify-content-center">
                                    <button class="form-field button-submit" type="submit" >
                                        {/* onClick={this.onClickCadastrar} */}
                                        Editar Carretas
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

export default CarretaEditar;