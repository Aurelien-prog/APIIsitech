const express = require("express");
const mysql = require("mysql")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));

//Connexion à la base de données
const connection = mysql.createConnection({
    host        :'localhost',
    user        :'root',
    password    :'',
    database    :'shippee'
});
connection.connect();

connection.query('SELECT * FROM users', function(err, rows, fields) {
    if (err) throw err;
    for (var i = 0; i < rows.length; i++) {
        result = rows;
    }
    console.log('Données: ', result);
});
connection.end();

function sendStartingMessage(port) {
  console.log('Server start on http://localhost:'+port)
}

/*let users = [];
let user1 = {
    id: 1,
    name: "Paul",
    surname: "M Hagot",
    type: 1,
}
let user2 = {
    id: 2,
    name: "Tristan",
    surname: "M Iervese",
    type: 1,
}
let user3 = {
    id: 3,
    name: "Aurelien",
    surname: "M Georges",
    type: 0,
}
users.push(user1, user2, user3);*/

//Afficher tous les utilisateurs - http://localhost:8085/api/users
app.get('/api/users', (req, res) => {
    res.send(result);
})
//Afficher un utilisateur avec son id - http://localhost:8085/api/users/1
app.get('/api/users/:id', (req, res) => {
    const id  = req.params.id
    const user = result[id-1]
    res.send(user);
});

//Initialise le middleware intégrer dans express
app.use(express.json())
//Ajouter un utilisateur
app.post('/api/users', (req, res) => {
    const body = req.body;
    rows.push(body);
    res.send(body);
});

//Modifier un utilisateur avec son Id
app.patch('/api/users/:id', (req, res)=>{
    const id = req.params.id
    let name = req.body.name;
    let surname = req.body.surname;
    let type = req.body.type;
    rows[id-1].name = name;
    res.send(rows[id-1]);
});


app.get('/', (req, res)=> {
    res.send("Bienvenue dans mon API !")
});
app.listen (8085, sendStartingMessage(8085));