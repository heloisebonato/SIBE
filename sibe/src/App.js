import React, { useState, useEffect } from 'react'
import "./index.css";
import axios from 'axios';


export default function App() {

  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8888/funcionario', {})
      .then(res => {
        console.log(res)
        setTodoList(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  const deleteHandler = id => {
      const newTodos = todoList.filter(item => {
          return item.id !== id
      })

      setTodoList(newTodos)
  }

  const updateHandler = todo => {
      setTodoList(todoList.map(item => {
          if(item.id === todo.id) {
              return {
                  ...item,
                  message: todo.message
              }
          } else {
              return item
          }
      }))
  }

  return (
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
  );
}