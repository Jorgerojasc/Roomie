const multer = require('multer');

const storage = multer.diskStorage({
    destination:'./Imagenes',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})
const multiuploads = multer({storage:storage}).array('fotos',5)

module.exports =  multiuploads