import React, { useState, useEffect } from 'react'
import "./index.css";
import axios from 'axios';


/* Import custom components */
import List from './components/list';

import Header from './components/header';
import Content from './components/content';


export default function App() {

    // this.state = {
    //   headerList : ['Name'],
    //   setClienteList: []
    // }

  const [funcionarioList, setFuncionarioList] = useState([])

  const [clienteList, setClienteList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8888/funcionario', {})
      .then(res => {
        //console.log(res)
        setFuncionarioList(res.data)
        //this.setState({setClienteList: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:8888/cliente', {})
      .then(res => {
        //console.log(res)
        setClienteList(res.data)
        //this.setState({setClienteList: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  const deleteHandler = id => {
      const newFuncionario = funcionarioList.filter(item => {
          return item.id !== id
      })

      setFuncionarioList(newFuncionario)
  }

  const updateHandler = funcionario => {
    setFuncionarioList(funcionarioList.map(item => {
          if(item.id === funcionario.id) {
              return {
                  ...item,
                  nome: funcionario.nome
              }
          } else {
              return item
          }
      }))
  }

  return (
  <div>
      <div class="form-container">
        <form class="register-form">
          <h1 class="title">Faça seu login</h1>
          <input
            id="logiin"
            class="form-field"
            type="text"
            placeholder="Login"
            name="login"
          />
          <input
            id="senha"
            class="form-field"
            type="password"
            placeholder="Senha"
            name="senha"
          />
          <button class="form-field button-submit" type="submit">
            Login
          </button>
        </form>
      </div>
      <div id="app">
          <div className="list">
                <Header data={['Nome', 'CPF', 'Renavam', 'Placa', 'Editar', 'Deletar']}></Header>
                <Content data={clienteList}></Content>
          </div>
        </div>
  </div>
  );
}