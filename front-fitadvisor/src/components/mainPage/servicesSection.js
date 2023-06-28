import Carousel from "react-bootstrap/Carousel";
import Image from 'react-bootstrap/Image'
import imageR from '../../img/rutinas.jpg';
import imageD from '../../img/dieta_saludable.jpg';
import imageE from '../../img/personal_trainer.jpg';
function OurServices(){
    return(
        <Carousel className='mt-5' variant="dark">
            <Carousel.Item>
                <Image
                    className="d-block w-100 carouselImage"
                    src={imageR}
                    alt="Mujer ejercitandoce"
                />
                <Carousel.Caption>
                    <h3>
                        Rutinas
                    </h3>
                    <p>
                        Contamos con una gran variedad de rutinas para ti.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 carouselImage"
                    src={imageD}
                    alt="Dieta saludable"
                />
                <Carousel.Caption>
                    <h3>
                        Dietas
                    </h3>
                    <p>
                        Genera una dieta que ayude a tu salud.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 carouselImage"
                    src={imageE}
                    alt="Entrenador"
                />
                <Carousel.Caption>
                    <h3>
                        Atencion especializada
                    </h3>
                    <p>
                        Proximamente.
                    </p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
export default OurServices;