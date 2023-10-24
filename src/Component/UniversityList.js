import { Fragment, useState } from "react";

import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { changeSort } from "../Store/Slices/collegeListSlice";
import ModelForm from "./ModelForm";

import './UniversityList.css'

const UniversityList = ({ collegeList }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const itemsPerPage = 10;
  const formData = {
    name: "",
    country: "",
    web_pages: "",
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const searchData =
    collegeList.filter(
      (obj) =>
        obj.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        obj.country.toLowerCase().includes(searchInput.toLowerCase())
    ) || collegeList;
  const currentItems = searchData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <Fragment>
      <div className="topBar">
        <text>To Add More Data</text>
        <ModelForm listObject={formData} usage="Add" />
      
      <input
      className="search"
        type="text"
        placeholder="Search here"
        onChange={handleSearchChange}
        value={searchInput}
      />
      </div>
      <table>
        <tr>
          <th onClick={() => dispatch(changeSort("name"))}>NAME</th>
          <th onClick={() => dispatch(changeSort("country"))}>Country</th>
          <th>Link</th>
        </tr>
        {currentItems.map((listObject, index) => (
          <tr key={index}>
            <td>{listObject.name}</td>
            <td>{listObject.country}</td>
            <td>
              <button
                type="button"
                value="Visit"
                onClick={() => window.open(listObject.web_pages, "_blank")}
              >
                Visit
              </button>
            </td>
            <td>
              <ModelForm listObject={listObject} usage="Edit" />
            </td>
          </tr>
        ))}
      </table>
      <Pagination
        totalItems={searchData.length - 1}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Fragment>
  );
};

export default UniversityList;
