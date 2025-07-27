import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

import drawImg from "../assets/draw.png";
import gutImg from "../assets/gut.png";
import graffitiImg from "../assets/graffiti.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="title-block">
        <h1 className="brand-name">unfiltered.</h1>
        <p className="tagline">draw it. write it. feel it. anonymously.</p>
      </div>

      <div className="home-buttons-row">
        <img
          src={drawImg}
          alt="Draw Yourself"
          className="icon-button"
          onClick={() => navigate("/portrait")}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && navigate("/portrait")}
        />
        <img
          src={gutImg}
          alt="Gut Check"
          className="icon-button"
          onClick={() => navigate("/gut")}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && navigate("/gut")}
        />
        <img
          src={graffitiImg}
          alt="Graffiti Zone"
          className="icon-button"
          onClick={() => navigate("/graffiti")}
          role="button"
          tabIndex={0}
          onKeyDown={e => e.key === "Enter" && navigate("/graffiti")}
        />
      </div>
    </div>
  );
}
