import React from 'react'
import { Link } from "react-router-dom";
import Search from "../component/Search";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";

const Navbar = () => {
  return (
    <div className="result_header">
      <Link to="/">
        <img
          className="result_logo"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt=""
        />
      </Link>
      <div className="result_headerBody">
        <Search hideButtons />
        <div className="result_option">
          <div className="result_optionLeft">
            <div className="result_option">
              <SearchIcon />
              <Link to="/search">All</Link>
            </div>
            <div className="result_option">
              <DescriptionIcon />
              <Link to="/news">News</Link>
            </div>
            <div className="result_option">
              <ImageIcon />
              <Link to="/images">Images</Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar