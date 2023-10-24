import "./App.css";
import { useEffect } from "react";
import { fetchCollegeList } from "./Store/Slices/collegeListSlice";
import { useDispatch, useSelector } from "react-redux";
import UniversityList from "./Component/UniversityList";

function App() {
  const { collegeList, collegeListLoading } = useSelector(
    (state) => state.collegeList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCollegeList());
  }, []);

  useEffect(() => {
    dispatch(fetchCollegeList());
    if (localStorage.getItem("bg") === null) {
      localStorage.setItem("bg", "silver lime aqua bisque cyan teal");
    } else {
      const colorArray = localStorage.getItem("bg").split(" ");
      const colorToBeDisplayed = colorArray.shift();
      document.body.style.backgroundColor = colorToBeDisplayed;
      colorArray.push(colorToBeDisplayed);
      localStorage.setItem("bg", colorArray.join(" "));
    }
  }, []);

  return (
    <div className="App">
      {!collegeListLoading ? (
        <UniversityList collegeList={collegeList} />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default App;
