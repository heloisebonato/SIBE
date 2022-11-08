import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./ListarLocacoes.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Locacoes = () => {
  const [locacoes, setLocacoes] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`locacoes?page=${page}`);

      setLocacoes(data);

      locacoes.sort((a, b) => b.locacao_id - a.locacao_id);
      console.log(locacoes);
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
      <div id="listar-agendamentos">
        <div className="row">
          <div className="col-lg-6 py-lg-5 py-3">
            <h2 className="title pl-5">Agendamentos</h2>
          </div>
          <div className="col-lg-6 py-lg-5 py-3 pl-5 pl-lg-0 d-flex justify-content-lg-end align-items-center">
            <NavLink to={"/cadastroLocacao"} className="nav-link">
              <a className="btn btn-criar" href="#/ ">
                {" "}
                <AddCircleIcon /> Criar Agendamento
              </a>
            </NavLink>
          </div>
        </div>
        <Table className="table">
          <Thead className="infos-titles">
            <Tr>
              <Th className="text">#</Th>
              <Th className="text">Nome Cliente</Th>
              <Th className="text">Placa Carro</Th>
              <Th className="text">Placa Carreta</Th>
              <Th className="text">Data Prevista Saída</Th>
              <Th className="text">Data Prevista Entrada</Th>
              <Th className="text">Valor</Th>
              <Th className="text">Status</Th>
              <Th className="text">Ações</Th>
            </Tr>
          </Thead>
          <Tbody className="infos-body">
            {locacoes
              .sort((a, b) => b.locacao_id - a.locacao_id)
              .map((locacao) => {
                return (
                  <Tr key={locacao.locacao_id}>
                    <Td className="text">{locacao.locacao_id}</Td>
                    <Td className="text">{locacao.nome}</Td>
                    <Td className="text">{locacao.placa_carro}</Td>
                    <Td className="text">{locacao.placa_carreta}</Td>
                    <Td className="text">{locacao.data_prevista_saida}</Td>
                    <Td className="text">{locacao.data_prevista_entrada}</Td>
                    <Td className="text">R$ {locacao.preco_total}</Td>
                    <Td className="text">{locacao.status}</Td>
                    <Td>
                      <div className="btn-group mr-2">
                        <Link
                          to={`/locacao/${locacao.locacao_id}/editar`}
                          exact
                          className="btn btn-action btn-sm"
                        >
                          <EditIcon />
                        </Link>
                        <a
                          href="#/"
                          className="btn btn-action btn-sm"
                          onClick={() => del(locacao.locacao_id)}
                        >
                          <DeleteIcon />
                        </a>
                      </div>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
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

export default Locacoes;
