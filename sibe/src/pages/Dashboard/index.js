import "./Dashboard.css";
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Bar, CategoryScale } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
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
  const [notificacoes, setNotificacao] = useState([]);

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
            "#d1ff33",
            "#f50057",
            "#ffea00",
            "#ff9100",
            "#dd33fa",
          ],
          borderColor: "black",
          borderWidth: 1,
          borderRadius: 4,
          order: 1,
        },
      ],
    });
  };

  const getNotificacao = () =>
    axios
      .get("/notificacao")
      .then((response) => {
        console.log("GET Response");
        //console.log(response.data[0]);
        setNotificacao(response.data[0]);
        console.log(notificacoes);

        //response.send(data);
      })
      .catch(function (error) {
        console.log("Error in getting notificações");
      });

  useEffect(() => {
    (async () => {
      //console.log(data)

      getNotificacao();

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
      <div className="dashboard">
        <div className="row">
          <div className="col-lg-6 pt-5">
            <h2 className="title pl-5">Dashboard</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <div className="box-new-clients mx-5 mt-5">
              <div className="row">
                <div className="col">
                  <h4 className="title">Novos clientes</h4>
                  <p className="text"> na última semana</p>
                  <h4 className="number">
                    {novosClientes.contagem_novos_clientes}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="box-notificacoes mx-5 mt-5">
              <div className="row">
                <div className="col">
                  <h4 className="title pl-4">Número agendamentos</h4>
                  <p className="text">status atrasado</p>
                  <h4 className="number">{notificacoes.length}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4 className="subtitle pt-lg-5">Produtos Ativos</h4>
        <Table className="table px-4">
          <Thead className="infos-titles">
            <Tr>
              <Th className="text">#</Th>
              <Th className="text">Nome</Th>
              <Th className="text">Data saída</Th>
              <Th className="text">Data prevista entrada</Th>
              <Th className="text">Ações</Th>
            </Tr>
          </Thead>
          <Tbody className="infos-body">
            {produtosAtivos
              .sort((a, b) => b.locacao_id - a.locacao_id)
              .map((produtosAtivos) => {
                return (
                  <Tr key={produtosAtivos.locacao_id}>
                    <Td className="text">{produtosAtivos.locacao_id}</Td>
                    <Td className="text">{produtosAtivos.nome}</Td>
                    <Td className="text">{produtosAtivos.data_saida}</Td>
                    <Td className="text">
                      {produtosAtivos.data_prevista_saida}
                    </Td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/locacao/${produtosAtivos.locacao_id}/editar`}
                        exact
                        className="btn btn-action btn-sm"
                      >
                        <EditIcon />
                      </Link>
                      <Link
                        to={`/historico/${produtosAtivos.cliente_id}`}
                        exact
                        className="btn btn-action btn-sm"
                      >
                        {" "}
                        Histórico
                      </Link>
                    </div>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        <div className="row">
          <div className="col-lg-6 py-5 px-5 mx-5">
            <h2 className="subtitle">Carretas Mais Locadas</h2>
            <Bar data={userData} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Dashboard;
