import '../CSS/index.css';
import MainBanner from "../components/mainPage/mainBanner";
import UsSection from "../components/mainPage/usSection";
import Servicios from "../components/mainPage/servicesSection";

function landingPage() {
    return (
        <div>
            <MainBanner/>
            <UsSection/>
            <Servicios/>
        </div>
    );
}

export default landingPage;