import axios from "axios";
import React, { Component, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoSibe from "../../assets/images/logo-sibe.png";
import "./nav.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink } from "react-router-dom";
import { PopperUnstyled } from "@mui/base";
import {
  Paper,
  Tooltip,
  Badge,
  IconButton,
  List,
  ListItem,
  Divider,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";

const Nav = () => {
  const [funcionario, setFuncionario] = useState({
    nome: "",
  });
  const [rota, setRota] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("funcionario");

      setFuncionario(data);

      getNotificacao();
    })();
  }, []);

  const getNotificacao = () =>
    axios
      .get("/notificacao")
      .then((response) => {
        console.log("GET Response");
        //console.log(response.data[0]);
        setNotificacao(response.data[0]);
        console.log(notificacoes);

        //response.send(data);
      })
      .catch(function (error) {
        console.log("Error in getting notificações");
      });

  // axios.get("/notificacao").then((response) => {
  //     const notificacoes_data = response.data;
  //     setNotificacao(notificacoes_data);
  //     console.log("teste notificao!!!!22222222222222222")
  //     console.log(notificacoes);
  // })

  const logout = async () => {
    await axios.post("logout", {});
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "notifications-popup" : undefined;

  const [notificacoes, setNotificacao] = useState([]);

  const showNotification = async () => {
    var element = document.getElementById("tb-notificacao");
    if (element.classList.contains("d-lg-none")) {
      element.classList.remove("d-lg-none");
    } else {
      element.classList.add("d-lg-none");
    }
  };

  const search = async () => {
    const value = document.getElementById("search").value;

    const result = await axios.get(`pesquisar/${value}`);

    console.log(result.data[0][0]);

    if (result.data[0][0].hasOwnProperty("carreta_id")) {
      var rota = "/carretas/placa/" + result.data[0][0].placa;
      console.log("CARRETA");
    }

    if (result.data[0][0].hasOwnProperty("cliente_id")) {
      var rota = "/clientes/cpf/" + result.data[0][0].cpf;
      console.log("CLIENTE");
    }

    console.log(rota);

    setRota(rota);

    //await axios.delete(`carretas/${carreta_id}`);

    //setCarretas(carretas.filter(c => c.carreta_id !== carreta_id));
  };

  // render() {
  return (
    <header className="navbar sticky-top flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 mx-0 mr-lg-2" href="#/">
        <img alt="logo-sibe" class="logo" src={logoSibe}></img>
      </a>
      <button
        className="navbar-toggler position-absolute d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="search">
        <input
          className="form-control form-search"
          type="text"
          placeholder="Pesquisar"
          aria-label="Search"
          id="search"
          onChange={() => search()}
        />
        {/* <Link to={`/carreta/${carreta.carreta_id}/editar`} exact className='btn btn-action btn-sm btn-outline-secondary'><EditIcon/></Link> */}
        <NavLink to={`${rota}`} className="button-procurar">
          {" "}
          <SearchIcon className="searchIcon" />{" "}
        </NavLink>
      </div>
      <a className="navbar-item" href="#/">
        <Tooltip title="Notificações">
          <IconButton
            color="inherit"
            onClick={handleClick}
            aria-describedby={id}
            type="button"
          >
            <Badge badgeContent={notificacoes.length} color="secondary">
              <NotificationsIcon />
              <PopperUnstyled id={id} open={open} anchorEl={anchorEl}>
                <Paper elevation={1}>
                  <List>
                    <Typography className="text-item">Agendamentos</Typography>
                    <ListItem>
                    {notificacoes
                      .sort((a, b) => b.locacao_id - a.locacao_id)
                        .map((notificacoes) => {
                          return(
                      <><ListItemText key={notificacoes.locacao_id}
                              primary={<Typography className="text-title">Carreta: {notificacoes.placa_carreta}</Typography>}
                              secondary={<Typography className="text" component="span">Status: {notificacoes.status_agendamento}</Typography>}
                            ></ListItemText><ListItemButton className="btn-group">
                                <Link
                                  to={`/locacoes/${notificacoes.locacao_id}`}
                                  exact
                                  className="btn-go btn-sm"
                                >
                                  Go
                                </Link>
                              </ListItemButton>
                              <Divider /></>
                      );
                  })}
                    </ListItem>
                  </List>
                </Paper>
              </PopperUnstyled>
            </Badge>
          </IconButton>
        </Tooltip>
      </a>
      <a className="navbar-item name-func px-3" href="#/">
        <PersonIcon color="white" />
        {funcionario.nome}
      </a>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap">
          <Tooltip title="Sair">
            <Link
              to="/login"
              className="nav-link px-3"
              href="#"
              onClick={logout}
            >
              <LogoutIcon />
            </Link>
          </Tooltip>
        </div>
      </div>
    </header>
  );
  // }
};

export default Nav;
