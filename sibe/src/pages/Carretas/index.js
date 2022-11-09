import axios from "axios";
import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/wrapper";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Cliente } from "../../models/cliente";
import "./ListarCarretas.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const Carretas = (props) => {
  const [carretas, setCarretas] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      // const { data } = await axios.get(`carretas?page=${page}`);

      // setCarretas(data);

      // carretas.sort((a, b) => b.carreta_id - a.carreta_id);
      // console.log(carretas);
      //setLastPage(data.meta.last_page);
      //console.log(data.meta.last_page);

      //console.log(props.match.params.placa);

      var { data } = await axios.get(`carretas?page=${page}`);

      if (props.match.params.placa == null) {
        var { data } = await axios.get(`carretas?page=${page}`);
        setCarretas(data);
        //setClientesCarros(data);
      }

      if (props.match.params.placa != null) {
        //router.get('/carretas/placa/:placa', AuthMiddleware, GetCarretaByPlaca);
        data = await axios.get(`carretas/placa/${props.match.params.placa}`);
        console.log(data.data);
        setCarretas(data.data);
        //setClientesCarros(data.data);
      }
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
        "Você tem certeza que deseja deletar o registro desta carreta?"
      )
    ) {
      await axios.delete(`carretas/${carreta_id}`);

      setCarretas(carretas.filter((c) => c.carreta_id !== carreta_id));
    }
  };

  return (
    <Wrapper>
      {/* <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div> */}

      <div className="row">
        <div className="col-lg-6 py-lg-5 py-3">
          <h2 className="title pl-5">Carretas</h2>
        </div>
        <div className="col-lg-6 py-lg-5 py-3 d-flex justify-content-lg-end justify-content-center align-items-center">
          <NavLink to={"/locacoes"} className="nav-link">
            <a className="btn" href="#locacoes">
              {" "}
              <CheckCircleIcon /> Carretas Locadas
            </a>
          </NavLink>
          <NavLink to={"/cadastroCarreta"} className="nav-link">
            <a className="btn" href="#cadastroCarreta">
              {" "}
              <AddCircleIcon /> Criar Carreta
            </a>
          </NavLink>
        </div>
      </div>
      <Table className="table">
        <Thead className="infos-titles">
          <Tr>
            <Th className="text">#</Th>
            <Th className="text">Placa</Th>
            <Th className="text">Tipo</Th>
            <Th className="text">Preço</Th>
            <Th className="text">Status</Th>
            <Th className="text">Ações</Th>
          </Tr>
        </Thead>
        <Tbody className="infos-body">
          {carretas
            .sort((a, b) => b.carreta_id - a.carreta_id)
            .map((carreta) => {
              return (
                <Tr key={carreta.carreta_id}>
                  <Td className="text">{carreta.carreta_id}</Td>
                  <Td className="text">{carreta.placa}</Td>
                  <Td className="text">{carreta.tipo}</Td>
                  <Td className="text">R$ {carreta.preco}</Td>
                  <Td className="text">{carreta.status}</Td>
                  <Td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/carreta/${carreta.carreta_id}/editar`}
                        exact
                        className="btn btn-action btn-sm"
                      >
                        <EditIcon />
                      </Link>
                      <a
                        href="#/"
                        className="btn btn-action btn-sm"
                        onClick={() => del(carreta.carreta_id)}
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

      <nav>
        <ul className="pagination mx-lg-3">
          <li className="page-item">
            <a href="#" className="page-link">
              Anterior
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link" onClick={next}>
              Próximo
            </a>
          </li>
        </ul>
      </nav>
    </Wrapper>
  );
};

export default Carretas;
