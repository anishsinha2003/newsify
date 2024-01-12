import {useState, useEffect} from "react";
import '../../App.css';
import SearchIcon from '@mui/icons-material/Search';
import 'react-slideshow-image/dist/styles.css';
import NavBar from "../NavBar.js"
import Slider from "../Slider.js"
import NewsCard from "../NewsCard.js"
import { useNavigate } from "react-router-dom";
import Loading from "./Loading.js";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [homePageData, setHomePageData] = useState([]);
  const [imageSliderURLS, setImageSliderURLS] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const calculateNewLines = () => {
    if (windowWidth > 1520) {
      return <><br/><br/><br/></>;
    } else {
      return <><br/><br/><br/></>;
    }
  };

// Fetch the HTML content from the URL
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        setLoadingPage(true)
        const url = `https://newsx.p.rapidapi.com/search/?limit=100&skip=0`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '1dabde3d8emsh5646da1981c06b1p15011fjsnb3f1c1ece65f',
            'X-RapidAPI-Host': 'newsx.p.rapidapi.com'
          }
        };
        const response = await fetch(url, options);
        const result = await response.json();

        let count = 0;
        let setNewHomePageLatestNews = []
        let listDone = []
        for (const item of shuffle(result)) {
          if (count === 100) {
            break
          }
          if (item.image !== "https://wtop.com/wp-content/uploads/2017/04/wtop_logo_512x512.png" && !item.image.includes("theprint") && !listDone.includes(item.summary)) {
            const dict = {}
            dict.name = item.author;
            const timestamp = new Date(item.dateLong);
            dict.description = item.summary;
            const formattedDate = timestamp.toLocaleDateString();
            dict.publishedAt = formattedDate;
            dict.urlToImage = item.image;
            dict.title = item.title
            dict.url = item.url
            listDone.push(item.summary)
            setNewHomePageLatestNews.push(dict)
            count = count + 1;
          }
        }
        setHomePageData(setNewHomePageLatestNews)
        count = 0;
        let setNewSliderList = []
        listDone = []
        for (const item of shuffle(result)) {
          if (count === 4) {
            break
          }
          if (item.image !== "https://wtop.com/wp-content/uploads/2017/04/wtop_logo_512x512.png" && !item.image.includes("theprint") && !listDone.includes(item.summary)) {
            const dict = {}
            dict.name = item.author;
            const timestamp = new Date(item.dateLong);
            dict.description = item.summary;
            const formattedDate = timestamp.toLocaleDateString();
            dict.publishedAt = formattedDate;
            dict.urlToImage = item.image;
            dict.title = item.title
            dict.url = item.url
            listDone.push(item.summary)
            setNewSliderList.push(dict)
            count = count + 1;
          }
        }
        setImageSliderURLS(setNewSliderList)
        setLoadingPage(false)
      } catch (error) {
        console.log(error)
      }
    };
    fetchHomePageData();
  }, []);

  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // passing in the query as a param and then QueryPage.js can access this using useParams
      navigate(`/query/${query}`);
    }
  };
  const handleQuery = () => {
    navigate(`/query/${query}`);

  };
  return (
    <>
    {loadingPage
    ? <Loading/>
    : <div>
        <NavBar/>
        <br/><br/><br/><br/>
        <div className="welcome-div">
          <Slider imageSliderURLS={imageSliderURLS}/>
          <div className="writting-1">Welcome to Newsify. A place to find all your news</div>
          <div className="writting-2">Search what type of news you want to read about below. Or select one of the tabs above to read some current affairs.</div>
          <br/><br/><br/>
          <div className="search-div">
            <form>
              <input
                value={query}
                onChange={handleInputChange}
                onKeyPress={handleEnterPress}
                type="search"
                placeholder="Search News Here..."
              />
              <SearchIcon
                onClick={handleQuery}
                className="fa fa-search"
                style={{ fontSize: '44px' }}
              />
            </form>
          </div>
        </div>
        {calculateNewLines()}
        <div style={{
          textAlign: "center",
          fontSize: "40px",
          fontFamily: "'Poppins', sans-serif",
        }}>
          Latest News
        </div>
        <br/>
        <hr className="hr-underline"/>
        <br/><br/><br/>
        <div className="cards-container">
          {homePageData.map((dict, index) => (
            <>
            <NewsCard
              key={index}
              content={dict.content}
              description={dict.description}
              name={dict.name}
              publishedAt={dict.publishedAt}
              title={dict.title}
              url={dict.url}
              urlToImage={dict.urlToImage}
            />
              <br/><br/><br/>
            </>
          ))}
        </div>
      </div>
    }
    </>
  );
}

export default HomePage;