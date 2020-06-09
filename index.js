//debemos correr el servidor con npm run server
const express = require('express')
const url = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const util = require('util')
const fs = require('fs')
const uploads = require('./middleware/upload')
const multiuploads = require('./middleware/multiuploads')
//const multer = require('multer')
const bent =require('bent')
url.use(morgan('dev'))
url.use(bodyParser.json());
url.use(bodyParser.urlencoded({extended: true}));
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
// const storage = multer.diskStorage({
//     destination:'./Imagenes',
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname)

//     }
// })


// //sirve para subir las fotos a nuestro servidor
// url.use(multer({
//     storage:storage,
//     dest:'./Imagenes'

// }).single('foto'))

//consulta para el registro
url.post('/users',uploads ,(req, res)=>{
    const foto_array = req.file
    //console.log(foto_array)
    const nombre_foto = foto_array.filename
    const nombre = req.body.nombre
    const apellido = req.body.apellido
    const apellido_materno = req.body.apellido_materno
    const correo = req.body.correo
    const fecha = req.body.fecha
    const password = req.body.password
    var datos =[nombre,apellido,apellido_materno,correo,fecha,password]//foto es opcional
    var estado = 0//esta variable nos sirve para saber si no se relleno algun dato
    const foto = nombre_foto.substring(0, nombre_foto.indexOf("."))
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

                    const traer_id = `SELECT * FROM usuario WHERE Correo = '${correo}'`
                    pool.query(traer_id).then(idusuario=>{
                        
                        var id= idusuario[0].id_usuario//convertimos el id a string, debido a que Asynctorage solo permite string en esta version de expo
                        var calificacion_por_defecto = 0 //calificacion del usuario cuando se registra o es nuevo
                        const calificacion = `INSERT INTO calificacion(Calificacion, Usuario) VALUES('${calificacion_por_defecto}',${id})`
                        pool.query(calificacion).then(rows3=>{
                            const traer_calif= `SELECT * FROM calificacion WHERE Usuario='${idusuario[0].id_usuario}'`
                            pool.query(traer_calif).then(calf=>{//nos sirve para traer la calificacion del nuevo usuario
                                var calif = calf[0].Calificacion
                                res.status(200)
                                res.json({code:1,nombre:nombre,id:id.toString(10),Foto:idusuario[0].Foto,apellido_paterno:idusuario[0].Apellido_paterno,calificacion:calif.toString(10)})
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

                }).catch(err=>{
                    res.status(500)
                    res.json({code:5})
                })
            }
            else{
                res.json({code:3})//enviamos el codigo 3, significa "correo en uso"
            }
        }).catch(err=>{
            console.log(err)
            res.status(500)
            res.json({code:5})//eel codigo 5 significa error de servidor
        })
        
    }
    else{//si arrojo algo la variable estado, significa que un campo falto
        res.json({code:2})//enviamos este JSON, con el codigo 2, que significa que uno o varios campos no fueron rellenados
    }
})

