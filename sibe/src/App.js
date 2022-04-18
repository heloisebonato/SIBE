import React, { useState, useEffect } from 'react'
import "./index.css";
import "./dashboard.css";
import axios from 'axios';
import Login from './pages/login';


/* Import custom components */
import List from './components/list';

import Header from './components/header';
import Content from './components/content';

import Nav from './components/nav';
import Menu from './components/menu';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Funcionario from './pages/Funcionarios';
import Register from './pages/Register';
import CadastroCliente from './pages/CadastroCliente';


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
  // <div>
  //     <Login></Login>
  //     <div id="app">
  //         <div classNameName="list">
  //               <Header data={['Nome', 'CPF', 'Renavam', 'Placa', 'Editar', 'Deletar']}></Header>
  //               <Content data={clienteList}></Content>
  //         </div>
  //       </div>
  // </div>

  <div>
    <BrowserRouter>
      <Route path={'/'} exact component={Dashboard}/>
      <Route path={'/funcionarios'} component={Funcionario}/>
      <Route path={'/registrar'} component={Register}/>   
      <Route path={'/login'} component={Login}/>  
      <Route path={'/cadastroCliente'} component={CadastroCliente}/>  

      
      </BrowserRouter>
  </div>


  );
}