import React, { Component, SyntheticEvent, useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "./LocacaoEditar.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";



const localizer = momentLocalizer(moment)

const LocacaoEditar = (props) => {

    const [data_entrada, setDataEntrada] = useState("01/01/1900");
    const [data_prevista_entrada, setDataPrevistaEntrada] = useState("");
    const [data_saida, setDataSaida] = useState("01/01/1900");
    const [data_prevista_saida, setDataPrevistaSaida] = useState("");
    const [preco_total, setPrecoTotal] = useState("");
    const [status, setStatus] = useState("");

    const [placa_carreta, setPlacaCarreta] = useState("");
    const [placa_veiculo, setPlacaVeiculo] = useState("");

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroLocacao, setCadastroLocacao] = useState(false);

    const [locacoes, setLocacoes] = useState([]);

    const [carretasBloqueadas, setCarretasBloqueadas] = useState(() => {
        (
            async () => {
                const { data } = await axios.get(`locacoes`);

                var arrayLocacoesBlock = []
                data.forEach(function (arrayItem) {
                    var arrayDatasBloqueadas = []
                    for (var arr = [], dt = new Date(arrayItem.data_prevista_saida); dt <= new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate() + 1)) {

                        arrayDatasBloqueadas.push(new Date(dt));
                    }
                    var y = {
                        placa_carreta: arrayItem.placa_carreta,
                        arrayDatasBloqueadas: arrayDatasBloqueadas
                    }
                    arrayLocacoesBlock.push(y);
                });

                setCarretasBloqueadas(arrayLocacoesBlock);
                return arrayLocacoesBlock;
            }

        )()
    });

    const [datasBloqueadas, setDatasBloqueadas] = useState(() => {
        (
            async () => {
                const { data } = await axios.get(`locacoes`);

                var arrayDatasBloqueadas = []
                data.forEach(function (arrayItem) {
                    for (var arr = [], dt = new Date(arrayItem.data_prevista_saida); dt <= new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate() + 1)) {
                        arrayDatasBloqueadas.push(new Date(dt));
                    }
                });

                return arrayDatasBloqueadas;
            }

        )()
    });

    const [eventos, setEventos] = useState(() => {
        (
            async () => {
                const { data } = await axios.get(`locacoes`);

                setLocacoes(data);

                locacoes.sort((a, b) => b.locacao_id - a.locacao_id);

                var arrayEvent = []
                var arrayDatasBloqueadas = []
                data.forEach(function (arrayItem) {
                    //var x = getDaysArray(new Date(arrayItem.data_prevista_saida),new Date(arrayItem.data_prevista_entrada));
                    var x = {
                        start: new Date(arrayItem.data_prevista_saida),
                        end: new Date(arrayItem.data_prevista_entrada),
                        title: "Cliente: " + arrayItem.nome + " Carro: " + arrayItem.placa_carro + " Carreta: " + arrayItem.placa_carreta
                    }

                    for (var arr = [], dt = new Date(arrayItem.data_prevista_saida); dt <= new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate() + 1)) {
                        arrayDatasBloqueadas.push(new Date(dt));
                    }

                    //console.log(arr);
                    arrayEvent.push(x);
                });

                setDatasBloqueadas(arrayDatasBloqueadas);
                //console.log(arrayDatasBloqueadas);

                setEventos(arrayEvent);
                //console.log(arrayEvent);

                return arrayEvent;
            }

        )()
    });


    const getLocacoes = async () => {

        const { data } = await axios.get('locacoes/');

        console.log("locacoes aqui");
        console.log(data);

        setLocacoes(data);

    }

    useEffect(() => {
        (
            async () => {
                ///clientes/:cliente_id
                const { data } = await axios.get(`locacoes/${props.match.params.locacao_id}`);

                console.log(data);

                setDataEntrada(data[0].data_entrada);
                setDataPrevistaEntrada(data[0].data_prevista_entrada);
                setDataSaida(data[0].data_saida);
                setDataPrevistaSaida(data[0].data_prevista_saida);
                setPrecoTotal(data[0].preco_total);
                setStatus(data[0].status);
                setPlacaCarreta(data[0].placa_carreta);
                setPlacaVeiculo(data[0].placa_carro);
            }
        )()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()

        getLocacoes();

        if (window.confirm('Você tem certeza que deseja editar este Agendamento?')) {

            const response = await axios.put(`locacoes/${props.match.params.locacao_id}`, {
                data_entrada: data_entrada,
                data_prevista_entrada: data_prevista_entrada,
                data_saida: data_saida,
                data_prevista_saida: data_prevista_saida,
                preco_total: preco_total,
                status: status
            });
        }
        setRedirectHome(true)
    }

    const checarDatas_saida = async (e) => {
        //e.preventDefault()
        var data_prevista_saida_d = new Date(e);
        data_prevista_saida_d.setDate(data_prevista_saida_d.getDate() + 1);
        var data_prevista_saida_s = data_prevista_saida_d.getFullYear() + '-' + (data_prevista_saida_d.getMonth() + 1) + '-' + data_prevista_saida_d.getDate();
        console.log(data_prevista_saida_s);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var flagDatas = false;

        carretasBloqueadas.forEach(function (arrayItem) {
            if (document.getElementById('placa_carreta').value === arrayItem.placa_carreta) {
                arrayItem.arrayDatasBloqueadas.forEach(function (dataItem) {
                    console.log("DATA: " + dataItem + "DATA_PRETENDIDA: " + data_prevista_saida_d);
                    var data_alugada = dataItem.getFullYear() + '-' + (dataItem.getMonth() + 1) + '-' + dataItem.getDate();
                    if (data_prevista_saida_s === data_alugada) {
                        flagDatas = true;
                        document.getElementById('data_prevista_saida').value = '';
                    }
                    if (data_prevista_saida_s === data_alugada) {
                        flagDatas = true;
                        document.getElementById('data_prevista_saida').value = '';
                    }

                });
            }

        });

        if (data_prevista_saida_d < today) {
            window.confirm('Data de Saída precisa ser maior ou igual a data atual.')
        } else if (flagDatas) {
            window.confirm('Data Bloqueada por Outro Agendamento Verificar Calendário.')

        } else {
            setDataPrevistaSaida(e);
        }

    }

    const checarDatas_entrada = async (e) => {
        //e.preventDefault()
        var data_prevista_entrada_d = new Date(e);
        data_prevista_entrada_d.setDate(data_prevista_entrada_d.getDate() + 1);
        var data_prevista_entrada_s = data_prevista_entrada_d.getFullYear() + '-' + (data_prevista_entrada_d.getMonth() + 1) + '-' + data_prevista_entrada_d.getDate();
        console.log(data_prevista_entrada_s);
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        var flagDatas = false;

        carretasBloqueadas.forEach(function (arrayItem) {
            if (document.getElementById('placa_carreta').value === arrayItem.placa_carreta) {
                arrayItem.arrayDatasBloqueadas.forEach(function (dataItem) {
                    var data_alugada = dataItem.getFullYear() + '-' + (dataItem.getMonth() + 1) + '-' + dataItem.getDate();
                    if (data_prevista_entrada_s === data_alugada) {
                        flagDatas = true;
                        document.getElementById('data_prevista_entrada').value = '';
                    }
                    if (data_prevista_entrada_s === data_alugada) {
                        flagDatas = true;
                        document.getElementById('data_prevista_entrada').value = '';
                    }

                });
            }

        });

        if (data_prevista_entrada_d < today) {
            window.confirm('Data de Saída precisa ser maior ou igual a data atual.')
        } else if (flagDatas) {
            window.confirm('Data Bloqueada por Outro Agendamento Verificar Calendário.')

        } else if (document.getElementById('data_prevista_entrada').value < document.getElementById('data_prevista_saida').value) {
            window.confirm('Data de Retorno precisa ser maior ou igual a data de Saída.')
            document.getElementById('data_prevista_entrada').value = '';

        } else {
            setDataPrevistaEntrada(e);
        }

    }

    if (redirectHome === true) {
        return <Redirect to={'/locacoes'}></Redirect>
    } else if (redirectCadastroLocacao === true) {
        return <Redirect to={'/cadastroLocacao'}></Redirect>
    }

    return (
        <Wrapper>
            <div id="editar-locacao">
                <div className="login-box bg-light">
                    <div className="form-cadastro">
                        <div class="container">
                            <form className="register-form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className="title">Agendamento</h1>
                                    </div>
                                    <div className="col-12">
                                        <h2 className="subtitle">Dados Básicos</h2>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="forms-input">
                                            <label className='labels'>Data Prevista de Saída</label>
                                            <input
                                                id="data_prevista_saida"
                                                className="form-field"
                                                type="date"
                                                name="data_prevista_saida"
                                                onChange={e => checarDatas_saida(e.target.value)}
                                                defaultValue={data_prevista_saida}
                                                required
                                            />

                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="forms-input">
                                            <label className='labels'>Data Prevista de Retorno</label>
                                            <input
                                                id="data_prevista_entrada"
                                                className="form-field"
                                                type="date"
                                                name="data_prevista_entrada"
                                                onChange={e => checarDatas_entrada(e.target.value)}
                                                defaultValue={data_prevista_entrada}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 py-lg-5 my-lg-4">

                                        <Calendar
                                            localizer={localizer}
                                            defaultDate={new Date()}
                                            defaultView="month"
                                            events={eventos}
                                            style={{height: "100vh"}}
                                        />

                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Valor da Locação</label>
                                            <input
                                                id="preco_total"
                                                className="form-field form-lg"
                                                type="float"
                                                placeholder="Informe o Preço da Locação"
                                                name="preco_total"
                                                maxlength="15"
                                                onChange={e => setPrecoTotal(e.target.value)}
                                                defaultValue={preco_total}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Placa do Veículo do Cliente</label>
                                            <input
                                                id="placa_veiculo"
                                                className="form-field form-lg"
                                                type="float"
                                                placeholder="Informe a Placa do Cliente"
                                                name="placa_veiculo"
                                                maxlength="15"
                                                onChange={e => setPlacaVeiculo(e.target.value)}
                                                defaultValue={placa_veiculo}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Status</label>
                                            <select className="form-field select-box" name="status" id="status" onChange={e => setStatus(e.target.value)} defaultValue={status} required >
                                                <option value="">Selecione</option>
                                                <option value="agendado">Agendado</option>
                                                <option value="operante">Operante</option>
                                                <option value="cancelado">Cancelado</option>
                                            </select>
                                        </div>
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
            </div>
        </Wrapper >

    );
    // }
}

export default LocacaoEditar;