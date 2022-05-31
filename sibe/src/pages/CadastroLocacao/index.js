import React, { Component, SyntheticEvent, useState, useEffect } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import "./CadastroLocacao.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


 
const localizer = momentLocalizer(moment)

const CadastroLocacao= (props) => {

    const [data_entrada, setDataEntrada] = useState("01/01/1900");
    const [data_prevista_entrada, setDataPrevistaEntrada] = useState("");
    const [data_saida, setDataSaida] = useState("01/01/1900");
    const [data_prevista_saida, setDataPrevistaSaida] = useState("");
    const [preco_total, setPrecoTotal] = useState("");

    const [placa_carreta, setPlacaCarreta] = useState("");
    const [placa_veiculo, setPlacaVeiculo] = useState("");

    const [redirectHome, setRedirectHome] = useState(false);
    const [redirectCadastroLocacao, setCadastroLocacao] = useState(false);

    const [locacoes, setLocacoes] = useState([]);

    const [carretasBloqueadas, setCarretasBloqueadas] = useState(() => {
        (
            async () => {
                const { data } = await axios.get(`locacoes`);

                var arrayLocacoesBlock= []
                data.forEach(function (arrayItem) {
                    var arrayDatasBloqueadas = []
                    for(var arr=[],dt=new Date(arrayItem.data_prevista_saida); dt<=new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate()+1)){
                        
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

                var arrayDatasBloqueadas= []
                data.forEach(function (arrayItem) {
                    for(var arr=[],dt=new Date(arrayItem.data_prevista_saida); dt<=new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate()+1)){
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
                var arrayDatasBloqueadas= []
                data.forEach(function (arrayItem) {
                    //var x = getDaysArray(new Date(arrayItem.data_prevista_saida),new Date(arrayItem.data_prevista_entrada));
                    var x = {
                        start: new Date(arrayItem.data_prevista_saida),
                        end: new Date(arrayItem.data_prevista_entrada),
                        title: "Cliente: " + arrayItem.nome + " Carro: " + arrayItem.placa_carro + " Carreta: " +  arrayItem.placa_carreta
                      }

                    for(var arr=[],dt=new Date(arrayItem.data_prevista_saida); dt<=new Date(arrayItem.data_prevista_entrada); dt.setDate(dt.getDate()+1)){
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
        
       

    const state = {
        events: [
          {
            start: moment().toDate(),
            end: moment()
              .add(1, "days")
              .toDate(),
            title: "Some title"
          }
        ]
      };


    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`locacoes`);
                
                setLocacoes(data);

                locacoes.sort((a, b) => b.locacao_id - a.locacao_id);
                //console.log(locacoes);
                //setLastPage(data.meta.last_page);
                //console.log(data.meta.last_page);
                // var getDaysArray = function(start, end) {
                //     for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
                //         arr.push(new Date(dt));
                //     }
                //     return arr;
                // };

                // var arrayEvent = []
                // locacoes.forEach(function (arrayItem) {
                //     //var x = getDaysArray(new Date(arrayItem.data_prevista_saida),new Date(arrayItem.data_prevista_entrada));
                //     var x = {
                //         start: new Date(arrayItem.data_prevista_saida),
                //         end: new Date(arrayItem.data_prevista_entrada),
                //         title: arrayItem.nome
                //       }
                //     //console.log(x);
                //     arrayEvent.push(x);
                // });

                // setEventos(arrayEvent);
                //console.log(eventos);
            
                // const isBlocked = day => {
                //     const availableDates = [];
                //     locacoes.forEach(function (arrayItem) {
                //         var x = getDaysArray(new Date(arrayItem.data_prevista_saida),new Date(arrayItem.data_prevista_entrada));
                //         console.log(x);
                //         availableDates.push(x);
                //     });
                //     //const availableDates = ["2019-02-01", "2019-02-04", "2019-02-05", "2019-02-06", "2019-02-07", "2019-02-11", "2019-02-12", "2019-02-13", "2019-02-14", "2019-02-15", "2019-02-19", "2019-02-20", "2019-02-21", "2019-02-22", "2019-02-23", "2019-02-25", "2019-02-26", "2019-02-27", "2019-02-28", "2019-03-01", "2019-03-04", "2019-03-05", "2019-03-06", "2019-03-07", "2019-03-08", "2019-03-09", "2019-03-11", "2019-03-12"];
                //     return !availableDates.some(date => day.isSame(date, 'day'));
                // }
            }

        )()
    });


    const handleSubmit = async (e) => {
        e.preventDefault()

        ///locacao/:placa_carro/:placa_carreta
        //FAZER VERIFICACAO DO AGENDAMENTO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        // const { data } = await axios.get('locacao/' + placa_veiculo + '/' + placa_carreta);
        // console.log(data);
        // if (!data) {
        //     const response = await axios.post('locacao/' + placa_veiculo + '/' + placa_carreta, {
        //         placa: placa,
        //         tipo: tipo,
        //         preco: preco,
        //         status: status,
        //     });
        //     console.log(response);
        //     window.confirm('Carreta cadastrada com sucesso')
        // } else {
        //     window.confirm('Essa carreta já está cadastrada, verificar seção "Carretas"')
        // }

        const response = await axios.post('locacoes/' + placa_veiculo + '/' + placa_carreta, {
            data_entrada: data_entrada,
            data_prevista_entrada: data_prevista_entrada,
            data_saida: data_saida,
            data_prevista_saida: data_prevista_saida,
            preco_total: preco_total
        });
        console.log(response);
        window.confirm('Locação cadastrada com sucesso')

        if (!redirectCadastroLocacao) {
            setRedirectHome(true);
        }

    }

    const checarDatas_saida = async (e) => {
        //e.preventDefault()
        var data_prevista_saida_d = new Date(e);
        data_prevista_saida_d.setDate(data_prevista_saida_d.getDate() + 1);
        var data_prevista_saida_s = data_prevista_saida_d.getFullYear()+'-'+(data_prevista_saida_d.getMonth()+1)+'-'+data_prevista_saida_d.getDate();
        console.log(data_prevista_saida_s);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        //console.log(datasBloqueadas.indexOf(data_prevista_saida_d) >= 0);
        //console.log(datasBloqueadas);

        var flagDatas = false;

        carretasBloqueadas.forEach(function (arrayItem) {
            if (document.getElementById('placa_carreta').value == arrayItem.placa_carreta){
                // console.log(arrayItem.placa_carreta);
                arrayItem.arrayDatasBloqueadas.forEach(function (dataItem) {
                    console.log("DATA: " + dataItem + "DATA_PRETENDIDA: " + data_prevista_saida_d);
                    var data_alugada = dataItem.getFullYear()+'-'+(dataItem.getMonth()+1)+'-'+dataItem.getDate();
                    if (data_prevista_saida_s == data_alugada){
                        flagDatas = true;
                        document.getElementById('data_prevista_saida').value = '';
                    }
                    if (data_prevista_saida_s == data_alugada){
                        flagDatas = true;
                        document.getElementById('data_prevista_saida').value = '';
                    }
                    
                });
            }
            
        });

        //console.log(flagDatas);

        if (data_prevista_saida_d < today){
            window.confirm('Data de Saída precisa ser maior ou igual a data atual.')
        } else if (flagDatas) {
            window.confirm('Data Bloqueada por Outro Agendamento Verificar Calendário.')
            
        } else {
            setDataPrevistaSaida(e);
        }
        
        // const { data } = await axios.get('carretas/placa/' + placa);
        // console.log(data);
        // if (!data) {
        //     const response = await axios.post('carretas/', {
        //         placa: placa,
        //         tipo: tipo,
        //         preco: preco,
        //         status: status,
        //     });
        //     console.log(response);
        //     window.confirm('Carreta cadastrada com sucesso')
        // } else {
        //     window.confirm('Essa carreta já está cadastrada, verificar seção "Carretas"')
        // }

        // if (!redirectCadastroCarreta) {
        //     setRedirectHome(true);
        // }

    }

    const checarDatas_entrada = async (e) => {
        //e.preventDefault()
        var data_prevista_entrada_d = new Date(e);
        data_prevista_entrada_d.setDate(data_prevista_entrada_d.getDate() + 1);
        var data_prevista_entrada_s = data_prevista_entrada_d.getFullYear()+'-'+(data_prevista_entrada_d.getMonth()+1)+'-'+data_prevista_entrada_d.getDate();
        console.log(data_prevista_entrada_s);
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        //console.log(datasBloqueadas.indexOf(data_prevista_entrada_d) >= 0);
        //console.log(datasBloqueadas);

        var flagDatas = false;

        carretasBloqueadas.forEach(function (arrayItem) {
            if (document.getElementById('placa_carreta').value == arrayItem.placa_carreta){
                // console.log(arrayItem.placa_carreta);
                arrayItem.arrayDatasBloqueadas.forEach(function (dataItem) {
                    console.log("DATA: " + dataItem + "DATA_PRETENDIDA: " + data_prevista_entrada_d);
                    var data_alugada = dataItem.getFullYear()+'-'+(dataItem.getMonth()+1)+'-'+dataItem.getDate();
                    if (data_prevista_entrada_s == data_alugada){
                        flagDatas = true;
                        document.getElementById('data_prevista_entrada').value = '';
                    }
                    if (data_prevista_entrada_s == data_alugada){
                        flagDatas = true;
                        document.getElementById('data_prevista_entrada').value = '';
                    }
                    
                });
            }
            
        });

        //console.log(flagDatas);

        if (data_prevista_entrada_d < today){
            window.confirm('Data de Saída precisa ser maior ou igual a data atual.')
        } else if (flagDatas) {
            window.confirm('Data Bloqueada por Outro Agendamento Verificar Calendário.')
            
        } else if (document.getElementById('data_prevista_entrada').value < document.getElementById('data_prevista_saida').value){
            window.confirm('Data de Retorno precisa ser maior ou igual a data de Saída.')
            document.getElementById('data_prevista_entrada').value = '';

        } else {
            setDataPrevistaEntrada(e);
        }
        
        // const { data } = await axios.get('carretas/placa/' + placa);
        // console.log(data);
        // if (!data) {
        //     const response = await axios.post('carretas/', {
        //         placa: placa,
        //         tipo: tipo,
        //         preco: preco,
        //         status: status,
        //     });
        //     console.log(response);
        //     window.confirm('Carreta cadastrada com sucesso')
        // } else {
        //     window.confirm('Essa carreta já está cadastrada, verificar seção "Carretas"')
        // }

        // if (!redirectCadastroCarreta) {
        //     setRedirectHome(true);
        // }

    }

    if (redirectHome == true) {
        return <Redirect to={'/'}></Redirect>
    } else if (redirectCadastroLocacao == true) {
        return <Redirect to={'/cadastroLocacao'}></Redirect>
    }

    return (
        <Wrapper>
            <div id="cadastro-carreta">
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
                                                class="form-field"
                                                type="date"
                                                name="data_prevista_saida"
                                                onChange={e => checarDatas_saida(e.target.value)}
                                                required
                                            />
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="forms-input">
                                        <label className='labels'>Data Prevista de Retorno</label>
                                            <input
                                                id="data_prevista_entrada"
                                                class="form-field"
                                                type="date"
                                                name="data_prevista_entrada"
                                                onChange={e => checarDatas_entrada(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                 
                                            <Calendar
                                                localizer={localizer}
                                                defaultDate={new Date()}
                                                defaultView="month"
                                                events={eventos}
                                                style={{ height: "30vh" }}
                                            />
                                      
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Valor da Locação</label>
                                            <input
                                                id="preco_total"
                                                class="form-field form-lg"
                                                type="float"
                                                placeholder="Informe o Preço da Locação"
                                                name="preco_total"
                                                maxlength="15"
                                                onChange={e => setPrecoTotal(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Placa do Veículo do Cliente</label>
                                            <input
                                                id="placa_veiculo"
                                                class="form-field form-lg"
                                                type="float"
                                                placeholder="Informe a Placa do Cliente"
                                                name="placa_veiculo"
                                                maxlength="15"
                                                onChange={e => setPlacaVeiculo(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className='col-lg-6'>
                                        <div className="forms-input">
                                            <label className="labels">Placa da Carreta</label>
                                            <input
                                                id="placa_carreta"
                                                class="form-field form-lg"
                                                type="float"
                                                placeholder="Informe a Placa da Carreta"
                                                name="placa_carreta"
                                                maxlength="15"
                                                onChange={e => setPlacaCarreta(e.target.value)}
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
            </div>
        </Wrapper >

    );
    // }
}

export default CadastroLocacao;