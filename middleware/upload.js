const multer = require('multer');

const storage = multer.diskStorage({
    destination:'./Imagenes',
    filename:(req,file,cb)=>{
        cb(null,file.originalname)

    }
})
const upload = multer({storage:storage}).single('foto')

module.exports = upload
