import React, {Component} from 'react';
import Nav from '../nav';
import Menu from '../menu';
import axios from "axios";
import {useState, useEffect} from "react";
import { Redirect } from 'react-router-dom';

const Wrapper = (props) => {
    const [redirect, setRedirect] = useState(false);

    useEffect( () => {
        (
            async () => {
                try {
                    const {data} = await axios.get('funcionario');
                } catch (e){
                    setRedirect(true);
                }

                //console.log(redirect)
            }
        )();
    }, [])

    if (redirect) {
        return <Redirect to='/login'/>
    }

    // render () {
        return (
            <div>
               <Nav></Nav>

                <div className="container-fluid">
                <div className="row">
                    <Menu></Menu>

                    <main className="dashboard col-md-9 ms-sm-auto col-lg-10 px-0 table-display">
                        {props.children}

                    {/* <Dashboard></Dashboard> */}
                    </main>
                </div>

                </div>
            </div>

        );
    // }
}

export default Wrapper;