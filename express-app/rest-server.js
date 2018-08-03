const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
const socketIO = require('socket.io')

const httpServer = http.createServer(app)
const io = socketIO(httpServer)

var allSockets = [];

io.on('connection', (socket) => {
    allSockets.push(socket)
    console.log("client connected");
    setTimeout(function() {
        socket.emit("data", "some data");
    }, 2000)
})

var customers = [];

function initData() {
    customers.push({id: 1, name: "Google", location: "Bangalore"})
    customers.push({id: 2, name: "MS", location: "Bangalore"})
    customers.push({id: 3, name: "Yahoo", location: "Bangalore"})
    customers.push({id: 4, name: "WF", location: "Bangalore"})
    customers.push({id: 5, name: "Walmart", location: "Bangalore"})
}

initData();

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.get('/customers', (req, res) => {
    res.json(customers)
});

app.get('/customers/:id', (req, res) => {
    var id = req.params.id;
    var filteredCustomers = customers.filter((item) =>  item.id == id)
    if(filteredCustomers[0]) {
        res.json(filteredCustomers[0])
    } else {
        res.status(404);
        res.json(null)
    }
})

app.post('/customers', (req, res) => {
    var customer = req.body;
    try{
        if(customer.id <=0) {
            resp.status(400)
            resp.json(null)
        } else {

            customers.push(customer)
            allSockets.forEach(socket => {
                socket.emit('addCustomer', customer)
            })
            res.status(201)
            res.setHeader("location", "customers/" + customer.id);
            res.json(null)
        }
    } catch(error) {
        res.status(503);
        res.json(null)
    }
})

app.get("/", (req, res) => {
    resp.status(200);
    resp.write("Node Express REST API's");
    resp.end();
})

// app.listen(9003, () => {
//     console.log("REST API server started")
// })

var port = process.env.PORT || 8090
httpServer.listen(port, () => {
    console.log("REST API server started")
})