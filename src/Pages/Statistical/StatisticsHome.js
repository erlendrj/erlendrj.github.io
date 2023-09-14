import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Statistics.css";
import axios from "axios";

export default function StatisticsHome() {
  const [players, setPlayers] = useState([]);

  let navigate = useNavigate();

  /**Gets all the player names and adds to a state, which then can be used to create a list of players. */
  const getPlayers = async () => {
    const response = await axios.get(
      "https://tb-sjakk-back.onrender.com/getPlayerNames"
    );
    setPlayers(response.data);
  };

  /**On change og player in the select field, this method is called. Takes the name of the player, and looks up the id,
   * and routes to the player statistics page.
   */
  const getPlayerId = async (name) => {
    const requestOptions = {
      method: "POST",
      data: {
        name: name,
      },
    };
    await axios(
      "https://tb-sjakk-back.onrender.com/getIDofPlayer",
      requestOptions
    ).then((resp) => {
      console.log(resp.data);
      navigate("/statistics/" + resp.data);
    });
  };

  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <div className="main-stats main-home">
      <h1>Select a player to view the statistics</h1>
      <select onChange={(e) => getPlayerId(e.target.value)}>
        {players.map((player) => {
          return <option>{player}</option>;
        })}
      </select>
    </div>
  );
}
