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
            <header className="navbar sticky-top flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 mx-0 mr-lg-2" href="#"><img alt="logo-sibe" class="logo" src={logoSibe}></img></a>
            <button className="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <input className="form-control form-search" type="text" placeholder="Search" aria-label="Search"/>
            <a className="navbar-item" href="#">
                <IconButton color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </a>
            <a className="navbar-item name-func px-3" href="#">
                <PersonIcon color="white" />
                {funcionario?.nome}
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