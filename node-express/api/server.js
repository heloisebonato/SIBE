const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const db = require('./dbConfig');

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json());

//const testData = require('../testData');

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



module.exports = server;