const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rt_digital'
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/warga', require('./routes/warga'));
app.use('/api/admin', require('./routes/admin'));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
