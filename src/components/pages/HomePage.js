import {useState, useEffect} from "react";
import '../../App.css';
import SearchIcon from '@mui/icons-material/Search';
import 'react-slideshow-image/dist/styles.css';
import NavBar from "../NavBar.js"
import Slider from "../Slider.js"
import HomePageNews from "../HomePageNews.js"

const HomePage = () => {
  const [homePageData, setHomePageData] = useState(null);
  const [imageSliderURLS, setImageSliderURLS] = useState([]);

  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=apple&from=2024-01-08&to=2024-01-08&sortBy=popularity&apiKey=2521afe3ecaa4a7a8867632fbe645962');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setHomePageData(result);
      } catch (error) {
        console.log(error)
      }
    };
    const fetchSliderImageUrls = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/everything?q=global&sortBy=popularity&apiKey=2521afe3ecaa4a7a8867632fbe645962');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        let count = 0;
        let setNewSliderList = []
        for (const item of shuffle(result.articles)) {
          if (count === 4) {
            break
          }
          if (item.urlToImage !== null){
            const dict = {}
            dict.urlToImage = item.urlToImage
            dict.title = item.title
            dict.url = item.url
            setNewSliderList.push(dict)
            count = count + 1;
          }
        }

        setImageSliderURLS(setNewSliderList)
      } catch (error) {
        console.log(error)
      }
    };
    fetchHomePageData();
    fetchSliderImageUrls();
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

  return (
    <div>
      <NavBar/>
      <br/><br/><br/><br/>
      <div className="welcome-div">
        <Slider imageSliderURLS={imageSliderURLS}/>
        <div className="writting-1">Welcome to Newsify. A place to find all your news</div>
        <div className="writting-2">Search what type of news you want to read about below. Or select one of the tabs above to read some current affairs.</div>
        <br/><br/><br/>
        <div className="search-div">
          <form>
            <input type="search"  placeholder="Search News Here..."/>
            <SearchIcon className="fa fa-search" style={{ fontSize: '44px' }}/>
          </form>
        </div>
      </div>
      <br/><br/><br/>
      <div>
        <HomePageNews homePageData={homePageData}/>
      </div>

    </div>
  );
}

export default HomePage;