import React from 'react'
import Carousel from 'react-images'
import Review1 from "../review-images/review1.png"
import Review2 from "../review-images/review2.png"
import Review3 from "../review-images/review3.png"
import Review4 from "../review-images/review4.png"
import Review5 from "../review-images/review5.png"

// CHANGE PICS TO REVIEWSs
const images = [{ source: Review1 }, { source: Review2}, {source: Review3}, { source: Review4}, {source: Review5}]

function ReviewCarousel() {
    return <Carousel width="300px" views={images} />
}

export default ReviewCarousel;