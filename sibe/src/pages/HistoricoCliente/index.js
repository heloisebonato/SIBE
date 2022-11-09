import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./HistoricoCliente.css";
import GroupsIcon from "@mui/icons-material/Groups";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const HistoricoCliente = (props) => {
  const [historico, setHistorico] = useState([]);
  const [nome, setNome] = useState("");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      //console.log("historico");
      //console.log(props.match.params.cliente_id);

      var { data } = await axios.get(
        `historico/${props.match.params.cliente_id}`
      );
      console.log(props.match.params.cliente_id);
      if (props.match.params.cliente_id != null) {
        data = await axios.get(`historico/${props.match.params.cliente_id}`);
        console.log(data);
        if(data.data[0].length){
          setHistorico(data.data[0]);
          setNome(data.data[0][0].nome);
        }
        
        console.log(nome);
      }

      //historico.sort((a, b) => b.cliente_id - a.cliente_id);
      //console.log(historico);
      //setLastPage(data.meta.last_page);
      //console.log(data.meta.last_page);
    })();
  }, [page]);

  // const del = async (id: number) => {
  //     if (window.confirm('Are you sure you want to delete this record?')) {
  //         await axios.delete(`users/${id}`);

  //         setUsers(users.filter((u: User) => u.id !== id));
  //     }
  // }

  const next = () => {
    if (page <= lastPage) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const del = async (carreta_id) => {
    if (
      window.confirm(
        "Você tem certeza que deseja deletar o registro deste Agendamento?"
      )
    ) {
      // await axios.delete(`locacoes/${locacao_id}`);
      // setLocacoes(locacoes.filter(c => c.locacao_id !== locacao_id));
    }
  };

  return (
    <Wrapper>
      {/* <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div> */}
      <div id="historico">
        <div className="row">
          <div className="col-6 py-5">
            <h2 className="title pl-5">Histórico do Cliente - {nome}</h2>
          </div>
          <div className="col-6 py-lg-5 d-flex justify-content-end align-items-center">
            {/* <a className="btn btn-inadimplente"> <CheckCircleIcon />Agendamentos</a> */}
            <NavLink to={"/clientes"} className="nav-link">
              <a className="btn btn-criar" href="#/">
                {" "}
                <GroupsIcon />
                Ir para Clientes
              </a>
            </NavLink>
          </div>
        </div>
        <h3 className="subtitle pl-3">Agendamentos</h3>
        <Table className="table">
          <Thead className="infos-titles">
            <Tr>
              <Th className="text">Placa Carro</Th>
              <Th className="text">Placa Carreta</Th>
              <Th className="text">Data Prevista Saída</Th>
              <Th className="text">Data Prevista Entrada</Th>
              <Th className="text">Data Real Saída</Th>
              <Th className="text">Data Real Entrada</Th>
              <Th className="text">Valor</Th>
              <Th className="text">Status</Th>
              {/* <th className="text">Ações</th> */}
            </Tr>
          </Thead>
          <Tbody className="infos-body">
            {historico
              .sort((a, b) => b.cliente_id - a.cliente_id)
              .map((historico) => {
                return (
                  <Tr key={historico.cliente_id}>
                    <Td className="text">{historico.placa_carro}</Td>
                    <Td className="text">{historico.placa_carreta}</Td>
                    <Td className="text">{historico.data_prevista_saida}</Td>
                    <Td className="text">{historico.data_prevista_entrada}</Td>
                    <Td className="text">{historico.data_saida}</Td>
                    <Td className="text">{historico.data_entrada}</Td>
                    <Td className="text">R$ {historico.preco_total}</Td>
                    <Td className="text">{historico.status}</Td>
                    {/* <td>
                                                        <div className='btn-group mr-2'>
                                                            <Link to={`/locacao/${historico.cliente_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                            <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                                onClick={() => del(historico.cliente_id)}
                                                            ><DeleteIcon /></a>
                                                        </div>
                                                    </td> */}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
        {/* <nav>
                                <ul className='pagination'>
                                    <li className='page-item'>
                                        <a href='#' className='page-link'>Anterior</a>
                                    </li>
                                    <li className='page-item'>
                                        <a href='#' className='page-link' onClick={next}>Próximo</a>
                                    </li>
                                </ul>
                            </nav> */}
        {/* <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/> */}
      </div>
    </Wrapper>
  );
};

export default HistoricoCliente;
