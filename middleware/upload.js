//npm i multer --save
const multer = require('multer');

const storage = multer.diskStorage({ //cb is callback
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})

const fileFilter = (req,file,cb)=>{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg')
    {
        cb(null,true)
    }
    else
    {
        cb(null,false)
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFilter
});



//images only
module.exports = upload;