import { useLocation } from "react-router-dom";

const MypagePointChargeResult = (Props)=>{
    const location = useLocation();
    console.log(location.state);
    let name = location.state.data.partner_user_id;
    let points = location.state.data.item_name;
    return(
        <>
        {name}님  <br/>
        {points} 충전 완료되었습니다. <br/>
        <button onClick={()=>window.close()}>확인</button>
        
        </>
    )
}
export default MypagePointChargeResult;