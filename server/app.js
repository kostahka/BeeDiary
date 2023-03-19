require('dotenv').config()

const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const cors = require('cors')

const apiaryRouter = require('./routes/apiary');
const hiveRouter = require('./routes/hive');
const usersRouter = require('./routes/users');

const authMiddleware = require('./middlewares/auth-middleware')
const errorMiddleware = require('./middlewares/error-middleware')

const app = express();
const port = normalizePort(process.env.PORT || '5000');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api/apiary', authMiddleware, apiaryRouter);
app.use('/api/hive', authMiddleware, hiveRouter);
app.use('/api/users', usersRouter);

app.use(errorMiddleware)

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(port, onListening)
    }catch (e){
        console.log(e)
    }
}

start()

function onListening() {
    console.log('Listening on ' + port);
}

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}