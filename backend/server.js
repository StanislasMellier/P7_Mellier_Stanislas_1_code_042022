const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();

const UsersRoute = require('./routes/UsersRoute');

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
app.use(cors());
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', UsersRoute);
