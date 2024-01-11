import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import NewsCard from "../NewsCard.js"
import { useParams } from 'react-router-dom';
import Loading from "./Loading.js";

// const QueryPage = (props) => {
const QueryPage = () => {
  const [queryNews, setQueryNews] = useState([])
  const { search } = useParams();
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const fetchQueryNewsData = async () => {
      try {
        setLoadingPage(true)
        const url = `https://news67.p.rapidapi.com/v2/topic-search?languages=en&search=${search}`;
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': '1dabde3d8emsh5646da1981c06b1p15011fjsnb3f1c1ece65f',
            'X-RapidAPI-Host': 'news67.p.rapidapi.com'
          }
        }
        const response = await fetch(url, options);
        const result = await response.json();
        setLoadingPage(false)
        let count = 0;
        let latestNews = []
        for (const item of result.news) {
          if (count === 50) {
            break
          }
          const dict = {}
          dict.name = item.Source;
          if (item.Description === "") {
            dict.description = item.Summary;
          } else {
            dict.description = item.Description;
          }
          const timestamp = new Date(item.PublishedOn);
          const formattedDate = timestamp.toLocaleDateString();
          dict.publishedAt = formattedDate;
          dict.urlToImage = item.Image;
          dict.title = item.Title
          dict.url = item.Url
          latestNews.push(dict)
          count = count + 1;
        }
        setQueryNews(latestNews)
      } catch (error) {
        console.log(error)
      }
    };
    fetchQueryNewsData();
  }, [search]);
    return (
      <>
        {loadingPage
        ? <Loading/>
        : <div>
          <NavBar/>
          <br/><br/><br/><br/><br/><br/>
          <div style={{
            textAlign: "center",
            fontSize: "40px",
            fontFamily: "'Poppins', sans-serif",
          }}>
            Latest "{search}" News
          </div>
          <br/>
          <hr className="hr-underline"/>
          <br/><br/><br/>
          <div className="cards-container">
            {queryNews.map((dict, index) => (
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
export default QueryPage;