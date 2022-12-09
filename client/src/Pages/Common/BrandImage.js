import Image from 'react-bootstrap/Image'
import Wallpaper from '../../Images/wallpaper.jpeg'

/**
 * @returns an image displayed on the front page
 */
function BrandImage() {
    return (
        <div className="container-fuild">
            <Image src={Wallpaper}></Image>
        </div>
    );
}

export default BrandImage;