url.post('/crear_archivo',uploads,(req,res)=>{
    var foto =""
    if(req.body.foto_status=="user.png"){//si el usuario decide no elegir foto en su perfil se le asignara una por default, llamada user
        foto = "user"
    }
    else{
        const nombre_foto = req.file.filename//traemos el nombre de la imagen
        
        foto = nombre_foto.substring(0, nombre_foto.indexOf("."))//quitamos la extension del nombre d la  imagen
    }
    const files = fs.readdirSync("./Imagenes").filter(x => !x.includes("js"));//esta constante leera todos las imagenes de nuestro directorio en cuestion excepto las que tengan extension .js
    const ex ="var obj ={Imagen:"+
    "{\n" +
    files.map(x => `"${x.split(".")[0]}": require("../Imagenes/${x}"),`).join("\n") +
    "}}\n export default obj"//la constante ex es la que le dara forma a nuestro archivo .js, consiste en crear un json, que contendra como dato la imagen, es decir la key sera el nombre de la imagen sin su extension y su valort sera un require()
    fs.writeFileSync("./Imagenes/imagenes.js", ex);//escribimos en el archivo el json
    //es decirt este fragmento de codigo nos sirve para mandar a lñlamar a las imagenes de forma dinamica ya que la etiqueta <Image/> solo aceptra estaticas

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

//esta consulta es para buscar las direcciones

url.post("/direcciones", async (req,res)=>{
    var query = req.body.direccion
    const getJSON = bent('json')
    let obj = await getJSON('https://api.tomtom.com/search/2/search/'+query+'.JSON?key=U364LixZN7Lwvf2rK7VHCtzRPMNatfgI&countrySet=MX&language=es-419&&maxFuzzyLevel=2')
    var cantidad = obj.summary.numResults
    //console.log(obj.results[0].position.lat)
    var direccion =[]
    for(var i=0;i<cantidad;i++){
        direccion.push({'address':obj.results[i].address.freeformAddress,'lat':obj.results[i].position.lat,'lon':obj.results[i].position.lon})

    }
    //console.log(direccion[0].address)
    console.log(direccion)
    res.send(direccion)
})
url.post('/verifica_direccion',async (req,res)=>{
    var query = req.body.calle +','+req.body.colonia +','+ req.body.estado+','+ req.body.numero
    const getJSON = bent('json')
    let obj =  await getJSON('https://api.tomtom.com/search/2/search/'+query+'.JSON?key=U364LixZN7Lwvf2rK7VHCtzRPMNatfgI&countrySet=MX&language=es-419&&maxFuzzyLevel=2&limit=1')
    var cantidad = obj.summary.numResults
    if(cantidad>0){
        res.json({code:1,resultado:cantidad,direccion:obj.results[0].address.freeformAddress,coordenadas:obj.results[0].position})
    }
    else{
        res.json({code:2, resultado:cantidad})
    }
    //console.log(obj.results[0].position)
    //console.log(obj.summary.numResults)
})
url.post('/inserta_publicacion',multiuploads,(req,res)=>{
    const descripcion = req.body.descripcion
    const costo = req.body.costo
    const propietario = req.body.propietario
    const direccion = req.body.direccion
    const coordenadas = req.body.coordenadas
    const foto = req.body.imgs
    const query = `INSERT INTO publicaciones(Fotos,Descripcion,Propietario, Localizacion,Costo,Status_publicacion,Direccion) VALUES('${foto}','${descripcion}','${propietario}','${coordenadas}','${costo}','Activa','${direccion}')`
    pool.query(query).then(rows=>{
        res.status(200)
        res.json({code:1})
    }).catch(err=>{
        res.status(500)
        res.json({code:0})
    })
    // multiuploads(req,res,function(err){
    //     if(!err){
    //         const descripcion = req.body.descripcion
    //         const costo = req.body.costo
    //         const propietario = req.body.propietario
    //         const direccion = req.body.direccion
    //         const coordenadas = req.body.coordenadas
    //         const foto = req.body.imgs
    //         const query = `INSERT INTO publicaciones(Fotos,Descripcion,Propietario, Localizacion,Costo,Status_publicacion,Direccion) VALUES('${foto}','${descripcion}','${propietario}','${coordenadas}','${costo}','Activa','${direccion}')`
    //         pool.query(query).then(rows=>{
    //             res.status(200)
    //             res.json({code:1})
    //         }).catch(err=>{
    //             res.status(500)
    //             res.json({code:0})
    //         })
    //     }
    // })

})
url.post('/crear_archivo_fotos',multiuploads,(req,res)=>{
    var cantidad = req.files
    for(var i=0;i<cantidad.length;i++){
        var nombre_foto = req.files[0].filename
    
        foto = nombre_foto.substring(0, nombre_foto.indexOf("."))
        
        var files = fs.readdirSync("./Imagenes").filter(x => !x.includes("js"));
        var ex ="var obj ={Imagen:"+
        "{\n" +
        files.map(x => `"${x.split(".")[0]}": require("../Imagenes/${x}"),`).join("\n") +
        "}}\n export default obj"
        fs.writeFileSync("./Imagenes/imagenes.js", ex);
    }
    

})
url.get('/markers',(req,res)=>{
    const query = `SELECT * FROM publicaciones`
    pool.query(query).then(data=>{
        var ubicacaciones =[]
        var direcciones=[]
        for(var i=0;i<data.length;i++){
            ubicacaciones.push(JSON.parse(data[i].Localizacion))
            direcciones.push(data[i].Direccion)
        }
        //console.log(ubicacaciones)
        var direccion = data[0].Direccion
        var localizacion = data[0].Localizacion
        res.status(200)
        res.json({code:1,direccion:direccion,localizacion:localizacion,ubicacion:ubicacaciones})

    }).catch(err=>{
        res.status(500)
        res.json({code:0})
        console.log(err)
    })
})

url.listen(3000,()=>{
    console.log("Corriendo.....")
})
