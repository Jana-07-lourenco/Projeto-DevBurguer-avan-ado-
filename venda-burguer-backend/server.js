const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Banco de dados simulado em memória
const usuariosCadastrados = [];

// ROTA: Cadastro de Usuário
app.post('/api/cadastro', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    const usuarioExiste = usuariosCadastrados.find(user => user.email === email);
    if (usuarioExiste) {
        return res.status(400).json({ erro: "Este email já está cadastrado." });
    }

    const novoUsuario = { nome, email, senha };
    usuariosCadastrados.push(novoUsuario);

    console.log("Usuário cadastrado com sucesso:", novoUsuario);
    return res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
});

// ROTA: Autenticação (Login)
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;

    const usuario = usuariosCadastrados.find(user => user.email === email && user.senha === senha);

    if (!usuario) {
        return res.status(401).json({ erro: "Email ou senha incorretos." });
    }

    return res.status(200).json({ 
        mensagem: "Login autorizado!",
        usuario: { nome: usuario.nome, email: usuario.email }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend rodando em http://localhost:${PORT}`);
});
