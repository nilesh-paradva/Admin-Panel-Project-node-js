const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        if(file.fieldname === "profileImg"){
            cb(null, 'uploads/profileImage');
        }else{
            cb(null, 'uploads/productImage');
        }
    },
    filename: function (req, file, cb){
        const filename = Date.now() + Math.round(Math.random() * 1E9) + "_" + file.originalname;
        cb(null, filename);
    }
})

const upload = multer({storage})

module.exports = upload;