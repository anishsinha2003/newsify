import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import NewsCard from "../NewsCard.js"
import { useParams } from 'react-router-dom';
import Loading from "./Loading.js";
import Nothing from "../../images/nothing.png"

const QueryPage = () => {
  const [queryNews, setQueryNews] = useState([])
  const { search } = useParams();
  const [loadingPage, setLoadingPage] = useState(false);
  const [nothingFoundPage, setNothingFoundPage] = useState(false);

  useEffect(() => {
    const fetchNew = async () => {
      setLoadingPage(true)
      const url = `https://newsx.p.rapidapi.com/search/?q=${search}&limit=100&skip=0`;
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
        // setting all articles list
        if (result.length === 0) {
          throw new Error('Nothing found');
        }
        for (const item of result) {
          if (count === 100) {
            break
          }
          if (item.image !== "https://wtop.com/wp-content/uploads/2017/04/wtop_logo_512x512.png") {
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
            count = count + 1;
          }
        }
        setQueryNews(latestNews)
        setLoadingPage(false)

      } catch (error) {
        console.log("PAS")
        setLoadingPage(false)
        setNothingFoundPage(true)
      }
    }
    fetchNew();
  }, [search]);
    return (
      <>
        {loadingPage
        ? <Loading/>
        : nothingFoundPage
        ? <div>
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
          <img alt="nothing" style={{ display: "block", margin: "auto" }} src={Nothing}/>
        </div>
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