//2022.11.22 : 상품 등록 mongodb 스키마
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    writer: { //등록자
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: { //상품명
        type: String,
        maxLength: 50
    },
    description: { //상품설명
        type: String
    },
    price: { //상품가격
        type: Number,
        default: 0
    },
    images: { //상품이미지
        type: Array,
        default: []
    },
    sold: { //상품 갯수
        type: Number,
        maxLength: 100,
        default: 0
    },
    classification1: { //상품 1차 분류
        type: Number,
        default: 0
    },
    classification2: { //상품 2차 분류
        type: Number,
        default: 0
    }


})


const Product = mongoose.model('Product', productSchema);

module.exports = { Product }