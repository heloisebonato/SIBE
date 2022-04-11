import React from 'react';
import './style.css';

class Name extends React.Component {
    render() {
        console.log(this.props.nome);
        return (
            <div className="name-row">
                <div className="name">{this.props.nome}</div>
                {/* <div className="email">{this.props.email}</div> */}
            </div>
        );
    }
}

export default Name;