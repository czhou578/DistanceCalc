import React from "react";
import ColinPic from "./colin.jpg";

export default function About() {
  const styles = {
    color: "white",
    fontSize: "15px",
  };

  const styles2 = {
    marginTop: "50px",
    marginBottom: "10px",
    marginLeft: "30%",
  };

  const picStyle = {
    height: "300px",
    width: "500px",
    objectFit: "cover",
  };

  return (
    <div style={styles2}>
      <h1 style={styles}>About the maker: Colin Zhou</h1>
      <p style={styles}>
        Colin Zhou is a Canadian American designer of Chinese descent who loves
        making responsive web applications. <br></br>He is excited to present
        this easy to use calculator for the benefit of the public.
      </p>
      <div className="pic">
        <img src={ColinPic} alt="" style={picStyle} />
      </div>
    </div>
  );
}
