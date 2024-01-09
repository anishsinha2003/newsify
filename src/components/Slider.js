import { Fade } from 'react-slideshow-image';
import React, { useState } from 'react';


const Slider = (props) => {
    const [isHoveredSlide, setIsHoveredSlide] = useState(false);

    const handleMouseEnter = () => {
      setIsHoveredSlide(true);
    };

    const handleMouseLeave = () => {
      setIsHoveredSlide(false);
    };
    return (
      <div className="slide-container">
        <Fade>
          {props.imageSliderURLS.map((dict, index) => (
            <div
              onClick={() => window.open(dict.url, '_blank')}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundImage: `url(${dict.urlToImage})`,
                cursor: "pointer"}}
              className="each-slide"
              key={index}
            >
              {isHoveredSlide
              ? <div className='hover-slide-text'>Click to Read More</div>
              : <></>}
              <div className="text-slide">{dict.title}</div>
            </div>

          ))}
        </Fade>
      </div>
    )
  }
export default Slider;