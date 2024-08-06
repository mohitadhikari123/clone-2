import React from "react";
import "./Result.css";
import { useStateValue } from "../StateProvider/StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import Navbar from "../component/Navbar";

function Result() {
  const [{ term = ""}, dispatch] = useStateValue();
  //Live API Call
  const inputValue = window.localStorage.getItem("Input");
  const { data } = useGoogleSearch(inputValue);
  //   const data = Response;

  return (
    <>
      <div className="result">
        <Navbar/>
        {term && (
          <div className="result_searchPage">
            <p className="result_searchPageCount">
              About {data?.searchInformation?.formattedTotalResults} results in (
              {data?.searchInformation?.formattedSearchTime} seconds) for {term}
            </p>
            {data?.items.map((item) => (
              <div className="searchPage_result">
                <div className="result_container">
                  {
                    <img
                      src={
                        item.pagemap?.cse_image?.length > 0 &&
                        item.pagemap?.cse_image[0]?.src
                      }
                      alt=""
                      className="searchPage_resultImage"
                    />
                  }
                  <div className="result_link">
                    <a className="searchPage_resultTitle" href={item.link}>
                      {item.title}
                    </a>
                    <a href={item.link}>{item.displayLink}</a>
                  </div>
                </div>
                <p className="searchPage_resultSnippet"> {item.snippet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Result;
