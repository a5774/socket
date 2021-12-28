const Koa = require('koa')
const app = new Koa();
const useRouter = require('../router/index')
const staticDeploy = require('koa-static')
const Http = require('http')
// origin take over
const  server = Http.createServer(app.callback());
const {Server} = require('socket.io');
let io = new Server(server);

// static resource deploy,  where main.js path is Server root ,load static file to root 
app.use(staticDeploy('./libs',{extensions:['js']}));
// app.use(staticDeploy('./static',{extensions:['html']}))

// cors 
app.use(async (ctx,next)=>{
    await next()
})

// load router 
Reflect.set(app,"useRouter",useRouter)
app.useRouter();

// error handler
// app.addListener('error',``)

io.addListener('connection',socket=>{
    console.log( "socket_connection");

    // client close 
    socket.addListener('disconnect',()=>{
        console.log( "close_connection");
        io.emit('count',io.engine.clientsCount)
    })

    // listen all cilent msg 
    socket.addListener('chatClient',(msg)=>{
        console.log( msg );
        // send all client Except itself
         socket.broadcast.emit('chatServer',msg)
        // send all client 
        /* io.emit('chatServer',{
            msg:msg
        }) */
    })
    io.emit('count',io.engine.clientsCount)
})
module.exports = {
    app,
    io,
    server
}
