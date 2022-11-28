import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";

//2022.11.21 이미지 업로드 라우터 추가
import UploadProdectPage from './views/UploadProductPage/UploadProductPage';
//2022.11.28 : 상품 상세페이지 라우터 추가
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
//2022.11.28 : 상품 상세페이지 라우터 추가
import CartPage from "./views/CartPage/CartPage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          {/* 2022.11.21 상품등록 라우터 추가 (true : 로그인 한 사람만 접근가능)*/}
          <Route exact path="/product/upload" component={Auth(UploadProdectPage, true)} />
          {/* 2022.11.28 상품상세페이지 추가 (null : 로그인 하지 않은 사람도 접근가능)*/}
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
          {/* 2022.11.28 장바구니페이지 추가 (null : 로그인 하지 않은 사람도 접근가능)*/}
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
