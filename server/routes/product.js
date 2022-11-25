const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { appendFile } = require('fs');
const multer = require("multer");
//상품 등록을 위한 데이터를 가져오기 위해 (Model)
const { Product } = require("../models/Product");

//=================================
//             Product
//=================================
//2022.11.22 multer 추가(참고 링크 : https://www.npmjs.com/package/multer)
const storage = multer.diskStorage({
    //destination : 파일 저장 위치
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname = Buffer.from(file.originalname, 'latin1').toString(
            'utf8',
            ) + '_' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }).single("file")

//2022.11.22 : 파일업로드 기능 추가
router.post('/image',(req, res) => {
    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err})
        }

        return res.json({success : true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
});

//2022.11.22 : 상품 등록 API
router.post('/registration',(req, res) => {
    console.log(req)
    //전달받은 데이터 몽고 DB에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true})
    });
});
module.exports = router;
