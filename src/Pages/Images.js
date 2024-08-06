import React from "react";
import "./Result.css";
import { useStateValue } from "../StateProvider/StateProvider";
import useGoogleSearch from "../useGoogleSearch";
import Navbar from "../component/Navbar";
function Images() {
  const [{ term = "tesla" }, dispatch] = useStateValue();
 const inputValue = window.localStorage.getItem("Input");
 const { data } = useGoogleSearch(inputValue);
  //   const data = Response;

  return (
    <>
      <div className="result">
        <Navbar/>
        { (
          <div className="result_searchPage">
            {data?.items.map((item) => (
              <div className="searchPage_result">
                {
                  <img
                    src={
                      item.pagemap?.cse_image?.length > 0 &&
                      item.pagemap?.cse_image[0]?.src
                    }
                    alt=""
                    className="resultImage"
                  />
                }
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Images;
