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
        console.log("Pass true");
        const url = `https://newsapi.org/v2/everything?q=${search}&sortBy=date&apiKey=2521afe3ecaa4a7a8867632fbe645962`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log("Pass false");
        setLoadingPage(false)
        let count = 0;
        let latestNews = []
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
export default QueryPage;