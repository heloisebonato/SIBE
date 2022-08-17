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

const Clientes = (props) => {
    const [clientes, setClientes] = useState([]);
    const [clientes_carros, setClientesCarros] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    const [carros, setCarros] = useState([]);

    useEffect(() => {
        (
            async () => {

                if (props.match.params.cpf == null){

                var { data } = await axios.get(`clientes?page=${page}`);
                setClientes(data);
                setClientesCarros(data);
                }

                if (props.match.params.cpf != null){
                    data = await axios.get(`clientes/cpf/${props.match.params.cpf}`);
                    setClientes(data.data);
                    setClientesCarros(data.data);
                }

                clientes.sort((a, b) => b.cliente_id - a.cliente_id);

                const data_carros = await axios.get(`carros?page=${page}`);

                setCarros(data_carros.data);
            }

        )()
    }, [page]);

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
            {/* <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div> */}

            <div className="container">
                <div className="row">
                    <div className="col-lg-6 py-5">
                        <h2 className="subtitle">Clientes</h2>
                    </div>
                    <div className="col-lg-6 py-5 d-flex justify-content-center align-items-center">
                        <a className="btn btn-inadimplente"> <PersonOutlineIcon />Clientes Inadimplentes</a>
                        <NavLink to={'/cadastroCliente'} className="nav-link"><a className="btn btn-criar"> <PersonAddAltIcon /> Criar Cliente</a></NavLink>
                    </div>
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <thead className="infos-titles">
                                    <tr>
                                        <th className="text">#</th>
                                        <th className="text">Nome</th>
                                        <th className="text">CPF</th>
                                        <th className="text">CNH</th>
                                        {/* <th className="text">Placa</th> */}
                                        <th className="text">AÇÕES</th>
                                    </tr>
                                </thead>


                                {clientes.sort((a, b) => b.cliente_id - a.cliente_id).map((cliente) => {
                                    return (
                                        <tbody className="infos-body">



                                            <tr key={cliente.cliente_id}>
                                                <td className="text">{cliente.cliente_id}</td>
                                                <td className="text">{cliente.nome}</td>
                                                <td className="text">{cliente.cpf}</td>
                                                <td className="text">{cliente.cnh}</td>
                                                {/* <td className="text">{cliente.placa}</td> */}
                                                <td>
                                                    <div className='btn-group mr-2'>
                                                        <Link to={`/cliente/${cliente.cliente_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                        <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                            onClick={() => del_carro(cliente.cliente_id)}
                                                        ><DeleteIcon /></a>
                                                        {/* <a class="btn btn-primary" data-toggle="collapse" href={`#collapse${cliente.cliente_id}`} role="button" aria-expanded="false" aria-controls={`#collapse${cliente.cliente_id}`}>
                                                        Link with href
                                                    </a> */}
                                                        <button className="btn btn-carros" type="button" data-toggle="collapse" data-target={`#collapse${cliente.cliente_id}`} aria-expanded="false" aria-controls={`collapse${cliente.cliente_id}`}>
                                                           <DirectionsCarIcon /> Veículos
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <div className="collapse" id={`collapse${cliente.cliente_id}`}>

                                                {clientes_carros.sort((a, b) => b.cliente_id - a.cliente_id).map((clientes_carro) => {
                                                    if (cliente.cliente_id == clientes_carro.cliente_id)
                                                        return (
                                                            <table className="table table-striped table-sm table-carros">
                                                                <thead className="infos-titles">
                                                                    <tr>
                                                                        <th className="text">Renavam</th>
                                                                        <th className="text">Placa</th>
                                                                        <th className="text">Tipo</th>
                                                                        <th className="text">Status</th>
                                                                        <th className="text">#</th>
                                                                        {/* <th className="text">ID</th> */}

                                                                        <NavLink to={`/cadastroCarro/${cliente.cliente_id}`} className="nav-link"><a className="btn btn-criar"> Adicionar Veículo</a></NavLink>
                                                                    </tr>

                                                                </thead>

                                                                {carros.map((carro) => {
                                                                    if (carro.cliente_id === clientes_carro.cliente_id)
                                                                        return (
                                                                            <tbody className="infos-body">

                                                                                <tr key={clientes_carro.cliente_id}>


                                                                                    <td className="text">{carro.renavam}</td>
                                                                                    <td className="text">{carro.placa}</td>
                                                                                    <td className="text">{carro.tipo}</td>
                                                                                    <td className="text">{carro.status}</td>
                                                                                    <td className="text">{carro.cliente_id}</td>
                                                                                    {/* <td className="text">{carro.carro_id}</td> */}

                                                                                    <td>
                                                                                        <div className='btn-group mr-2'>
                                                                                            <Link to={`/carro/${carro.carro_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon /></Link>
                                                                                            <a href='#' className='btn btn-action btn-sm btn-outline-secondary'
                                                                                                onClick={() => del(carro.carro_id)}
                                                                                            ><DeleteIcon /></a>

                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        )
                                                                })}
                                                            </table>
                                                        )
                                                })}
                                            </div>
                                        </tbody>
                                    )
                                })}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <nav>
                <ul className='pagination mx-lg-3'>
                    <li className='page-item'>
                        <a href='#' className='page-link'>Anterior</a>
                    </li>
                    <li className='page-item'>
                        <a href='#' className='page-link' onClick={next}>Próximo</a>
                    </li>
                </ul>
            </nav>

        </Wrapper>
    );
}

export default Clientes;