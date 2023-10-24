import { useState } from "react";

import "./ModelForm.css";
import { useDispatch } from "react-redux";
import {
  addCollegeList,
  editCollegeList,
} from "../Store/Slices/collegeListSlice";

const ModelForm = ({ listObject, usage }) => {
  const [formData, setFormData] = useState(null);
  const [formErrors, setFormErrors] = useState({
    name: "",
    country: "",
    web_pages: "",
  });

  const dispatch = useDispatch();

  const changeFormData = (obj) => {
    setFormData(obj);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "name") {
      setFormErrors({
        ...formErrors,
        name:
          value.length < 8
            ? `Name require ${8 - value.length} more letters`
            : "",
      });
    }

    if (name === "country") {
      setFormErrors({
        ...formErrors,
        country: !/^[A-Za-z]+$/.test(value)
          ? "Please enter a valid country name"
          : "",
      });
    }

    if (name === "web_pages") {
      setFormErrors({
        ...formErrors,
        web_pages:
          !/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/.test(
            value
          )
            ? "Please enter a valid URL"
            : "",
      });
    }
  };

  const allKeysEmpty = Object.values(formErrors).every((value) => value === "");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!formData.name || !formData.country || !formData.web_pages) {
      setFormErrors({
        ...formErrors,
        name: !formData.name ? "Name is required" : "",
        country: !formData.country ? "Country is required" : "",
        web_pages: !formData.web_pages ? "URL is required" : "",
      });
    } else if (allKeysEmpty) {
      usage === "Edit"
        ? dispatch(editCollegeList({ name: listObject.name, newObj: formData }))
        : dispatch(addCollegeList(formData));
      setFormData(null);
    }
  };

  return (
    <div className="form">
      <button className="formButton" onClick={() => changeFormData(listObject)}>
        {usage}
      </button>
      {formData && (
        <div className="tooltip">
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            {formErrors.country && (
              <span className="error">{formErrors.country}</span>
            )}
            <label htmlFor="url">URL:</label>
            <input
              type="url"
              id="web_pages"
              name="web_pages"
              value={formData.web_pages}
              onChange={handleChange}
            />
            {formErrors.web_pages && (
              <span className="error">{formErrors.web_pages}</span>
            )}
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
            <button type="submit" onClick={() => setFormData(null)}>
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModelForm;
