import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';

import MainPage from './component/layout/pages/MainPage';
import SigninEmailSearchComponent from './component/sign/SigninEmailSearchComponent';
import SignPasswordSeacchComponent from './component/sign/SignPasswordSearchComponent';

import AdminPage from './component/adminpage/AdminPage';

import MypageMainPage from './component/layout/pages/mypage/MypageMainPage';
import ProductCreatePage from './component/layout/pages/product/ProductCreatePage';
import ProductListPage from './component/layout/pages/product/ProductListPage';
import ProductDetailPage from './component/layout/pages/product/ProductDetailPage';

import MypagePurchaseListPage from './component/layout/pages/mypage/MypagePurchaseListPage';
import MypageSalesListPage from './component/layout/pages/mypage/MypageSalesListPage';
import MypagePointChargePage from './component/layout/pages/mypage/MypagePointChargePage';
import MypagePointPaybackPage from './component/layout/pages/mypage/MypagePointPaybackPage';
import MypageInquiryPage from './component/layout/pages/mypage/MypageInquiryPage';
import MypageInquiryListPage from './component/layout/pages/mypage/MypageInquiryListPage';

import MypagePointChargeCompletedComponent from './component/point/MypagePointChargeCompletedComponent';
import MypagePointChargeResult from './component/point/MypagePointChargeResultComponent';
import MypageInquiryAnsPage from './component/layout/pages/mypage/MypageInquiryAnsPage';
import OrderDetailPage from './component/layout/pages/order/OrderDetailPage';
import MypageMemberInfoChangePage from './component/layout/pages/mypage/MypageMemberInfoChangePage';
import MypagePwChangePage from './component/layout/pages/mypage/MypagePwChangePage';

import IbeBoardListPage from './component/layout/pages/IbeBoard/IbeBoardListPage';
import IbeBoardWritePage from './component/layout/pages/IbeBoard/IbeBoardWritePage';

import MypageDeleteAccountPage from './component/layout/pages/mypage/MypageDeleteAccountPage';
import NotFound from './component/NotFound/NotFound';
import KakaoOauthCallback from './component/sign/KakaoOauthCallback';
import MypagePointPaybackResultPage from './component/layout/pages/mypage/MypagePointPaybackResultPage';
import AdminPrivateRoute from './component/adminpage/AdminPrivateRoute';
import IbeBoardDetailsPage from './component/layout/pages/IbeBoard/IbeBoardDetailsPage';
import TermsAgreementComponent from './component/sign/TermsAgreementComponent';
import MypagePointPayBackComfrimComponent from './component/point/MypagePointPayBackComfirmComponent';
import PrivateRouter from './component/router/PrivateRouter.js';
import InputWaybillPage from './component/layout/pages/mypage/InputWaybillPage.js';
import IbeBoardUpdatePage from './component/layout/pages/IbeBoard/ibeBoardUpdatePage.js';


// 권한 감지하는 컴포넌트 PrivateRouter(ROLE, component)  권한 없을 시 <SignInComponent /> 로 보냄
//<PrivateRouter Role="USER" component={<PrivateRouterTest/>}/>
// Role =  ADMIN ,USER 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 로그인, 회원가입 */}
        <Route path="/" element={<MainPage />} />
        <Route path="/signin" element={<SignInComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/searchEmail" element={<SigninEmailSearchComponent />} />
        <Route path="/searchPassword" element={<SignPasswordSeacchComponent />}/>
        <Route path="/api/members/kakao/oauth" element={<KakaoOauthCallback />}/>
        <Route path="/terms" element={<TermsAgreementComponent />} />

        {/* 물품 관련 */}
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/detail/:id" element={<ProductDetailPage />} />
        <Route path="/products/create" element={<PrivateRouter Role="USER" component={<ProductCreatePage />}/>} />

        {/* 주문 관련 */}
        <Route path="/orders/order/:id" element={<OrderDetailPage />} />

        {/* 관리자페이지 Router */}
        <Route
          path="/admin"
          element={<AdminPrivateRoute element={<PrivateRouter Role="ADMIN" component={<AdminPage />}/>} />}
        />

        {/* 마이페이지 Router */}
        <Route path="/mypage" element={<PrivateRouter Role="USER" component={<MypageMainPage />}/>} />
        <Route path="/mypage/plist" element={<PrivateRouter Role="USER" component={<MypagePurchaseListPage />}/>} />
        <Route path="/mypage/slist" element={<PrivateRouter Role="USER" component={<MypageSalesListPage />}/>} />
        <Route path="/mypage/pntcharge" element={<PrivateRouter Role="USER" component={<MypagePointChargePage />}/>} />
        <Route path="/mypage/pntpayback" element={<PrivateRouter Role="USER" component={<MypagePointPaybackPage />}/>} />
        <Route path="/mypage/inquiry" element={<PrivateRouter Role="USER" component={<MypageInquiryPage />}/>} />
        <Route path="/mypage/inqlist" element={<PrivateRouter Role="USER" component={<MypageInquiryListPage />}/>} />
        <Route path="/mypage/inquiry/answer/:id" element={<PrivateRouter Role="USER" component={<MypageInquiryAnsPage />}/>}/>
        <Route path="/mypage/info" element={<PrivateRouter Role="USER" component={<MypageMemberInfoChangePage />}/>} />
        <Route path="/mypage/pw" element={<PrivateRouter Role="USER" component={<MypagePwChangePage />}/>} />
        <Route path="/mypage/delete" element={<PrivateRouter Role="USER" component={<MypageDeleteAccountPage />}/>} />
        <Route path="/waybill/:orderId" element={<PrivateRouter Role="USER" component={<InputWaybillPage />}/>} />

        {/* 포인트 처리 라우터 */}
        <Route path="/mypage/pntcharge/completed" element={<PrivateRouter Role="USER" component={<MypagePointChargeCompletedComponent />}/>} />
        <Route path="/mypage/pntcharge/result" element={<PrivateRouter Role="USER" component={<MypagePointChargeResult />}/>} />
        <Route path="/mypage/pntPayBack/confirm" element={<PrivateRouter Role="USER" component={<MypagePointPayBackComfrimComponent/>}/>}/>
        <Route path="/mypage/pntPayBack/result" element={<PrivateRouter Role="USER" component={<MypagePointPaybackResultPage/>}/>}/>

        {/* 아이비 게시판 */}
        <Route path="/boards" element={<IbeBoardListPage />} />
        <Route path="/boards/write" element={<PrivateRouter Role="USER" component={<IbeBoardWritePage />}/>} />
        <Route path="/boards/details/:boardId" element={<IbeBoardDetailsPage />} />
        <Route path="/boards/details/update/:boardId" element={<PrivateRouter Role="USER" component={<IbeBoardUpdatePage/>}/>} />
        {/* 404 에러페이지 - 위치 바꾸지 말것, 항상 마지막 Route여야 함. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
