import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Banner1 from '../../assets/Banner-1.png';
import Banner2 from '../../assets/Banner-2.png';
import Banner3 from '../../assets/Banner-3.png';
import Banner4 from '../../assets/banner-4.png';
const Banner = () => {
    return (
        <>
            <Carousel
                className='mt-10'
                autoPlay={true}
                infiniteLoop={true}
                dynamicHeight={true}
                emulateTouch={true}
            >
                <div>
                    <img className='w-[50px]' src={Banner1} />
                </div>
                <div>
                    <img className='w-[50px]' src={Banner2} />
                </div>
                <div>
                    <img className='w-[50px]' src={Banner3} />
                </div>
                <div>
                    <img className='w-[50px]' src={Banner4} />
                </div>
            </Carousel>
            <div className="flex justify-center text-4xl mt-6 animate-bounce text-gray-800">
                ↓ Scroll
            </div>


        </>

    );
};

export default Banner;