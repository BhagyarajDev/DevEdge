'use client'
import Image from "next/image"

const ExploreBtn = () => {
    return (
        <button type="button" id="explore-btn" className="mt-7 mx-auto" onClick={() => console.log("clicked")}>
            <a href="#events">
                Explore Event
                <Image src='/icons/arrow-down.svg' alt="arrow-down" width={20} height={20} className="inline-block ml-2 animate-bounce" />
            </a>
        </button>
    )
}

export default ExploreBtn