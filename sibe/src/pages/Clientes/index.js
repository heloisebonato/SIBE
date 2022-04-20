import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Wrapper from '../../components/wrapper/wrapper';
import {Link} from "react-router-dom";
import { Cliente } from '../../models/cliente';

const Clientes = () => {
    //const [clientes, setClientes] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`clientes?page=${page}`);

                setClientes(data);
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
        if (page >= 1){
            setPage(page - 1);
        }
    }

    const del = async (cliente_id) => {
        if(window.confirm('Você tem certeza que deseja deletar o registro deste cliente?')){
            await axios.delete(`clientes/${cliente_id}`);

            setClientes(clientes.filter(c => c.cliente_id !== cliente_id));
        }
    }

    return (
        <Wrapper>
            {/* <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to="/users/create" className="btn btn-sm btn-outline-secondary">Add</Link>
            </div> */}

            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>CNH</th>
                        <th>CPF</th>
                        <th>RG</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Nº</th>
                        <th>Cidade</th>
                        <th>Estado</th>
                        <th>Mãe</th>
                        <th>Renavam</th>
                        <th>Placa</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map((cliente) => {
                        return (
                            <tr key={cliente.cliente_id}>
                                <td>{cliente.cliente_id}</td>
                                <td>{cliente.nome}</td>
                                <td>{cliente.data_nascimento}</td>
                                <td>{cliente.cnh}</td>
                                <td>{cliente.cpf}</td>
                                <td>{cliente.rg}</td>
                                <td>{cliente.cep}</td>
                                <td>{cliente.endereco}</td>
                                <td>{cliente.n_casa}</td>
                                <td>{cliente.cidade}</td>
                                <td>{cliente.estado}</td>
                                <td>{cliente.nome_mae}</td>
                                <td>{cliente.renavam}</td>
                                <td>{cliente.placa}</td>
                                <td>
                                    <div className='btn-group mr-2'>
                                        <a href='#' className='btn btn-sm btn-outline-secondary'
                                            onClick={() => del(cliente.cliente_id)}
                                        >Deletar</a>
                                    </div>
                                </td>        
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {/* <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/> */}

            <nav>
                <ul className='pagination'>
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

{/* <td>
                                    <div className="btn-group mr-2">
                                        <Link to={`/users/${user.id}/edit`}
                                              className="btn btn-sm btn-outline-secondary">Edit</Link>
                                        <a href="#" className="btn btn-sm btn-outline-secondary"
                                           onClick={() => del(user.id)}
                                        >Delete</a>
                                    </div>
                                </td> */}

export default Clientes;