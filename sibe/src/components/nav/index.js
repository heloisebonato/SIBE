import axios from "axios";
import React, {Component, useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
    const [funcionario, setFuncionario] = useState({
        nome: ''
    });

    useEffect( () => {
        (
            async () => {
                const {data} = await axios.get('funcionario');
            
                setFuncionario(data);
                //console.log(funcionario);
            }
        )();
    }, []);

    const logout = async () => {
        await axios.post('logout', {});
    }

    // render() {
        return (
            
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-1 col-lg-1 me-0 px-2" href="#">SIBE</a>
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">{funcionario?.nome}</a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
            <div className="navbar-nav">
            <div className="nav-item text-nowrap">
                <Link to="/login" className="nav-link px-3" href="#" onClick={logout}>Logout</Link>
            </div>
            </div>
            </header>
        );
    // }
}

export default Nav;