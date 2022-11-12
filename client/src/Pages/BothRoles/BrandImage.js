import Image from 'react-bootstrap/Image'
import Wallpaper from '../../Images/wallpaper.jpeg'

function BrandImage() {


    return (
        <div className="container-fuild">

            <Image src={Wallpaper}>
            </Image>

        </div>
    );
}

export default BrandImage;