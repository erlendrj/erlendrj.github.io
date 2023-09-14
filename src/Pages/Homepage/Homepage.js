import React, { useEffect, useState } from "react";
import "./Homepage.css";
import Player from "../../Components/Player/Player";
import Pagination from "../../Components/Pagination/Pagination";
import axios from "axios";
import logoColor from "./logo-color.png";
import Loading from "../../Components/Loading/Loading";

function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [prodPerPage, setProdPerPage] = useState(10);

  const [players, setPlayers] = useState([]);

  const getPlayers = async () => {
    await axios
      .get("https://tb-sjakk-back.onrender.com/getPlayers")
      .then((res) => {
        setPlayers(res.data);
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };

  /**UseEffect is called on page load, in this hook, the players are retrieved from the backend. */
  useEffect(() => {
    document.title = "TB Sjakk";
    getPlayers();
  }, []);

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  /*The three consts below are used to calculate the number of pages to be visible in the table */
  const indexOfLastProduct = currentPage * prodPerPage;
  const indexOfFirstProduct = indexOfLastProduct - prodPerPage;
  const currentPlayers =
    players && players.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="home">
      <div className="main-home">
        <div className="title">
          <img src={logoColor} className="logo" />
        </div>
        <table>
          <thead className="header">
            <td>First name</td>
            <td>Last name</td>
            <td>Bullet</td>
            <td>Blitz</td>
            <td>Rapid</td>
          </thead>
          {currentPlayers &&
            currentPlayers.map((player) => {
              return <Player player={player} />;
            })}
        </table>
      </div>
      <div className="paginationSelectPage">
        {
          <Pagination
            productsPerPage={prodPerPage}
            totalProducts={15}
            paginate={paginate}
          />
        }

        <div className="selectDiv">
          <select
            className="select"
            value={prodPerPage}
            onChange={(e) => setProdPerPage(e.target.value)}
          >
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
            <option>25</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
