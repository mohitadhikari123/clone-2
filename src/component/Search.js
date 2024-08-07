import React, { useEffect, useState } from "react";
import "./Search.css";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../StateProvider/StateProvider";
import { actionTypes } from "../StateProvider/reducer";

function Search({ hideButtons = false }) {
  const [{}, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const search = (e) => {
    // e.preventDefault();
    dispatch({
      type: actionTypes.SET_SEARCH_TERM,
      term: input,
    });

     window.localStorage.setItem("Input", String(input));
     navigate("/search");

  };

  const inputValue = window.localStorage.getItem("Input");

  const startConverting = () => {
    
    if ("webkitSpeechRecognition" in window) {
      const speechRecognizer = new window.webkitSpeechRecognition();
      speechRecognizer.continuous = false;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = "en-US";
      speechRecognizer.start();

      speechRecognizer.onresult = (event) => {
        let finalTranscripts = "";
        let interimTranscripts = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscripts += transcript;
            // console.log("finalTranscripts : ", finalTranscripts);
          } else {
            interimTranscripts += transcript;
            // console.log("interimTranscripts : ", interimTranscripts);
          }
        }

        // Update input state with the final transcripts
        setInput(finalTranscripts + interimTranscripts);
       setTimeout(() => {
         const inputElement = document.querySelector('input[type="text"]');
         if (inputElement) {
           inputElement.focus();
         }
       }, 0);
      };
      
      speechRecognizer.onerror = (event) => {
        console.error("Speech recognition error", event);
      };
    } else {
      console.error(
        "Your browser is not supported. Please download Google Chrome or update your Google Chrome!"
      );
    }
    
  };

  return (
    <form className="search">
      <div className="search_input">
        <SearchIcon className="search_inputIcon" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={inputValue || "Search"}
        />
        {/* {console.log(input)} */}
        <div className="pointerCursor" onClick={startConverting }>
          <MicIcon />
        </div>
      </div>

      {!hideButtons ? (
        <div className="search_buttons">
          <Button type="submit" onClick={search} variant="outlined">
            Google Search
          </Button>
          <Button variant="outlined">I'm Feeling Lucky</Button>
        </div>
      ) : (
        <div className="search_buttons">
          <Button
            type="submit"
            onClick={search}
            variant="outlined"
            className="search_buttons_hidden"
          >
            Google Search
          </Button>
          <Button variant="outlined" className="search_buttons_hidden">
            I'm Feeling Lucky
          </Button>
        </div>
      )}
    </form>
  );
}

export default Search;
