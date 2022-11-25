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
    //전달받은 데이터 몽고 DB에 저장
    const product = new Product(req.body);
    product.save((err) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true})
    });
});

//2022.11.25 : 등록된 상품 조회 API
router.post('/products', (req, res) => {
    /*  2022.11.25
        1. string으로 받았을 경우 형변환 
        2. limit의 값이 없을 경우 8이 default
    */
    let limit = req.body.limit ? parseInt(req.body.limit) : 8; 
    /*  2022.11.25
        1. string으로 받았을 경우 형변환 
        2. skip의 값이 없을 경우 0이 default
    */
    let skip = req.body.skip ? parseInt(req.body.skip) : 0; 
    //product 콜렉션에 있는 모든정보 select
    Product.find()
    .populate("write") //ID를 이용해서 유저의 모든정보를 가져오기 위해
    .limit(limit) //2022.11.25 LIMIT : 데이터를 몇개씩 가져올건지 지정하기 위해
    .skip(skip) //2022.11.25 SKIP : 어디서부터 데이터를 가져올지 위치 지정(페이징 ?)
    .exec((err, productInfo) => {
        if(err) return res.status(400).json({ success: false, err})
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
    })
})
module.exports = router;
