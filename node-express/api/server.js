const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./dbConfig');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

//const testData = require('../testData');


//--------------------------------------------------------------------------------------------------------BACK-END FUNCIONARIO------------------------------------------//

server.get('/', (req,res) => {
    res.send('Welcome to the Funcionario app server!!!')
});

server.get('/funcionario', async (req,res) => {
    // GET all funcionario
    try {
        const funcionario = await db('funcionario');
        res.status(200).json(funcionario);
    } catch(err) {
        console.log(err);
    }
});

server.get('/funcionario/:id', async (req,res) => {
    // GET Funcionario by id
    const { id } = req.params;
    try {
        const currentFuncionario = await db('funcionario').where({ id });
        currentFuncionario.length === 0 ? res.status(404).json({ message: 'Funcionario not found'}) : res.status(200).json(currentFuncionario);
    } catch(err) {
        console.log(err)
    }
})

server.post('/funcionario', async (req,res) => {
    // POST a Funcionario
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'You must include a message in your request.' })
    }
    try {
        await db('funcionario').insert({ message });
        res.status(201).json({ message: 'Funcionario successfully stored!' });
    } catch(err) {
        console.log(err)
    }
});

server.put('/funcionario/:id', async (req,res) => {
    // UPDATE a Funcionario
    const { id } = req.params;
    const { message } = req.body;
    try {
        const currentFuncionario = await db('funcionario').where({ id }).update({ message });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});

server.delete('/funcionario/:id', async (req,res) => {
    // DELETE a Funcionario
    const { id } = req.params;
    try {
        await db('funcionario').where({ id }).del();
        res.status(200).json({ message: 'Delete successful!' });
    } catch (err) {
        console.log(err)
    }
});


//--------------------------------------------------------------------------------------------------------BACK-END CLIENTE------------------------------------------//

// server.get('/', (req,res) => {
//     res.send('Welcome to the Cliente app server!!!')
// });

server.get('/cliente', async (req,res) => {
    // GET all clientes
    try {
        const cliente = await db('cliente');
        res.status(200).json(cliente);
    } catch(err) {
        console.log(err);
    }
});

server.get('/cliente/:id', async (req,res) => {
    // GET Cliente by id
    const { id } = req.params;
    try {
        const currentCliente = await db('cliente').where({ id });
        currentCliente.length === 0 ? res.status(404).json({ message: 'cliente not found'}) : res.status(200).json(currentFuncionario);
    } catch(err) {
        console.log(err)
    }
})

server.post('/cliente', async (req,res) => {
    // POST a Cliente
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ message: 'You must include a message in your request.' })
    }
    try {
        await db('cliente').insert({ message });
        res.status(201).json({ message: 'Cliente successfully stored!' });
    } catch(err) {
        console.log(err)
    }
});

server.put('/cliente/:id', async (req,res) => {
    // UPDATE a Cliente
    const { id } = req.params;
    const { message } = req.body;
    try {
        const currentCliente = await db('cliente').where({ id }).update({ message });
        res.status(200).json({ message: 'Update successful!' });
    } catch (err) {
        console.log(err)
    }
});

server.delete('/cliente/:id', async (req,res) => {
    // DELETE a Cliente
    const { id } = req.params;
    try {
        await db('cliente').where({ id }).del();
        res.status(200).json({ message: 'Delete successful!' });
    } catch (err) {
        console.log(err)
    }
});



module.exports = server;