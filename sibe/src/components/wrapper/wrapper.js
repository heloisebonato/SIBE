import React, {Component} from 'react';
import Nav from '../nav';
import Menu from '../menu';

class Wrapper extends React.Component {
    render () {
        return (
            <div>
               <Nav></Nav>

                <div className="container-fluid">
                <div className="row">
                    <Menu></Menu>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 table-display">
                        {this.props.children}
                            
                    
                    {/* <Dashboard></Dashboard> */}
                    </main>
                </div>

                </div>
            </div>

        );
    }
}

export default Wrapper;