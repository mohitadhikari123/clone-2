import React, { useEffect, useState } from "react";
import "./Result.css";
import { useStateValue } from "../StateProvider/StateProvider";
// import useGoogleSearch from "../useGoogleSearch";
import Navbar from "../component/Navbar";
import { getData } from "./News";

function Images() {
  const [{ term = "tesla" }, dispatch] = useStateValue();
  //  const inputValue = window.localStorage.getItem("Input");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const inputValue = window.localStorage.getItem("Input");
      const result = await getData(inputValue);
      setData(result);
    };

    fetchData();
  }, []);

  // Function to handle image loading error
  const handleImageError = (event) => {
    event.target.style.display = "none"; // Hide the image if it fails to load
  };

  return (
    <>
      <div className="result">
        <Navbar />
        <div className="result_searchPage">
          {data?.news.map((item, index) => (
            <div className="searchPage_result" key={item.id || index}>
              {item.image && (
                <img
                  src={item.image}
                  width={486}
                  height={243}
                  alt=""
                  className="resultImage"
                  onError={handleImageError}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Images;
