const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user'); 

const app = express();
const PORT = process.env.PORT || 8000;
const CONNECTION = process.env.MONGO_DB_URI;

mongoose.connect(CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log(`Error connecting to the database:\n ${err}`)
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});