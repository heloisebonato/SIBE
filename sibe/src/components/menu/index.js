import React, {Component} from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
    render() {
        return (
            
            <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                <div className="position-sticky pt-3">
                    <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to={'/'} className="nav-link">
                                Dashboard
                        </Link>
                    </li>
                    <li  className="nav-item">
                        <Link to={'/funcionarios'} className="nav-link">
                            Funcionarios
                        </Link>
                    </li>
                    <li  className="nav-item">
                        <Link to={'/registrar'} className="nav-link">
                            Registrar
                        </Link>
                    </li>
                    <li  className="nav-item">
                        <Link to={'/cadastroCliente'} className="nav-link">
                            Cadastro Cliente
                        </Link>
                    </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Menu;