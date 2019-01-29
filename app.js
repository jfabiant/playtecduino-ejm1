const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser');
const session = require('express-session')

/* setup session express */
app.use(cookieParser());
app.use(session({
    secret: 'welcomeToArea51', //short string secret
    resave: false,
    saveUninitialized: true
}));

/* view engine setup */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

/* routes */
const routes = require('./routes/routes')
app.use('/', routes)

const server = app.listen(3000, function(){
    console.log('http://localhost:3000')
})

var myArray = new Array();

app.get('/api-bloques/', function(req, res){
    var jsonArray = JSON.parse(JSON.stringify(myArray))
    res.json(jsonArray)
})

/* sockets */
const io = require('socket.io')(server);

io.on('connection', function(socket){
    
    //Mandando mensaje (event)
    socket.on('new_message', function(data){
        //console.log(data.message);
        //console.log("***************************************");
        myArray.push(data.message);
        socket.broadcast.emit('new_message', {message : data.message});
    });

    //Mandando mensaje (true or false)
    socket.on('permiso', function(data){
        //console.log(data.message)
        socket.broadcast.emit('permiso', {message: data.message});

    });
    
});

module.exports = app