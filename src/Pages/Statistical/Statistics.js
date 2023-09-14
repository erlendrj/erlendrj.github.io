import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "./Statistics.css";
import axios from "axios";

function Statistics() {
  const [matchCount, setMatchCount] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [data, setData] = useState([]);
  const [wins, setWins] = useState([]);
  const [losses, setLosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [winRate, setWinRate] = useState(0);

  const [players, setPlayers] = useState([]);

  let { id } = useParams();

  let navigate = useNavigate();

  /**Gets the player ratings from the backend in an asynchronous call */
  const getPlayerRatings = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/playerStats/" + id
    );
    if (data.length == 0) {
      setData(res.data);
    } else {
      setData([]);
      setData(res.data);
      console.log("Data is: " + res.data);
    }
  };

  const getPlayers = async () => {
    const response = await axios.get(
      "https://tb-sjakk-back.onrender.com/getPlayerNames"
    );
    setPlayers(response.data);
  };

  /**Gets the matches with player_id = id where this player has won the game*/
  const getWins = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/getWins/" + id
    );
    setWins(res.data);
  };

  const getLosses = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/getLosses/" + id
    );
    setLosses(res.data);
  };

  /* Calculates the number of matches (x-axis of line graph), based on the number of  */
  function amountOfMatches() {
    for (let i = 1; i <= data.length; i++) {
      setMatchCount((oldArray) => [...oldArray, i]);
    }
  }

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
      navigate("/statistics/" + resp.data);
      navigate(0);
      getPlayerRatings();
    });
  };

  /**Updates the title of the tab as well as running the function for retrieving ratings */
  useEffect(() => {
    document.title = "TB Sjakk - Statistics";
    getPlayerRatings();
    getPlayers();
  }, []);

  /**Sorts the table based on game_id, and adds to new state/array */
  useEffect(() => {
    data.sort((a, b) => (a.game_id > b.game_id ? 1 : -1));

    amountOfMatches();
    getWins();
    getLosses();
    for (let i = 0; i < data.length; i++) {
      /**Copies the old array and appends new data to the end of of the state */
      setRatings((old) => [...old, data[i].rating]);
    }

    setWinRate(((wins[0] + wins[1]) / data.length) * 100);

    /**Avoids render until all data is loaded */
    setLoading(false);
  }, [data, players]);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  /**Makes data ready for line chart */
  const state = {
    labels: matchCount,
    datasets: [
      {
        label: "Rating",
        fill: false,
        lineTension: 0.2,
        backgroundColor: "#CFBC88",
        borderColor: "rgb(0, 0, 0, 1)",
        borderWidth: 3,
        data: ratings,
      },
    ],
  };

  /**Settings for Bar chart displaying losses */
  const optionsBarLosses = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
      title: {
        display: true,
        text: "Black vs White Losses",
      },
    },
  };

  /**Settings for the wins per black and white pieces */
  const optionsBarWins = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: true,
      },
      title: {
        display: true,
        text: "Black vs White Wins",
      },
    },
  };

  /**Data for det bar chart displaying wins per black and white pieces */
  const dataForBarLosses = {
    labels: ["Black", "White"],
    datasets: [
      {
        label: ["Black, White"],
        data: [losses[0], losses[1]],
        backgroundColor: ["rgba(10,10,10,1)", "#CFBC88"],
        BorderColor: "rgba(10,10,10,1)",
        borderWidth: 1,
      },
    ],
  };

  /**Data for det bar chart displaying wins per black and white pieces */
  const dataForBarWins = {
    labels: ["Black", "White"],
    datasets: [
      {
        label: ["Black, White"],
        data: [wins[0], wins[1]],
        backgroundColor: ["rgba(10,10,10,1)", "#CFBC88"],
        BorderColor: "rgba(10,10,10,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="main-stats">
      {/**Here it waits for the calls to the backend to be done, before rendering the full view of the page */}
      {loading ? (
        <div>Loading....</div>
      ) : (
        <div>
          <div className="select-div">
            <h1>Select a player to view the statistics</h1>
            <select
              onChange={(e) => getPlayerId(e.target.value)}
              style={{ color: "#FFF" }}
            >
              <option>--Please choose an option--</option>
              {players.map((player) => {
                return <option>{player}</option>;
              })}
            </select>
          </div>

          <div className="charts-part">
            <div className="charts">
              <Bar
                options={optionsBarWins}
                data={dataForBarWins}
                style={{ height: "600px" }}
              />
            </div>
            <div className="charts">
              <Bar options={optionsBarLosses} data={dataForBarLosses} />
            </div>
            <div className="charts win">
              <h1>Win rate: {winRate}%</h1>
            </div>
          </div>
          <div className="line-chart">
            <Line
              data={state}
              options={{
                title: {
                  display: true,
                  text: "Rating overview",
                  fontSize: 20,
                },
                scales: {
                  x: {
                    grid: {
                      color: "rgb(0,0,0)",
                      borderColor: "black",
                    },
                    ticks: {
                      color: "black",
                      beginAtZero: true,
                    },
                  },
                  y: {
                    grid: {
                      color: "rgb(0,0,0)",
                      borderColor: "black",
                    },
                    ticks: {
                      color: "black",
                      beginAtZero: true,
                    },
                  },
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Statistics;
