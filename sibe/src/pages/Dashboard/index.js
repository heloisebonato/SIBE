import "./Dashboard.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
//import {Bar} from 'react-chartjs-2'

import { Bar } from "react-chartjs-2";
//import { Chart as ChartJS } from "chart.js/auto";
//import UserData from "./Data";

// function getResponse() {
//     const promises = [];

//     promises.push(axios.get(`/countCarretasLoc`));

//     return Promise.all(promises)
//       .then(results => [].concat(...results));
//   }

const Dashboard = (props) => {
  // console.log(getResponse())

  const [countCarretasLoc, setcountCarretasLoc] = useState([]);
  const [userDataState, setuserDataState] = useState([]);

  const [labels_1, setLabels] = useState([]);
  const [value_1, setValue_1] = useState();

  const [userData, setUserData] = useState({
    labels: 0,
    datasets: [
      {
        label: "Users Gained",
        data: 0,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const [produtosAtivos, setProdutosAtivos] = useState([]);
  const [novosClientes, setNovosClientes] = useState(0);

  const [clientes, setClientes] = useState([]);
  const [clientes_carros, setClientesCarros] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  const [carros, setCarros] = useState([]);

  var chartConfigsD = [];

  const updateChart = (data) => {
    console.log(data);

    data.sort((a, b) => {
      return a.contagem_loc - b.contagem_loc;
    });

    let labels = [];
    let value = [];

    let UserDataT = [];

    data.forEach((element) => {
      labels.push(element.placa_carreta);
      value.push(parseInt(element.contagem_loc));

      const chartDataValue = [
        {
          label: element.placa_carreta,
          value: element.contagem_loc,
        },
      ];

      UserDataT.push(chartDataValue);
    });

    setUserData({
      labels: labels,
      datasets: [
        {
          label: "Carretas",
          data: value,
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
          order: 1,
        },
      ],
    });
  };

  useEffect(() => {
    (async () => {
      //console.log(data)

      if (props.match.params.cpf == null) {
        var { data } = await axios.get(`clientes?page=${page}`);
        setClientes(data);
        setClientesCarros(data);

        var data = await axios.get(`/produtosativos`);
        setProdutosAtivos(data.data[0]);

        var data = await axios.get(`/novosclientes`);
        setNovosClientes(data.data[0][0]);
        console.log(data.data[0][0]);

        var data = await axios.get(`/countCarretasLoc`).then((data) => {
          setcountCarretasLoc(data.data[0]);
          updateChart(data.data[0]);
        });
      }

      if (props.match.params.cpf != null) {
        data = await axios.get(`clientes/cpf/${props.match.params.cpf}`);
        setClientes(data.data);
        setClientesCarros(data.data);
      }

      clientes.sort((a, b) => b.cliente_id - a.cliente_id);

      const data_carros = await axios.get(`carros?page=${page}`);

      setCarros(data_carros.data);
    })();
  }, [page]);

  const next = () => {
    if (page <= lastPage) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page >= 1) {
      setLastPage(page - 1);
    }
  };

  const del = async (cliente_id) => {
    if (
      window.confirm(
        "Você tem certeza que deseja deletar o registro deste cliente?"
      )
    ) {
      await axios.delete(`clientes/${cliente_id}`);

      setClientes(clientes.filter((c) => c.cliente_id !== cliente_id));
    }
  };

  const del_carro = async (carro_id) => {
    if (
      window.confirm(
        "Você tem certeza que deseja deletar o registro deste veículo?"
      )
    ) {
      await axios.delete(`carros/${carro_id}`);

      //setClientes(clientes.filter(c => c.cliente_id !== cliente_id));
    }
  };

  return (
    <Wrapper>
      <div id="listar-clientes">
        <div className="row">
          <div className="col-lg-6 py-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-6 py-5">
                  <h2 className="subtitle">Dashboard</h2>
                </div>
                <div className="col-lg-6 py-5">
                  <h4>
                    {novosClientes.contagem_novos_clientes} Novos Clientes na
                    Última Semana
                  </h4>
                </div>
              </div>
              <div className="row">
                <h4>Produtos Ativos</h4>
                <div className="col-lg-12">
                  <div className="table-responsive">
                    <div className="infos-titles">
                      <div className="row">
                        <div className="col-lg-1 conf">
                          <div className="text">#</div>
                        </div>
                        <div className="col-lg-3 conf">
                          <div className="text">Nome</div>
                        </div>
                        <div className="col-lg-2 conf">
                          <div className="text">Data Saída</div>
                        </div>
                        <div className="col-lg-2 conf">
                          <div className="text">Data Prevista Entrada</div>
                        </div>
                        <div className="col-lg-4 conf">
                          <div className="text">Ações</div>
                        </div>
                      </div>
                    </div>
                    {produtosAtivos
                      .sort((a, b) => b.locacao_id - a.locacao_id)
                      .map((produtosAtivos) => {
                        return (
                          <div className="infos-body">
                            <div
                              className="row"
                              key={produtosAtivos.locacao_id}
                            >
                              <div className="col-lg-1 conf">
                                <div className="text">
                                  {produtosAtivos.locacao_id}
                                </div>
                              </div>
                              <div className="col-lg-3 conf">
                                <div className="text">
                                  {produtosAtivos.nome}
                                </div>
                              </div>
                              <div className="col-lg-2 conf">
                                <div className="text">
                                  {produtosAtivos.data_saida}
                                </div>
                              </div>
                              <div className="col-lg-2 conf">
                                <div className="text">
                                  {produtosAtivos.data_prevista_saida}
                                </div>
                              </div>
                              <div className="col-lg-4 conf">
                                <div className="btn-group mr-2">
                                  <div className="btn-group mr-2">
                                    <Link
                                      to={`/locacao/${produtosAtivos.locacao_id}/editar`}
                                      exact
                                      className="btn btn-action btn-sm btn-outline-secondary"
                                    >
                                      <EditIcon />
                                    </Link>
                                  </div>

                                  <Link
                                    to={`/historico/${produtosAtivos.cliente_id}`}
                                    exact
                                    className="btn btn-action btn-sm btn-outline-secondary"
                                  >
                                    {" "}
                                    Histórico
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 py-5">
            <h2 className="subtitle">Carretas Mais Locadas</h2>
            <Bar data={userData} />
          </div>
        </div>
      </div>
      <nav>
        <ul className="pagination mx-lg-3">
          <li className="page-item">
            <a href={prev} className="page-link" onClick={prev}>
              Anterior
            </a>
          </li>
          <li className="page-item">
            <a href={next} className="page-link" onClick={next}>
              Próximo
            </a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Dashboard;
