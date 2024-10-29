import FooterComponent from "../footer/FooterComponent";
import HeaderComponent from "../header/HeaderComponent";

const LayoutComponent = (props) =>{
    return (
        <div>
            <HeaderComponent/>
            <main>
                {props.children}
            </main>
            <FooterComponent/>
        </div>   
    )
}

export default LayoutComponent;