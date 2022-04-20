import React, {Component} from "react";
import { NavLink } from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse mt-5">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink to={'/'} exact className="nav-link">
                                Dashboard
                        </NavLink>
                    </li>
                    <li  className="nav-item">
                        <NavLink to={'/funcionarios'} className="nav-link">
                            Funcionarios
                        </NavLink>
                    </li>
                    <li  className="nav-item">
                        <NavLink to={'/registrar'} className="nav-link">
                            Registrar
                        </NavLink>
                    </li>
                    <li  className="nav-item">
                        <NavLink to={'/cadastroCliente'} className="nav-link">
                            Cadastro Cliente
                        </NavLink>
                    </li>
                    <li  className="nav-item">
                        <NavLink to={'/clientes'} className="nav-link">
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