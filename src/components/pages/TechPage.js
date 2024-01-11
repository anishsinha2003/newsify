import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import NewsCard from "../NewsCard.js"
import NewsCardSmall from "../NewsCardSmall.js"
import Loading from "./Loading.js"

const TechPage = () => {

  const [news, setNews] = useState([])
  const [newsTop, setNewsTop] = useState([])
  const [loadingPage, setLoadingPage] = useState(false);

  function ImageExist(url)
	{
		 var img = new Image();
		 img.src = url;
		 return img.height !== 0;
	}
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

  useEffect(() => {
    const fetchSportsNewsData = async () => {
      try {
        // fetching data
        const response = await fetch('https://newsapi.org/v2/everything?q=technology&sortBy=date&apiKey=2521afe3ecaa4a7a8867632fbe645962');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        let count = 0;
        let latestNews = []
        // setting all articles list
        for (const item of result.articles) {
          if (count === 50) {
            break
          }
          const dict = {}
          dict.name = item.source.name;
          dict.author = item.author;
          dict.description = item.description;
          const timestamp = new Date(item.publishedAt);
          const formattedDate = timestamp.toLocaleDateString();
          dict.publishedAt = formattedDate;
          dict.content = item.content;
          dict.urlToImage = item.urlToImage;
          dict.title = item.title
          dict.url = item.url
          latestNews.push(dict)
          count = count + 1;
        }
        setNews(latestNews)
        // setting only 6 articles list for header headlines
        count = 0;
        latestNews = []
        for (const item of shuffle(result.articles)) {
          if (count === 6) {
            break
          }
          if (item.urlToImage != null && ImageExist(item.urlToImage)) {
            const dict = {}
            dict.name = item.source.name;
            dict.author = item.author;
            dict.description = item.description;
            const timestamp = new Date(item.publishedAt);
            const formattedDate = timestamp.toLocaleDateString();
            dict.publishedAt = formattedDate;
            dict.content = item.content;
            dict.urlToImage = item.urlToImage;
            dict.title = item.title
            dict.url = item.url
            latestNews.push(dict)
            count = count + 1;
          }
        }
        setNewsTop(latestNews)
        setLoadingPage(false)
      } catch (error) {
        console.log(error)
      }
    };
    setLoadingPage(false)
    fetchSportsNewsData();
    setLoadingPage(true)
  }, []);
    return (
      <>
      {loadingPage
        ? <Loading/>
        : <div>
            <NavBar/>
            <br/><br/><br/><br/>
            <div className="welcome-div">
              <div className="grid-wrapper">
                {newsTop.map((dict, index) => (
                  index === 0
                    ? <div className="item-a">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                    : index === 1
                    ? <div className="item-b">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                    : index === 2
                    ? <div className="item-c">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                    : index === 3
                    ? <div className="item-d">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                    : index === 4
                    ? <div className="item-e">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                    : <div className="item-f">
                        <NewsCardSmall
                          publishedAt={dict.publishedAt}
                          title={dict.title}
                          url={dict.url}
                          urlToImage={dict.urlToImage}
                        />
                      </div>
                ))}
              </div>
            </div>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div style={{
              textAlign: "center",
              fontSize: "40px",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Latest Tech News
            </div>
            <br/>
            <hr className="hr-underline"/>
            <br/><br/><br/>
            <div className="cards-container">
              {news.map((dict, index) => (
                <>
                <NewsCard
                  author={dict.author}
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
    )
  }
export default TechPage;
