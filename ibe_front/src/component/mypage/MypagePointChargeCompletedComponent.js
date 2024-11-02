import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { kakaoCompleted } from "../service/PointService";

const MypagePointChargeCompletedComponent = ()=>{

    let [pg_token, setPg_token] = useSearchParams();
    let tid =localStorage.getItem('tid');
    const [didMount, setDidMount] = useState(false)
    const navigate = useNavigate();

    console.log(pg_token);
    console.log(tid);

    useEffect(() => {
    setDidMount(true)
  }, [])

    useEffect(() => {
    if (didMount) {
      console.log('api 호출')
      kakaoCompleted(pg_token,tid).then(
        response =>{
            console.log(response.data);

            navigate("/mypage/pntcharge/result",{ state: response.data })
        }
        )
    }
  }, [didMount])
    return (
        <>
        </>
    )
}
export default MypagePointChargeCompletedComponent