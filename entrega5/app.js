const express = require('express');
const router = require('./routes/index.routes')
const port = 8080 || process.env.PORT;
const app = express();
const { Server: SocketServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);
const handlebars = require('express-handlebars');
const ProductManager = require('./ProductManager');
const Manager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname+'/public'));
app.use(router);

const connectedServer = httpServer.listen(port, () => {
    console.log(`Listening server ${connectedServer.address().port}`);
});

io.on("connection", (connection) => {
    console.log()

    Manager.getProducts()
    .then((data) => {
      connection.emit('productos', data);
    });
  
    connection.on('nuevoProductos', (elemento) => {
      let data = JSON.parse(elemento)

      Manager.addProduct(data)
      .then(() => {
        Manager.getProducts()
        .then((data) => {
          connection.emit('productos', data);
        });
      })
      .catch((error) => {
        connection.send(`{error: ${error}}`);
      });
    });

    connection.on('eliminarProducto', (elemento) => {
      Manager.deleteProduct(elemento.id)
      .then(() => {
        Manager.getProducts()
        .then((data) => {
          connection.emit('productos', data);
        });
      })
      .catch((error) => {
        connection.send(`{error: ${error}}`);
      });
    });

});
