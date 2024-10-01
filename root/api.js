//database
const { 
fs,
path,
texpro1,
express,
axios,
TelegraPh
} = require("../modulos.js")
 
const { newuser, newgold, saldo, menosgold, totalapis, totaluser, userExists, saveDatabase } = require('../database/database.js');
const user = userExists
var router = express.Router();
__path = process.cwd()



//mensaje predeterminado
const creador = "ANDRES-VPN"

var estado = {
    402: {
    creador: creador,
    error: "402",
    mensage: "digite el parametro [apikey]"
  },
    403: {
      creador: creador,
      error: "403",
      mensage: "usuario no existe",
      contacto: "wa.me/573043603261" ,
    },
    405: {
      creador: creador,
      error: "405",
      mensage: "limite superado",
      contacto: "wa.me/573043603261" ,
    },
    500: {
    creador: creador,
    error: "500",
    mensage: "error interno en el servidor",
    contacto: "wa.me/573043603261" ,
    }
}///respuestas


////guardar img con agente 

const imgtext = async (urlv2) => {
  var imagePath = '../temp/textpro.jpg';
  
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: urlv2,
      responseType: 'stream',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    })
    .then(response => {
      response.data.pipe(fs.createWriteStream(imagePath))
        .on('finish', () => {
          TelegraPh(imagePath)
            .then(reupload => {
              resolve(reupload);
            })
            .catch(err => {
              reject(err);
            });
        })
        .on('error', (err) => {
          console.error('Error al guardar la imagen:', err);
          reject(err);
        });
    })
    .catch(error => {
      console.error('Error al descargar la imagen:', error);
      reject(error);
    });
  });
};
///router 

router.get('/limite-apikey', async (req, res, next) => {
try{
  var apikey = req.query.apikey;
  if(!apikey) throw res.json(estado[402])
  if(user(apikey)){
    var apikey = apikey
    var limit = saldo(apikey)
    var total_search_apikey = totalapis(apikey)
    var total_search_users = totaluser()
    res.json({
      creador: creador,
      stado: true,
      result: {
        apikey: apikey,
        limite: limit,
        total_search_apikey,
        total_search_users
      }
    })
  } else {
    res.json(estado[403])
  }
  } catch (e) {
  res.json(estado[500]);
    console.log(e)
  }
})

router.get('/movies', async (req, res, next) => {
try {
  var apikey = req.query.apikey;
  if (!apikey) return res.json(estado[402])
  if (user(apikey)) {
    if(saldo(apikey) >= 1){
      menosgold(apikey, 1)

    var result = JSON.parse(fs.readFileSync("./json/movies.json"))
            res.json({
          creador: creador,
          estado: true,
          total_movies: result.length,
          result,
        })
      } else {
        res.json(estado[405])
      }
  } else {
  res.json(estado[403])
  }
        } catch (e) {
    res.json(estado[500]);
    console.log(e)
    }
})
 
 




////
module.exports = router
/////
const watchFileAndUpdate = (filename) => {
let file = require.resolve(filename);
fs.watchFile(file, () => {
fs.unwatchFile(file);
console.log(`Archivo atualizado: ${filename}`);
delete require.cache[file];
require(file)})};

watchFileAndUpdate(__filename);