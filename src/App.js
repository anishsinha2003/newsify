import {useState, useEffect} from "react";
import logo from './images/logo.png';
import './App.css';
import SearchIcon from '@mui/icons-material/Search';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function App() {
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
    <div className="App">
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

function Slider(props) {
  return (
    <div className="slide-container">
      <Fade>
        {props.imageSliderURLS.map((dict, index) => (
          <div style={{ backgroundImage: `url(${dict.urlToImage})`, backgroundColor: 'rgba(255, 0, 0, 0.5)'}} className="each-slide" key={index}>
            <div className="text-slide">{dict.title}</div>
          </div>
        ))}
      </Fade>
    </div>
  )
}

function NavBar() {
  return (
    <div className="topnav">
      <img src={logo} alt="logo" className="logo"/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <a className="active" href="#home">Home</a>
      <a href="#news">News</a>
      <a href="#contact">Contact</a>
      <a href="#about">About</a>
    </div>
  )
}
function HomePageNews(props) {
  return (
    <></>
  )
}
export default App;
