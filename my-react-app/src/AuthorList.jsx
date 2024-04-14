import React, { useState, useEffect } from "react";
import axios from "axios";
// const myFunction = require("../netlify/functions/getAuthors");

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios
      .get("/.netlify/functions/getAuthors")
      .then((response) => {
        setAuthors(JSON.parse(response.data));
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching authors", error));
  }, []);
  console.log("hello");
  const handleDelete = (id) => {
    axios
      .delete(`/.netlify/functions/getAuthors/${id}`)
      .then(() => {
        setAuthors(authors.filter((author) => author.id !== id));
      })
      .catch((error) => console.error("Error deleting author", error));
  };
  // console.log(response.data);
  return (
    <div
      style={{
        padding: "20px 20px 5px 20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "600px",
        margin: "auto",
        marginBottom: "5px",
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          src="backArrow.png"
          alt="BackArrow"
          width="30px"
          height="30px"
          style={{ paddingTop: "10px" }}
        />
        <h4
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginLeft: "150px",
          }}
        >
          You have {authors.length} Team Members
        </h4>
      </div>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {authors.map((author) => (
          <li
            key={author.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              // border: "1px solid #ccc",
              // borderRadius: "5px",
              position: "relative", // Add this to position the icon
              borderBottom: "1px solid #f0f0f0", // Add this line for line separation
              // boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              // maxWidth: "600px", // Adjust the max width as needed
              // margin: "auto", // Center the box horizontally
            }}
          >
            <img
              src="ProfilePicture.png"
              alt="ProfilePicture"
              width="50px"
              style={{ borderRadius: "50%" }}
              marginLeft="25px"
            />
            <div style={{ display: "inline-block", marginLeft: "20px" }}>
              <h4
                style={{
                  margin: 0,
                  fontWeight: "bold",
                  padding: "5px 0px 5px 0px",
                }}
              >
                {author.name}
              </h4>
              <p
                style={{
                  margin: 0,
                  padding: "5px 0px 5px 0px",
                  color: "#4e616b",
                }}
              >
                {author.email}
              </p>
            </div>
            <button
              onClick={() => handleDelete(author.id)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                borderRadius: "50%",
                width: "25px",
                height: "25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "white",
                // backgroundColor: "#a0adb4",
                margin: "25px 30px 0px 0px",
                // transform: "translate(50%, -50%)",
              }}
            >
              <img src="CloseIcon.png" alt="CloseIcon" width="30px"></img>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default AuthorList;
