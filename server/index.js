import express from 'express';
import cors from 'cors';
import {readdirSync} from "fs";
import mongoose from 'mongoose';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import { WebSocketServer } from "ws";

const morgan = require("morgan");

require("dotenv").config();



const csrfProtection = csrf({cookie: true});



// create express app

const app = express();

// apply middlewares
app.use(cors())
app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(morgan("dev"));
app.use((req, res, next) => {
    // console.log("this is my own middleware");
    next();
});



// db connection 
mongoose.connect(process.env.DATABASE).then( () => console.log('**DB CONNECTED**'))
.catch( (err) => console.log('DB CONNECTION ERR => ', err) );



// route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));


app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

// port
const port = process.env.PORT || 8000;

const wsServer = new WebSocketServer({ noServer: true });





const sockets = [];

wsServer.on("connection", (socket) => {
    sockets.push(socket);
    // setTimeout(async () => {
    //   news = await mongoClient.db("test")
    //   .collection("news")
    //   .find({})
    //   .sort({
    //     metacritic: -1,
    //   })
    //   .map(({  title, slug, text, category, author, date }) => ({
    //     title,
    //     slug,
    //     text,
    //     category,
    //     author,
    //     date,
    //   }))
    //   .limit(100)
    //   .toArray();
    //   socket.send(JSON.stringify(news));
    // }, 1000, socket, news);
    socket.on("message", (data) => {
  
    //   setTimeout(async () => {
    //     news = await mongoClient.db("test")
    //     .collection("news")
    //     .find({})
    //     .sort({
    //       metacritic: -1,
    //     })
    //     .map(({  title, slug, text, category, author, date }) => ({
    //       title,
    //       slug,
    //       text,
    //       category,
    //       author,
    //       date,
    //     }))
    //     .limit(100)
    //     .toArray();
    //     for (const recipient of sockets) {
    //       recipient.send(JSON.stringify([...news]));
    //     }
    //   }, 1000, socket, news);
    recipient.send(JSON.stringify(["alitestsocket", true]));
    });
  });

const server = app.listen(port, () => {
    console.log(`Server is runinng on port ${port}`);

    server.on("upgrade", (req, socket, head) => {
        wsServer.handleUpgrade(req, socket, head, (socket) => {
            wsServer.emit("connection", socket, req);
        });
    });
});




  