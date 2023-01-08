const auxiliar = require('./public/auxiliares.js');

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000
const path = require('path');
const app = express();
// Parâmetros de configuração do servidor
app.use(bodyParser.urlencoded({extended:true}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "public")));
app.set('Views', path.join(__dirname, '/Views'));

var firebase = require('firebase')
const firebaseConfig = {
  apiKey: "AIzaSyDSebnEHLnXZnrr74HHtVrtg0P5iVCfCv8",
  authDomain: "nocotech-room.firebaseapp.com",
  projectId: "nocotech-room",
  databaseURL: "https://nocotech-room-default-rtdb.firebaseio.com",
  storageBucket: "nocotech-room.appspot.com",
  messagingSenderId: "940043704831",
  appId: "1:940043704831:web:c2636fa80fd60bbd74efca",
  measurementId: "G-SZD9XWTG2N"
};
firebase.initializeApp(firebaseConfig)

// Crie uma rota para a raiz da aplicação
app.get('/', async (req, res) => {
  res.send("porra");
});
app.post('/', async(req, res) => {
  const nome = req.body.nome;
  let dados = await auxiliar.apiCnpj(nome);
  res.send('success' + dados[0] );
 
});

app.get('/firebase', async (req, res) => {

let patsh = req.query.to;
let dados = firebase.database().ref().child(patsh);    
dados.on('value', function(snaps) {
  let pica = {};
  snaps.forEach(function(child){  
    let DADO = child.key;    
    let VALOR = child.val();
    console.log(DADO);
    pica[DADO] = VALOR;
  });
  res.send(pica);
}); 
});
app.listen(3000, () => {
 
  console.log('Servidor iniciado na porta 3000');


});
