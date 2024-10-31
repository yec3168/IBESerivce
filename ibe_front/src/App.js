import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';
import MainPage from "./component/layout/pages/MainPage";
import ProductDetailPage from "./component/layout/pages/ProductDetailPage";
<<<<<<< HEAD
import AdminPage from './component/adminpage/AdminPage';
=======
import SigninEmailSearchComponent from "./component/sign/SigninEmailSearchComponent"; 

>>>>>>> ecbdd23bce77871bf594e1022f00dd6ea939fdee
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<MainPage />} />
          <Route path="/signin" element={<SignInComponent />} />
          <Route path="/signup" element={<SignupComponent />} />
          <Route path="/admin" element={<AdminPage />} />
=======
          <Route path="/" element={<MainPage/>} />
          <Route path="/signin" element={<SignInComponent/>} />
          <Route path="/signup" element={<SignupComponent/>} />
          <Route path="/searchEmail" element={<SigninEmailSearchComponent />}/>
>>>>>>> ecbdd23bce77871bf594e1022f00dd6ea939fdee
        </Routes>
        {/* 상품 Router */}
        <Routes>
          <Route  path="/products/detail/:id" element={<ProductDetailPage />} />
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
