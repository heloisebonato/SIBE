import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Cliente } from '../../models/cliente';
import './ListarClientes.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [clientes_carros, setClientesCarros] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const [carros, setCarros] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get(`clientes?page=${page}`);

                setClientes(data);
                setClientesCarros(data);

                clientes.sort((a, b) => b.cliente_id - a.cliente_id);
                console.log(data);

                const data_carros = await axios.get(`carros?page=${page}`);

                setCarros(data_carros.data);
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
            setLastPage(page - 1);
        }
    }

    const del = async (cliente_id) => {
        if (window.confirm('Você tem certeza que deseja deletar o registro deste cliente?')) {
            await axios.delete(`clientes/${cliente_id}`);

            setClientes(clientes.filter(c => c.cliente_id !== cliente_id));
        }
    }

    const del_carro = async (carro_id) => {
        if (window.confirm('Você tem certeza que deseja deletar o registro deste veículo?')) {
            await axios.delete(`carros/${carro_id}`);

            //setClientes(clientes.filter(c => c.cliente_id !== cliente_id));
        }
    }


    return (
        <Wrapper>
            <div id="listar-clientes">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 py-5">
                            <h2 className="subtitle">Clientes</h2>
                        </div>
                        <div className="col-lg-6 py-5 d-flex justify-content-center align-items-center">
                            <a className="btn btn-inadimplente"> <PersonOutlineIcon />Clientes Inadimplentes</a>
                            <NavLink to={'/cadastroCliente'} className="nav-link"><a className="btn btn-criar"> <PersonAddAltIcon /> Criar Cliente</a></NavLink>
                        </div>
                    </div>
                    <div className="row">
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
                                            <div className="text">CPF</div>
                                        </div>
                                        <div className="col-lg-2 conf">
                                            <div className="text">CNH</div>
                                        </div>
                                        <div className="col-lg-4 conf">
                                            <div className="text">Ações</div>
                                        </div>
                                    </div>
                                </div>
                                {clientes.sort((a, b) => b.cliente_id - a.cliente_id).map((cliente) => {
                                    return (
                                        <div className="infos-body">
                                            <div className="row" key={cliente.cliente_id}>
                                                <div className="col-lg-1 conf">
                                                    <div className="text">{cliente.cliente_id}</div>
                                                </div>
                                                <div className="col-lg-3 conf">
                                                    <div className="text">{cliente.nome}</div>
                                                </div>
                                                <div className="col-lg-2 conf">
                                                    <div className="text">{cliente.cpf}</div>
                                                </div>
                                                <div className="col-lg-2 conf">
                                                    <div className="text">{cliente.cnh}</div>
                                                </div>
                                                <div className="col-lg-4 conf">
                                                    <div className='btn-group mr-2'>
                                                        <Link to={`/cliente/${cliente.cliente_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                        <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                            onClick={() => del_carro(cliente.cliente_id)}
                                                        ><DeleteIcon /></a>
                                                        <button className="btn btn-carros" type="button" data-toggle="collapse" data-target={`#collapse${cliente.cliente_id}`} aria-expanded="false" aria-controls={`collapse${cliente.cliente_id}`}>
                                                            <DirectionsCarIcon /> Veículos
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="collapse" id={`collapse${cliente.cliente_id}`}>
                                                {clientes_carros.sort((a, b) => b.cliente_id - a.cliente_id).map((clientes_carro) => {
                                                    if (cliente.cliente_id === clientes_carro.cliente_id)
                                                        return (
                                                            <div className="table table-carros">
                                                                <div className="infos-titles">
                                                                    <div className="row">
                                                                        <div className="col-12 d-flex justify-content-around align-items-center">
                                                                            <div className="text px-lg-3">Renavam</div>
                                                                            <div className="text px-lg-3">Placa</div>
                                                                            <div className="text px-lg-3">Tipo</div>
                                                                            <div className="text px-lg-3">Status</div>
                                                                            <div className="text px-lg-3">#</div>
                                                                            <div className="text px-lg-3">Ações</div>
                                                                            <NavLink to={`/cadastroCarro/${cliente.cliente_id}`} className="nav-link"><a className="btn btn-criar"> Adicionar Veículo</a></NavLink>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {carros.map((carro) => {
                                                                    if (carro.cliente_id === clientes_carro.cliente_id)
                                                                        return (
                                                                            <div className="infos-body">
                                                                                <div className="row" key={clientes_carro.cliente_id}>
                                                                                    <div className="col-12 ml-3 d-flex justify-content-around align-items-center">
                                                                                        <div className="text">{carro.renavam}</div>
                                                                                        <div className="text">{carro.placa}</div>
                                                                                        <div className="text">{carro.tipo}</div>
                                                                                        <div className="text">{carro.status}</div>
                                                                                        <div className="text">{carro.cliente_id}</div>
                                                                                        <div>
                                                                                            <div className='btn-group'>
                                                                                                <Link to={`/carro/${carro.carro_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                                                                <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                                                                    onClick={() => del(carro.carro_id)}
                                                                                                ><DeleteIcon /></a>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-lg-2"></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                })}
                                                            </div>
                                                        )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
        </Wrapper >
    );
}

export default Clientes;