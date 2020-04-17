//debemos correr el servidor con npm run server
const express = require('express')
const url = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const util = require('util')
const fs = require('fs')
const multer = require('multer')

url.use(morgan('dev'))
url.use(bodyParser.json());
url.use(bodyParser.urlencoded({ extended: true }));

//conexion  a la base de datos
const pool = mysql.createPool({
    connectionLimit:5,
    host: 'localhost',
    user:'root',
    password:'',
    database:'roomie'

})
pool.query = util.promisify(pool.query)


//storage sirve para guarde la imagen con su extension y nombre original
const storage = multer.diskStorage({
    destination:'./Imagenes',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})


//sirve para subir las fotos a nuestro servidor
url.use(multer({
    storage:storage,
    dest:'./Imagenes'

}).single('foto'))

//consulta para el registro
url.post('/users',(req, res)=>{
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const apellido_materno = req.body.apellido_materno
    const correo = req.body.correo
    const fecha = req.body.fecha
    const password = req.body.password
    var foto =""
    if(req.body.foto_status=="user.png"){//si el usuario decide no elegir foto en su perfil se le asignara una por default, llamada user
        foto = "user"
    }
    else{
        const nombre_foto = req.file.filename//traemos el nombre de la imagen
        foto = nombre_foto.substring(0, nombre_foto.indexOf("."))//quitamos la extension del nombre d la  imagen
    }
    var datos =[nombre,apellido,apellido_materno,correo,fecha,password]//foto es opcional
    var estado = 0//esta variable nos sirve para saber si no se relleno algun dato
    for(var i=0;i<datos.length;i++){//verificara que no este un campo nulo
        if(datos[i]==''){
            estado +=1
        }
    }
    if(estado ==0){//si no arrojo nada significa que estanb todos llenos los campos
        const revisa_correo = `SELECT * FROM usuario WHERE Correo = '${correo}' `
        pool.query(revisa_correo).then(rows=>{//esta verifica que el correo introducido no este en uso
            if(rows.length==0){//si arroja mas de una fila significa que ya esta en uso
                

                const query = `INSERT INTO usuario(Nombre, Apellido_paterno,Apellido_materno, Correo, Foto,Fecha_nacimiento,Password) VALUES('${nombre}','${apellido}','${apellido_materno}','${correo}','${foto}','${fecha}','${password}')`
                pool.query(query).then(rows2=>{

                    const files = fs.readdirSync("./Imagenes").filter(x => !x.includes("js"));//esta constante leera todos las imagenes de nuestro directorio en cuestion excepto las que tengan extension .js
                    const ex ="var obj ={Imagen:"+
                    "{\n" +
                    files.map(x => `"${x.split(".")[0]}": require("../Imagenes/${x}"),`).join("\n") +
                    "}}\n export default obj"//la constante ex es la que le dara forma a nuestro archivo .js, consiste en crear un json, que contendra como dato la imagen, es decir la key sera el nombre de la imagen sin su extension y su valort sera un require()
                    fs.writeFileSync("./Imagenes/imagenes.js", ex);//escribimos en el archivo el json
                    //es decirt este fragmento de codigo nos sirve para mandar a lñlamar a las imagenes de forma dinamica ya que la etiqueta <Image/> solo aceptra estaticas

                    const traer_id = `SELECT * FROM usuario WHERE Correo = '${correo}'`
                    pool.query(traer_id).then(idusuario=>{
                        
                        var id= idusuario[0].id_usuario//convertimos el id a string, debido a que Asynctorage solo permite string en esta version de expo
                        var calificacion_por_defecto = 0
                        const calificacion = `INSERT INTO calificacion(Calificacion, Usuario) VALUES('${calificacion_por_defecto}',${id})`
                        pool.query(calificacion).then(rows3=>{
                            res.status(200)
                            res.json({code:1,nombre:nombre,id:id.toString(10),Foto:idusuario[0].Foto,apellido_paterno:idusuario[0].Apellido_paterno})
                            
                        }).catch(err=>{
                            res.status(500)
                            res.json({code:5})
                        })
                    }).catch(err=>{
                        res.status(500)
                        res.json({code:5})
                    })

                }).catch(err=>{
                    res.status(500)
                    res.json({code:5})
                })
            }
            else{
                res.json({code:3})//enviamos el codigo 3, significa "correo en uso"
            }
        }).catch(err=>{
            res.status(500)
            res.json({code:5})//eel codigo 5 significa error de servidor
        })
        
    }
    else{//si arrojo algo la variable estado, significa que un campo falto
        res.json({code:2})//enviamos este JSON, con el codigo 2, que significa que uno o varios campos no fueron rellenados
    }
})

//consulta para inicio de sesion
url.post('/login',(req, res)=>{
    const correo = req.body.correo
    const password = req.body.password
    if(correo!='' && password!=''){
        const query = `SELECT * FROM usuario WHERE Correo='${correo}' AND Password='${password}'`

        // const files = fs.readdirSync("./Imagenes").filter(x => !x.includes("js"));
        // const ex ="var obj ={Imagen:"+
        // "{\n" +
        // files.map(x => `"${x.split(".")[0]}": require("../Imagenes/${x}"),`).join("\n") +
        // "}}\n export default obj"
        // fs.writeFileSync("./Imagenes/imagenes.js", ex);
        pool.query(query).then(rows=>{
            
            if(rows.length>0){

                var id = rows[0].id_usuario
                const calificacion = `SELECT * FROM calificacion WHERE Usuario='${id}'`
                pool.query(calificacion).then(calification=>{
                    var calificacion_user = calification[0].Calificacion
                    res.status(200)
                    res.json({code:1,nombre:rows[0].Nombre,id:id.toString(10),foto:rows[0].Foto,calificacion:calificacion_user.toString(10),apellido_paterno:rows[0].Apellido_paterno})

                }).catch(err=>{
                    res.status(500)
                    res.json({code:5})
                })
                
            }
            else{
                res.status(200)
                res.json({code:4})//el codigo 4 significa correo o contraseña equivocados
            }
        }).catch(err=>{
            res.status(500)
            //console.log(err)
            res.json({code:5})
        })
    }
    else{
        res.json({code:2})//datos vacios
    }
})

//convertir el id de string a numero


url.listen(3000,()=>{
    console.log("Corriendo.....")
})
