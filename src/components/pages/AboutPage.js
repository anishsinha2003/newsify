import NavBar from "../NavBar.js"
import {useState, useEffect} from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';


// from firebase
firebase.initializeApp({
  apiKey: "AIzaSyCzXQ2ozbiotSPorB1jFwEMMKPBhz7x4TU",
  authDomain: "newsify-feedback.firebaseapp.com",
  projectId: "newsify-feedback",
  storageBucket: "newsify-feedback.appspot.com",
  messagingSenderId: "841801956826",
  appId: "1:841801956826:web:1d785f2a21bb9efd5bd4e3",
  measurementId: "G-F9TBW3Q222"
})

const firestore = firebase.firestore();

const AboutPage = () => {
    const [feedback, setFeedback] = useState("");
    const messagesRef = firestore.collection('feedback');
    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSendFeeback = async(e) => {
      await messagesRef.add({
        feedbackText: feedback,
        sentAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      setFeedback("");
      const btn = document.querySelector("#btn");
      const btnText = document.querySelector("#btnText");
      btnText.innerHTML = "Thanks";
      btn.classList.add("active");
      await sleep(2200);
      btn.classList.remove("active");
      btnText.innerHTML = "Submit";
    }
    const handleIGclick = () => {
      window.open('https://www.instagram.com/anish.sinha1/', '_blank');
    };
    const handleLinkedINclick = () => {
      window.open('https://www.linkedin.com/in/anish-sinha-9a369b222/', '_blank');
    };
    const [copiedEmail, setCopiedEmail] = useState(false);
    useEffect(() => {
      if (copiedEmail) {
        const timeout = setTimeout(() => {
          setCopiedEmail(false);
        }, 2000);

        return () => {
          clearTimeout(timeout);
        };
      }
    }, [copiedEmail]);
    return (
      <div>
        <NavBar/>
        <br/><br/><br/><br/><br/><br/>
        <div style={{
          textAlign: "center",
          fontSize: "40px",
          fontFamily: "'Poppins', sans-serif",
        }}>
          About Newsify
        </div>
        <br/><br/>
        <div style={{
          textAlign: "center",
          fontSize: "20px",
          lineHeight: "40px",
          width: "900px",
          display: "block",
          margin: "auto"
        }}>
          For up-to-date information on global news and trending stories, Newsify is your go-to resource. We know how important it is to stay current in this fast-paced digital world, which is why Newsify is made to make finding and exploring news that interests you simple and pleasurable.
        </div>
        <br/><br/><br/>
        <div style={{
          textAlign: "center",
          fontSize: "20px",
          lineHeight: "40px",
          width: "900px",
          margin: "auto"
        }}>
        To bring you the most accurate and up-to-date news content, Newsify relies on the powerful &nbsp;
        <a href={"https://rapidapi.com/machaao-inc-machaao-inc-default/api/newsx"} target="_blank" rel="noopener noreferrer">
          NewsX API
        </a>.&nbsp;
        This API, offers a comprehensive set of features that enable us to fetch, filter, and display news articles seamlessly.
        <br/><br/><br/><br/>
        </div>
        <input
          value={feedback}
          placeholder="Enter Your Feedback Here!"
          onChange={(event) => setFeedback(event.target.value)}
          style={{
            position: "relative",
            backgroundColor: "#FDD12C",
            width: "500px",
            height: "60px",
            textAlign: "left",
            display: "block",
            margin: "auto",
            boxShadow: "inset 1px 1px 20px rgba(0, 0, 0, 0.3)",
            fontSize: 20,
            borderRadius: 20,
          }}
        />
        <br/><br/><br/>
        <button id="btn" className="feedback-button" onClick={handleSendFeeback}>
          <p id="btnText">Submit</p>
          <div className="check-box">
            <svg className="svg"xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
        </button>
        <br/><br/><br/><br/>
        <div className="contact">
          <InstagramIcon onClick={handleIGclick}
            sx={{
              color: 'black',
              mr: 1,
              padding: "4px",
              ':hover': {
                backgroundColor: 'black',
                color: 'white',
                cursor: "pointer",
                padding: "4px",
                transition: "all 0.3s ease",
              }
            }}
          />

          <LinkedInIcon onClick={handleLinkedINclick}
            sx={{
              color: 'black',
              mr: 1,
              padding: "4px",
              ':hover': {
                backgroundColor: 'black',
                color: 'white',
                cursor: "pointer",
                padding: "4px",
                transition: "all 0.3s ease",
              }
            }}
          />
          <EmailIcon onClick={() => { navigator.clipboard.writeText(`anishsinha2003@gmail.com`) && setCopiedEmail(true)}}
            sx={{
              color: 'black',
              mr: 1,
              cursor: "pointer",
              padding: "4px",
              ':hover': {
                backgroundColor: 'black',
                color: 'white',
                cursor: "pointer",
                padding: "2px",
                transition: "all 0.1s ease",
              }
            }}
          />
        </div>
        <br/> <br/>
        <div style={{
          visibility: copiedEmail ? "visible" : "hidden",
          fontSize: "17px",
          fontWeight: "bold",
          color: "#404040",
          opacity: copiedEmail ? "1" : "0",
          transition: "all 0.5s",
          marginTop: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "none",

        }}>
          ✅ &nbsp; Email copied!
        </div>
      </div>


      )
    }
  export default AboutPage;