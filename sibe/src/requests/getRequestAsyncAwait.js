const axios = require('axios');

const sendGetRequest = async () => {
    try {
        const resp = await axios.get('http://localhost:8888/cliente');
        // console.log(resp.data);
        this.setState({setClienteList: resp.data})
        this.state = {
            setClienteList: resp.data
        };
        console.log(this);
        console.log("TESTE");
        return resp.data
    } catch (err) {
        // Handle Error Here
        // console.error(err);
    }
};

export default sendGetRequest;