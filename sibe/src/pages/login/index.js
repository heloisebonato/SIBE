import React, { useState } from 'react';
import "./style.css";
import { Redirect } from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {

    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('login', {
            login,
            senha
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Redirect to={'/'}></Redirect>;
    }

    return (
    <div class="login">
        <div class="form-container">
        <form class="register-form" onSubmit={handleSubmit}>
            <h1 class="title">Login</h1>
            <input
                id="login"
                class="form-field"
                type="text"
                placeholder="Login"
                name="login"
                onChange={(e) =>{
                    setLogin(e.target.value);
                }}
            />
            <input
                id="senha"
                class="form-field"
                type="password"
                placeholder="Senha"
                name="senha"
                onChange={(e) =>{
                    setSenha(e.target.value);
                }}
            />
            <button class="form-field button-submit" type="submit">
                Login
            </button>
        </form>
    </div>
  </div>
  )
}

export default Login;