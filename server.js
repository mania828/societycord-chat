const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("msg", (msg) => {
        io.emit("msg", msg);
    });

    socket.on("disconnect", () => {
        console.log("user left");
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("running"));