import { useLocation } from "react-router-dom";

const MypagePointChargeResult = (Props)=>{
    const location = useLocation();
    console.log(location.state);
    return(
        <>
        {location.state.partner_user_id}님  <br/>
        {location.state.item_name} 충전 완료되었습니다. <br/>
        <button onClick={()=>window.close()}>확인</button>
        
        </>
    )
}
export default MypagePointChargeResult;