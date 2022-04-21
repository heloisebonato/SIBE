import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import './menu.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import GroupsIcon from '@mui/icons-material/Groups';

class Menu extends React.Component {
    render() {
        return (
            
            <nav id="sidebarMenu" className="sidebar col-md-3 col-lg-2 d-md-block bg-light collapse mt-5">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <NavLink to={'/'} exact className="nav-link">
                                <DashboardIcon />
                                    Dashboard
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/funcionarios'} className="nav-link">
                            <PeopleIcon />
                                Funcionarios
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/registrar'} className="nav-link">
                            <AppRegistrationIcon />
                                Registrar
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/cadastroCliente'} exact className="nav-link">
                            <AddCircleIcon />
                                Cadastro Cliente
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/clientes'} className="nav-link">
                            <GroupsIcon />
                                Clientes
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;