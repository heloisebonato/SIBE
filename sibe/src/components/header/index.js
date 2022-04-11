import React from 'react';
import './style.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                {this.props.data.map((item, index) => <div key={index} className="headerItem">{item}</div>)}
            </div>
        );
    }
}

export default Header;