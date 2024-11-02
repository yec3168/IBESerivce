import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';

import MainPage from "./component/layout/pages/MainPage";
import ProductDetailPage from "./component/layout/pages/ProductDetailPage";
import SigninEmailSearchComponent from "./component/sign/SigninEmailSearchComponent"; 
import SignPasswordSeacchComponent from "./component/sign/SignPasswordSearchComponent";

import AdminPage from './component/adminpage/AdminPage';

import MypageMainPage from './component/layout/pages/mypage/MypageMainPage'
import ProductCreatePage from './component/layout/pages/ProductCreatePage';
import ProductListPage from './component/layout/pages/ProductListPage'

import MypagePurchaseListPage from './component/layout/pages/mypage/MypagePurchaseListPage';
import MypageSalesListPage from './component/layout/pages/mypage/MypageSalesListPage';
import MypagePointChargePage from './component/layout/pages/mypage/MypagePointChargePage';
import MypagePointPaybackPage from './component/layout/pages/mypage/MypagePointPaybackPage';
import MypageInquiryPage from './component/layout/pages/mypage/MypageInquiryPage';
import MypageInquiryListPage from './component/layout/pages/mypage/MypageInquiryListPage';


import MypagePointChargeCompletedComponent from './component/point/MypagePointChargeCompletedComponent';
import MypagePointChargeResult from './component/point/MypagePointChargeResultComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/signin" element={<SignInComponent/>} />
          <Route path="/signup" element={<SignupComponent/>} />
          <Route path="/searchEmail" element={<SigninEmailSearchComponent />}/>
          <Route path="/searchPassword" element={<SignPasswordSeacchComponent />}/>
        </Routes>
        {/* 상품 Router */}
        <Routes>
          <Route path="/products" element={<ProductListPage/>} />
          <Route path="/products/detail/:id" element={<ProductDetailPage />} />
          <Route path="/products/create" element={<ProductCreatePage />} />
        </Routes>
        {/* 관리자페이지 Router */}
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        {/* 마이페이지 Router */}
        <Routes>
          <Route path="/mypage" element={<MypageMainPage/>} />
          <Route path="/mypage/plist" element={<MypagePurchaseListPage/>} />
          <Route path="/mypage/slist" element={<MypageSalesListPage/>} />
          <Route path="/mypage/pntcharge" element={<MypagePointChargePage/>} />
          <Route path="/mypage/pntpayback" element={<MypagePointPaybackPage/>} />
          <Route path="/mypage/inquiry" element={<MypageInquiryPage/>} />
          <Route path="/mypage/inqList" element={<MypageInquiryListPage/>} />
        </Routes>
        {/* 포인트 처리 라우터 */}
        <Routes>
          <Route path="/mypage/pntcharge/completed" element={<MypagePointChargeCompletedComponent/>} />
          <Route path="/mypage/pntcharge/result" element={<MypagePointChargeResult/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
