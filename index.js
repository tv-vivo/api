///npm i module --no-bin-links

const {
express, 
cors,
path,
fs } = require("./modulos.js")
const { 
 newuser,
 listarUsuarios,
 newgold,
 saldo,
 menosgold,
 loadDatabase,
 userExists,
 saveDatabase } = require('./database/database.js');




const PORT = process.env.PORT || 8080
//requerido
const app = express();
app.use(express.json());
app.enable('trust proxy');
app.set("json spaces", 2)
app.use(cors())
app.use(express.static("public"))
////

//rutas
var api = require('./root/api')
app.use('/api', api)
//


app.post('/panelconfig/newuser', (req, res) => {
  const { username } = req.body;
  const result = newuser(username);
  res.send(result);
});

app.post('/panelconfig/newgold', (req, res) => {
  const { username, amount } = req.body;
  const result = newgold(username, amount);
  res.send(result);
});

app.post('/panelconfig/menosgold', (req, res) => {
  const { username, amount } = req.body;
  const result = menosgold(username, amount);
  res.send(result);
});

app.post('/panelconfig/saldo', (req, res) => {
  const { username } = req.body;
  const result = saldo(username);
  res.send(result);
});

// Nuevo endpoint para listar todos los usuarios
app.get('/panelconfig/listarUsuarios', (req, res) => {
  const result = listarUsuarios();
  res.json(result);
});
const key = ["1088829889"]
app.get('/panel', (req, res) => {
     var apikey = req.query.apikey
     if(!apikey) throw res.json({error: "ingresa la clave de acceso"})
     if(key.includes(apikey)) {
     const filePath = path.join(__dirname, './panel.html');
     res.sendFile(filePath);
} else {
     res.json({error: "clave de acceso incorrecta"})
   }
 })
 
 app.get('/movie', (req, res) => {
     var apikey = req.query.apikey
     if(!apikey) throw res.json({error: "ingresa la clave de acceso"})
     if(key.includes(apikey)) {
     const filePath = path.join(__dirname, './movies.html');
     res.sendFile(filePath);
} else {
     res.json({error: "clave de acceso incorrecta"})
   }
 })

app.post('/publish', (req, res) => {
    const newMovie = req.body;

    // Leer el archivo JSON existente
    fs.readFile('./json/movies.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Error al leer el archivo.' });
        }

        let movies = [];
        if (data) {
            movies = JSON.parse(data);
        }

        // Verificar si la película ya existe
        const movieExists = movies.some(movie => movie.imb === newMovie.imb);
        if (movieExists) {
            return res.status(400).json({ success: false, message: 'Esta película ya existe.' });
        }

        // Agregar la nueva película y guardar el archivo
        movies.push(newMovie);
        fs.writeFile('./json/movies.json', JSON.stringify(movies, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error al guardar la película.' });
            }
            res.json({ success: true });
        });
    });
});


app.listen(PORT, () => {
     const { GREEN, BLUE, RED, WHITE } = require('./lib/color.js');
     console.log(`${BLUE}SERVIDOR FUNCIONANDO EN PUERTO:` + PORT + `\n ${WHITE}`)
});


const watchFileAndUpdate = (filename) => {
      let file = require.resolve(filename);
         fs.watchFile(file, () => {
           fs.unwatchFile(file);
             console.log(`Archivo atualizado: ${filename}`);
                delete require.cache[file];
require(file)})};

watchFileAndUpdate(__filename);