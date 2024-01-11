import NoImage from "../images/no-image.png";

const NewsCardSmall = (props) => {
	function ImageExist(url)
	{
		 var img = new Image();
		 img.src = url;
		 return img.height !== 0;
	}
  return (
    <div className="card-small" onClick={() => window.open(props.url, '_blank')}>
      <div className="card-inner">
        <div className="card-front">
					<div className="small-card-title">
						{props.title.length > 100 ? `${props.title.slice(0, 100)}...` : props.title}
					</div>
          <br/>
          {props.urlToImage !== null // && ImageExist(props.urlToImage)
          ? <div>
							<img alt="img"className="small-card-img" src={props.urlToImage}/>
            </div>
          : <div>
							<img alt="img"className="small-card-img" src={NoImage}/>
						</div>
          }
        </div>
        <div className="card-back">
          <div className="card-back-text">Click to Read More</div>
        </div>
      </div>
    </div>
  )
}

export default NewsCardSmall;