import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import './HistoricoCliente.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HistoricoCliente = (props) => {

    const [historico, setHistorico] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {

                console.log("historico")
                console.log(props.match.params.cliente_id)

                var { data } = await axios.get(`historico/${props.match.params.cliente_id}`)
    
                if (props.match.params.cliente_id != null){
                    data = await axios.get(`historico/${props.match.params.cliente_id}`)
                    setHistorico(data.data[0]);
                }

                

                //historico.sort((a, b) => b.cliente_id - a.cliente_id);
                //console.log(historico);
                //setLastPage(data.meta.last_page);
                //console.log(data.meta.last_page);
            }

        )()
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
    }

    const prev = () => {
        if (page >= 1) {
            setPage(page - 1);
        }
    }

    const del = async (carreta_id) => {
        if (window.confirm('Você tem certeza que deseja deletar o registro deste Agendamento?')) {
            // await axios.delete(`locacoes/${locacao_id}`);

            // setLocacoes(locacoes.filter(c => c.locacao_id !== locacao_id));
        }
    }

    return (
        <Wrapper>
            {/* <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div> */}
            <div id="listar-agendamentos">
                <div className="container tabela-lista-agendamentos">
                    <div className="row">
                        <div className="col-lg-6 py-5">
                            <h2 className="subtitle">Histórico do Cliente</h2>
                        </div>
                        <div className="col-lg-6 py-5 d-flex justify-content-center align-items-center">
                            {/* <a className="btn btn-inadimplente"> <CheckCircleIcon />Agendamentos</a> */}
                            <NavLink to={'/clientes'}  className="nav-link"><a className="btn btn-criar"> Ir para Clientes</a></NavLink>
                        </div>
                        <div className="col-12">
                            <h3>Agendamentos</h3>
                            <div className="table-responsive">
                                <table className="table table-striped table-sm">
                                    <thead className="infos-titles">
                                        <tr>
                                            <th className="text">Placa Carro</th>
                                            <th className="text">Placa Carreta</th>
                                            <th className="text">Data Prevista Saída</th>
                                            <th className="text">Data Prevista Entrada</th>
                                            <th className="text">Valor</th>
                                            <th className="text">Status</th>
                                            {/* <th className="text">Ações</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="infos-body">
                                        {historico.sort((a, b) => b.cliente_id - a.cliente_id).map((historico) => {
                                            return (
                                                <tr key={historico.cliente_id}>
                                                    <td className="text">{historico.placa_carro}</td>
                                                    <td className="text">{historico.placa_carreta}</td>
                                                    <td className="text">{historico.data_prevista_saida}</td>
                                                    <td className="text">{historico.data_prevista_entrada}</td>
                                                    <td className="text">R$ {historico.preco_total}</td>
                                                    <td className="text">{historico.status}</td>
                                                    {/* <td>
                                                        <div className='btn-group mr-2'>
                                                            <Link to={`/locacao/${historico.cliente_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                            <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                                onClick={() => del(historico.cliente_id)}
                                                            ><DeleteIcon /></a>
                                                        </div>
                                                    </td> */}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
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
                            </div>
                        </div>
                    </div>

                </div>

                {/* <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/> */}

                <nav>
                    <ul className='pagination mx-lg-3'>
                        <li className='page-item'>
                            <a href={prev} className='page-link' onClick={prev}>Anterior</a>
                        </li>
                        <li className='page-item'>
                            <a href={next} className='page-link' onClick={next}>Próximo</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Wrapper>
    );
}

export default HistoricoCliente;