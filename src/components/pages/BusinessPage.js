import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import NewsCard from "../NewsCard.js"
import NewsCardSmall from "../NewsCardSmall.js"
import Loading from "./Loading.js"

const BusinessPage = () => {
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
      const url = 'https://newsx.p.rapidapi.com/search/?q=business&limit=100&skip=0';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1dabde3d8emsh5646da1981c06b1p15011fjsnb3f1c1ece65f',
          'X-RapidAPI-Host': 'newsx.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        let count = 0;
        let latestNews = []
        let listDone = []
        // setting all articles list
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
            latestNews.push(dict)
            listDone.push(item.summary)
            count = count + 1;
          }
        }
        setNews(latestNews)

        // setting only 6 articles list for header headlines
        count = 0;
        latestNews = []
        listDone = []
        for (const item of shuffle(result)) {
          if (count === 6) {
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
            latestNews.push(dict)
            listDone.push(item.summary)
            count = count + 1;
          }
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
              Latest Business News
            </div>
            <br/>
            <hr className="hr-underline"/>
            <br/><br/><br/>
            <div className="cards-container">
              {news.map((dict, index) => (
                <>
                <NewsCard
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
export default BusinessPage;
