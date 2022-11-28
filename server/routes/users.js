const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        //2022.11.28 : 카트 데이터 추가
        cart: req.user.cart,
        //history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);
    console.log(req)
    console.log(res)
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});
 
//2022.11.28 : 장바구니 담기 API 생성
router.post("/addToCart", auth, (req, res) => {
    //User 정보 가져오는 부분
    /*
        1. 어러명이 아니라 한명이기 때문에 findOne 사용
        2. req.user._id가 가능한 이유 : auth 미들웨어를 사용하기 대문에 (쿠키에 있는 토큰을 가지고 정보를 조회함)
    */
    User.findOne({ _id : req.user._id },
        (err, userInfo) => {
            let duplicate = false
            userInfo.cart.forEach((item) => {
                if(item.id === req.body.productId) {//해당 상품이 이미 장바구니에 있을 경우
                    duplicate = true;
                }
            })

            if(duplicate) { //장바구니에 해당 상품이 있을 경우 => 상품 갯수 ++
                User.findOneAndUpdate( //하나의 상품을 조회 후 update
                    {_id : req.user._id , "cart.id" : req.body.productId},
                    { $inc : {"cart.$.quantity" : 1}}, // 갯수 더하기
                    {new : true}, //업데이트 후 userInfo 정보를 받기 위해
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success : false, err})
                        return res.status(200).send(userInfo.cart)
                    }
                ) 
            }else{ //장바구니에 해당 상품이 있을 경우 => 상품 정보 추가 
                User.findOneAndUpdate(
                    {_id : req.user._id},
                    {
                        $push: { //array에 추가하기 위해
                            cart : {
                                id : req.body.productId,
                                quantity : 1,
                                date : Date.now()
                            }
                        }
                    },
                    {new : true},
                    (err, userInfo) => {
                        if(err) return res.status(400).json({success : false, err})
                        return res.status(200).send(userInfo.cart)
                    }
                )
            }
        }
    )
});
module.exports = router;
