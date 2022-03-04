import React, { useState } from "react";
import { getVideosByCategory } from "../../store/actions/videoActions";
import "./_categoriesbar.scss";
import { useDispatch } from "react-redux";

const keywords = [
  "All",
  "JavaScript",
  "Computer Programming",
  "Crypto",
  "Football",
  "Marty Shwartz",
  "Hip Hop",
  "Workout",
  "Guitar",
  "Podcast",
  "React JS",
  "Psychology",
];
const CategoriesBar = () => {
  const [active, setActive] = useState("All");
  const dispatch = useDispatch();

  const handleCategoryClick = (value) => {
    setActive(value);
    dispatch(getVideosByCategory(value));
  };

  return (
    <div className="categoriesbar">
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={() => handleCategoryClick(value)}
          className={active === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
