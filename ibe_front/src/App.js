import { BrowserRouter, Routes, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';
import MainPage from "./component/layout/pages/MainPage";
import ProductDetailPage from "./component/layout/pages/ProductDetailPage";
import SigninEmailSearchComponent from "./component/sign/SigninEmailSearchComponent"; 
import SignPasswordSeacchComponent from "./component/sign/SignPasswordSearchComponent";
import MypagePage from "./component/layout/pages/MypagePage";

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
        {/* <Routes>
          <Route  path="/products/detail/:id" element={<ProductDetailPage />} />
        </Routes> */}

        {/* 마이페이지 Router */}
        {/* <Routes>
          <Route path="/mypage" element={<MypagePage/>} />
        </Routes> */}
     </BrowserRouter>
    </>
  );
}

export default App;
