import React, {Component} from "react";
import { NavLink } from "react-router-dom";
import './menu.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import GroupsIcon from '@mui/icons-material/Groups';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
class Menu extends React.Component {
    render() {
        return (

            <nav id="sidebarMenu" className="sidebar col-md-3 col-lg-2 d-md-block collapse mt-lg-5">
                <div className="position-sticky pt-lg-5">
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
                                Funcionários
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/clientes'} className="nav-link">
                            <GroupsIcon />
                                Clientes
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/carretas'} exact className="nav-link">
                            <AddCircleIcon />
                                Carretas
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/engates'} exact className="nav-link">
                            <AddCircleIcon />
                                Engates
                            </NavLink>
                        </li>
                        <li  className="nav-item">
                            <NavLink to={'/locacoes'} exact className="nav-link">
                            <CalendarMonthIcon />
                                Agendamentos
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;