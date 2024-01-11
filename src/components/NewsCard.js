import NoImage from "../images/no-image.png";

const NewsCard = (props) => {
  return (
    <div className="card" onClick={() => window.open(props.url, '_blank')}>
      <div className="card-inner">
        <div className="card-front">
          <div className="card-publishedAt">
            {props.publishedAt}
          </div>
          <br/>
          {props.urlToImage !== null
          ? <img alt="img"className="card-img" src={props.urlToImage}/>
          : <img alt="img"className="card-img" src={NoImage}/>
          }
          <br/><br/>
          <div className="card-title">
            {props.title}
          </div>
          <br/>
          <div className="card-description">
            {props.description}
          </div>
          <br/><br/>
        </div>
        <div className="card-back">
          <div className="card-back-text">Click to Read More</div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard;