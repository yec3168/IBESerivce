import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';
import MainPage from "./component/layout/pages/MainPage";
import ProductDetailPage from "./component/layout/pages/ProductDetailPage";

import SigninEmailSearchComponent from "./component/sign/SigninEmailSearchComponent"; 

import AdminPage from './component/adminpage/AdminPage';
import AdminSalesRequest from './component/adminpage/AdminSalesRequest'
import AdminDeletedPost from './component/adminpage/AdminDeletedPost';
import AdminMemberList from './component/adminpage/AdminMemberList';
import AdminManagerList from './component/adminpage/AdminManagerList';
import AdminInquiryOrder from './component/adminpage/AdminInquiryOrder';
import AdminInquiryList from './component/adminpage/AdminInquiryList';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/signin" element={<SignInComponent/>} />
          <Route path="/signup" element={<SignupComponent/>} />
          <Route path="/searchEmail" element={<SigninEmailSearchComponent />}/>
        </Routes>
        {/* 상품 Router */}
        <Routes>
          <Route  path="/products/detail/:id" element={<ProductDetailPage />} />
        </Routes>
        {/* 관리자페이지 Router */}
        <Routes>
        <Route path="/admin" element={<AdminPage />}/>
          <Route path="/admin/board/salesrequest" element={<AdminSalesRequest />}/>
          <Route path="/admin/board/deletedpost" element={<AdminDeletedPost />}/>
          <Route path="/admin/member/memberlist" element={<AdminMemberList />}/>
          <Route path="/admin/member/managerlist" element={<AdminManagerList />}/>
          <Route path="/admin/inquiry/inquiryorder" element={<AdminInquiryOrder />}/>
          <Route path="/admin/inquiry/inquirylist" element={<AdminInquiryList />}/>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
