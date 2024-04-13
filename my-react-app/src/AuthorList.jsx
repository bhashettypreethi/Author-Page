import React, { useState, useEffect } from "react";
import axios from "axios";

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios
      .get("/authors")
      .then((response) => {
        setAuthors(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching authors", error));
  }, []);
  // console.log(response.data);
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        You have {authors.length} Team Members
      </h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {authors.map((author) => (
          <li
            key={author.name}
            style={{
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          >
            <img
              src="logo512.png"
              alt="image"
              width="50px"
              style={{ borderRadius: "50%" }}
            />
            <div style={{ display: "inline-block", marginLeft: "10px" }}>
              <h3 style={{ margin: 0 }}>{author.name}</h3>
              <p style={{ margin: 0 }}>{author.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AuthorList;
