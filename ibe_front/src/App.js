import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';
<<<<<<< HEAD
import MainPage from './component/layout/pages/MainPage';
import AdminPage from './component/adminpage/AdminPage';
=======
import MainPage from "./component/layout/pages/MainPage";
import ProductDetailPage from "./component/layout/pages/ProductDetailPage";

>>>>>>> 578c18c99050ca28d2c32bb4f165fb4d9e3bf221

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
<<<<<<< HEAD
      </BrowserRouter>
=======

        {/* 상품 Router */}
        <Routes>
          <Route  path="/products/detail/:id" element={<ProductDetailPage />} />
        </Routes>
     </BrowserRouter>
>>>>>>> 578c18c99050ca28d2c32bb4f165fb4d9e3bf221
    </>
  );
}

export default App;
