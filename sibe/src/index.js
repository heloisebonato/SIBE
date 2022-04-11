import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {BrowserRouter, Route} from 'react-router-dom';
// // import Home from '.pages/Home';
// import {Link} from 'react-router-dom';

// const Rotas = () => {
//   return (
//     <BrowserRouter>
//       <Route exact={true} path="/" component={Home} />
//       <Route exact={true} path="/cadastroCliente" component={Home} />
//     </BrowserRouter>
//   )
// }

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);