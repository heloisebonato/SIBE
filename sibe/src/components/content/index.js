import React from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

/* Import custom components */
import Name from '../name';
// import Member from '../member';
// import Score from '../score';
// import Date from '../date';

class Content extends React.Component {
    getContentRow() {
        //console.log(this);
        return this.props.data.map((item, index) => {
            console.log(item.nome);
            return (
                <div key={index} className="contentRow">
                    <div className="name-row">
                        <div className="name">{item.nome}</div>
                    </div>
                    <div className="score-row">{item.cpf}</div>
                    <div className="score-row">{item.renavam}</div>
                    <div className="score-row">{item.placa}</div>
                    <div className="score-row"><Button startIcon={<EditIcon />} ></Button></div>
                    <div className="score-row"><Button startIcon={<DeleteIcon />} ></Button></div>
                    
                </div>
            );
        });
    }

    render() {
        return (
            <div className="content">
                {this.getContentRow()}
            </div>
        );
    }
}

export default Content;