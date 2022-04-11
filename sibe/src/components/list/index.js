import React from 'react';
import './style.css';

import axios from 'axios';

/* Import custom components */
import Header from '../header';
import Content from '../content';


// import sendGetRequest from '../../requests/getRequestAsyncAwait';

/* Import custom data */
// import Clients from '../../configClient';


class List extends React.Component {
      
    
    constructor(props) {

        // let x = sendGetRequest();

        super(props);

        // const [clienteList, setClienteList] = useState([])

        var self = this;

        this.state = { clienteList: [], setClienteList: ['1'] };

        // useEffect(() => {
        // axios.get('http://localhost:8888/cliente', {})
        //     .then(res => {
        //     // console.log(res)
        //     self.setState({setClienteList: res.data})
        //     })
        //     .catch(err => {
        //     console.log(err)
        //     })
        //   }, [])

        // const sendGetRequest = async () => {
        //     try {
        //         const resp = await axios.get('http://localhost:8888/cliente');
        //         // console.log(resp.data);
        //         this.setState({setClienteList: resp.data})
        //         this.state = {
        //             setClienteList: resp.data
        //         };
        //         console.log(this);
        //     } catch (err) {
        //         // Handle Error Here
        //         // console.error(err);
        //     }
        // };


        this.state = {
            // headerList : ['Name', 'Member', 'Score', 'Expiration'],
            headerList : ['Name'],
            clientList: self.setClienteList
        };
        //console.log(this);
        this.state = {
            collection: ''
        }
          this.getCollection = this.getCollection.bind(this)
    }

    componentDidMount() {
        console.log('component did mount')
        this.getCollection();
      }
    
    async getCollection() {
        try {
            const response = await fetch('http://localhost:8888/cliente');
            const responseJSON = await response.json();

            this.setState({ collection: responseJSON }, () => {
            console.log("App Component - getCollection() State Updated", this.state);
            });

        } catch (error) {
            console.log("App Component - getCollection() error", error);
        }
    }
    

    // async componentDidMount() {
    //     const response = await axios.get('http://localhost:8888/cliente')
    //     const setClienteList = response.data
    //     this.setState({setClienteList: setClienteList})
    //     console.log('teste');
    // }

    // componentDidMount() {
    //     axios.get('http://localhost:8888/cliente')
    //       .then(rep => {
    //         this.setState({setClienteList: rep.data})
    //         console.log('teste')
    //       })
    //       .catch(err => console.log(err))
    // }



    render() {
        return (
            
            <div className="list">
                <Header data={this.state.headerList}></Header>
                <Content data={this.state.setClienteList}></Content>
            </div>
        );
    }
}

export default List;