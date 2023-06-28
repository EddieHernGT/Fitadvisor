import Image from 'react-bootstrap/Image'
import image from '../../img/bannerEx.jpg';

function mainBanner() {
    return (
        <>
            <div className='Banner'>
                <h1 className="ft-Title">
                    Ponte en forma con ejercicios y dietas personalizadas en FitAdvisor.
                </h1>
                <Image
                    src={image}
                    alt="Exercise Lady"
                    className="imgDer"
                ></Image>
            </div>
        </>
    );
}

export default mainBanner;