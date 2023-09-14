import React, { useEffect, useState } from "react";
import axios from "axios";
import TournamentInd from "./TournamentInd";
import "./Tournaments.css";
import Loading from "../../Components/Loading/Loading";

export default function Tournament() {
  const [data, setData] = useState([]);
  const [tourneyInfo, setTourneyInfo] = useState([]);
  const [error, setError] = useState("");
  const getTournaments = async () => {
    await axios
      .get("https://tb-sjakk-back.onrender.com/getTournamentResults")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
        getTourneyInfo();
      })
      .catch((err) => {
        setError(err);
      });
  };

  const getTourneyInfo = async () => {
    await axios("https://tb-sjakk-back.onrender.com/getTourneyInfo")
      .then((res) => {
        setTourneyInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTournaments();
  }, []);
  return (
    <div className="main-tourney">
      {data.length == 0 ? (
        <Loading />
      ) : (
        <div>
          {data.map((player, index) => {
            return (
              <div>
                <h1>{tourneyInfo[index]}</h1>
                <TournamentInd key={index} playerList={player} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
