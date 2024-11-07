import { jwtDecode } from 'jwt-decode';
import SignInComponent from '../sign/SigninComponent';

 function PrivateRouter({Role, component: Component}){
    let authenticated = false;
    const token = localStorage.getItem('accessToken');
    let tokenRole;
    if (token) {
        try {
        const decodedToken = jwtDecode(token);
        tokenRole = decodedToken.role // Get user role from the token
        } catch (error) {
        console.error('Token decoding error:', error);
        }
    }
    // console.log(tokenRole);
    // console.log(Role);
    const adminArr=["ROLE_ADMIN","ROLE_SERVICE_MANAGER","ROLE_BOARD_MANAGER"]
    const userArr =["ROLE_CLIENT", "ROLE_DEFAULT","ROLE_ADMIN","ROLE_SERVICE_MANAGER","ROLE_BOARD_MANAGER"]
    if(Role==="ADMIN"){
        for(let i=0;i<adminArr.length;i++){
            if(tokenRole===adminArr[i]){
                authenticated=true;
            }
        }
    }
    if(Role==="USER"){
        for(let i=0;i<userArr.length;i++){
            if(tokenRole===userArr[i]){
                authenticated=true;
            }
        }
    }
    
//ROLE_ADMIN, ROLE_SERVICE_MANAGER, ROLE_BOARD_MANAGER, ROLE_CLIENT, ROLE_BANNED_CLIENT, ROLE_DEFAULT
   return (
    
     authenticated ? Component : <SignInComponent/>
   )
 }

 export default PrivateRouter