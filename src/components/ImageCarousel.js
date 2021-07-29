import React from 'react'
import Carousel from 'react-images'
import KidsImage1 from "../stock-images/kids1.jpg"
import KidsImage2 from "../stock-images/kids2.jpg"
import KidsImage3 from "../stock-images/kids3.jpg"
import KidsImage4 from "../stock-images/kids4.jpg"
import KidsImage5 from "../stock-images/kids5.jpg"

const images = [{ source: KidsImage1 }, { source: KidsImage2 }, {source: KidsImage3},  {source: KidsImage4 }, { source: KidsImage5 }]

function StockImageCarousel() {
    return <Carousel views={images} />
}

export default StockImageCarousel;