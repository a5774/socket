const fs = require('fs')
const Koa = require('koa')
// static resource 
const staticServer = require('koa-static')
const app = new Koa();
const Http = require('http')
// 原生接管
let server = Http.createServer(app.callback());
const Router = require('koa-router')
const {Server} = require('socket.io');
let io = new Server(server);
let router = new Router({prefix:"/chat"})


router.get('/',(ctx,next)=>{
    console.log( ctx.header.cookie);
    ctx.type = 'text/html'
    ctx.body = fs.createReadStream(__dirname+"/index.html")
    // set cookie 
    ctx.cookies.set('key','value',{
        maxAge:500*1000
    })
})


app.use(router.routes());
app.use(staticServer(__dirname,{extensions:['js']}))

io.addListener('connection',socket=>{
    console.log( "socket");
    // client close 
    socket.addListener('disconnect',()=>{
        console.log( "close_connection");    
    })
    // listen all cilent msg 
    socket.addListener('chatClient',(msg)=>{
        console.log( msg );
        // send all client 
        io.emit('chatServer',msg)
    })

})
server.listen(5050,()=>{
console.log("socket_io_port:5050");
})







