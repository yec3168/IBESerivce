import { useLocation } from "react-router-dom";

const MypagePointPayBackResultComponent = ()=>{
    const location = useLocation();
    console.log(location.state);
    return(
        <>
        {location.state}
        
        </>
    )
}
export default MypagePointPayBackResultComponent;