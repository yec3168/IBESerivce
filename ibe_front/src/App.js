import { BrowserRouter, Routes, Route } from "react-router-dom";

import LayoutComponent from './component/layout/LayoutComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignInComponent from './component/sign/SigninComponent';
import SignupComponent from './component/sign/SignupComponent';

function App() {
  return (
    <>
      {/* <LayoutComponent/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element ={<SignInComponent />} ></Route>
          <Route path="/signup" element = {<SignupComponent />}> </Route>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
