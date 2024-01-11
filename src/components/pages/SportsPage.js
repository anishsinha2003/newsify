import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import NewsCard from "../NewsCard.js"
import NewsCardSmall from "../NewsCardSmall.js"
import Loading from "./Loading.js"

const SportsPage = () => {
  const [news, setNews] = useState([])
  const [newsTop, setNewsTop] = useState([])
  const [loadingPage, setLoadingPage] = useState(false);

  // function ImageExist(url)
  // {
  //    var img = new Image();
  //    img.src = url;
  //    return img.height !== 0;
  // }
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
    const fetchNew = async () => {
      setLoadingPage(true)
      const url = 'https://news67.p.rapidapi.com/v2/topic-search?languages=en&search=sport&batchSize=30';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1dabde3d8emsh5646da1981c06b1p15011fjsnb3f1c1ece65f',
          'X-RapidAPI-Host': 'news67.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        let count = 0;
        let latestNews = []
        // setting all articles list
        for (const item of shuffle(result.news)) {
          if (count === 50) {
            break
          }
          const dict = {}
          dict.name = item.Source;
          const timestamp = new Date(item.PublishedOn);
          if (item.Description === "") {
            dict.description = item.Summary;
          } else {
            dict.description = item.Description;
          }
          const formattedDate = timestamp.toLocaleDateString();
          dict.publishedAt = formattedDate;
          dict.urlToImage = item.Image;
          dict.title = item.Title
          dict.url = item.Url
          latestNews.push(dict)
          count = count + 1;
        }
        setNews(latestNews)

        // setting only 6 articles list for header headlines
        count = 0;
        latestNews = []
        console.log(result.news)
        for (const item of shuffle(result.news)) {
          if (count === 6) {
            break
          }

          const dict = {}
          dict.name = item.Source;
          dict.author = "author";
          dict.content = item.Summary;
          const timestamp = new Date(item.PublishedOn);
          const formattedDate = timestamp.toLocaleDateString();
          dict.publishedAt = formattedDate;
          dict.urlToImage = item.Image;
          dict.title = item.Title
          dict.url = item.Url
          latestNews.push(dict)
          count = count + 1;
        }
        console.log(latestNews)
        setNewsTop(latestNews)
        setLoadingPage(false)

      } catch (error) {
        console.error(error);
      }
    }
    fetchNew();
  }, []);
    return (
      <>
      {loadingPage
        ? <Loading/>
        : <div>
            <NavBar/>
            <br/><br/><br/><br/>
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
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <div style={{
              textAlign: "center",
              fontSize: "40px",
              fontFamily: "'Poppins', sans-serif",
            }}>
              Latest Sports News
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
export default SportsPage;
