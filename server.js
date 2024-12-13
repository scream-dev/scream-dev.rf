const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let users = []; // Для хранения пользователей

// Эндпоинт для регистрации
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Пользователь уже существует!' });
  }
  
  if (password.length < 5) {
    return res.status(400).json({ message: 'Пароль должен содержать не менее 5 символов.' });
  }

  users.push({ username, password });
  res.status(201).json({ message: 'Пользователь зарегистрирован!' });
});

// Эндпоинт для проверки логина
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(user => user.username === username);
  
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Неверный логин или пароль.' });
  }

  res.status(200).json({ message: 'Логин успешен!' });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
