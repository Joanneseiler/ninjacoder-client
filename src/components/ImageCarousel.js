import React from 'react'
import Carousel from 'react-images'
import KidsImage1 from "../stock-images/kids1.jpg"
import KidsImage2 from "../stock-images/kids2.jpg"
import KidsImage3 from "../stock-images/kids3.jpg"

const images = [{ source: KidsImage1 }, { source: KidsImage2 }, {source: KidsImage3}]

function StockImageCarousel() {
    return <Carousel views={images} />
}

export default StockImageCarousel;