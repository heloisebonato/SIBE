import axios from "axios";
import React, {Component, useState} from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoSibe from "../../assets/images/logo-sibe.png";
import "./nav.css"
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from "react-router-dom";

const Nav = () => {
    const [funcionario, setFuncionario] = useState({
        nome: ''
    });

    const [rota, setRota] = useState("");

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

    const search = async () => {

        const value = document.getElementById('search').value;

        const result = await axios.get(`pesquisar/${value}`);

        console.log(result.data[0][0]);


        if (result.data[0][0].hasOwnProperty('carreta_id')){
            var rota = '/carretas/placa/' + result.data[0][0].placa
            console.log("CARRETA");
        }

        if (result.data[0][0].hasOwnProperty('cliente_id')){
            var rota = '/clientes/cpf/' + result.data[0][0].cpf
            console.log("CLIENTE");
        }

        console.log(rota);

        setRota(rota)
        
        
        
        //await axios.delete(`carretas/${carreta_id}`);

            

        //setCarretas(carretas.filter(c => c.carreta_id !== carreta_id));
        
    }

    // render() {
        return (
            <header className="navbar sticky-top flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mx-0 mr-lg-2" href="#"><img alt="logo-sibe" class="logo" src={logoSibe}></img></a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="search">
                <input className="form-control form-search" type="text" placeholder="Pesquisar" aria-label="Search" id="search" onChange={() => search()}/>
                {/* <Link to={`/carreta/${carreta.carreta_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon/></Link> */}
                <NavLink to={`${rota}`} className="button-procurar"> <SearchIcon className="searchIcon" /> </NavLink>
            </div>
            <a className="navbar-item" href="#">
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </a>
            <a className="navbar-item name-func px-3" href="#">
                <PersonIcon color="white" />
                {funcionario.nome}
            </a>
            <div className="navbar-nav">
            <div className="nav-item text-nowrap">
                <Link to="/login" className="nav-link px-3" href="#" onClick={logout}>
                    <LogoutIcon  />
                </Link>
            </div>
            </div>
            </header>
        );
    // }
}

export default Nav;