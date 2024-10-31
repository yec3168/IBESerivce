import "./Main.css"

const AdComponent = (props) => {
    return (
        <div >
            <img id ="ad_img" src={props.image.src  } alt="광고 이미지" />
        </div>
    );
}

export default AdComponent;