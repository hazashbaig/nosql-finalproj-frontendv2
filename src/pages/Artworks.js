import Carousel from "../components/Carousel";
import art1 from "../static/art1.jpg";
import art2 from "../static/art2.jpg";
import art3 from "../static/art3.jpg";

function Artworks() {
    const images = [
        art1,
        art2,
        art3
    ]
    return(
        <div>
            <Carousel images={images}/>
        </div>
    );
}

export default Artworks;