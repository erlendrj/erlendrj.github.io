import React, { useState, useEffect } from "react";
import "./Admin.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";

function Admin() {
  const [members, setMembers] = useState(0);
  const [newUser, setNewUser] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [hover, setHover] = useState("black");

  const [playerNames, setPlayerNames] = useState([]);

  /** Hooks for adding new chess player */
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [title, setTitle] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [userNameChess, setUserNameChess] = useState("");
  const [userNameLi, setuserNameLi] = useState("");

  /** Hooks for adding new game */
  const [whiteName, setWhiteName] = useState(playerNames[1]);
  const [blackName, setBlackName] = useState(playerNames[1]);
  const [tournament, setTournament] = useState("7");
  const [result, setResult] = useState("W");
  const [date, setDate] = useState("");
  const [format, setFormat] = useState("Blitz");
  const [timeFormat, setTimeFormat] = useState("3I2");

  const [tournamentsID, setTournamentsID] = useState([]);
  const [newTourney, setNewTourney] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [name, setName] = useState("");
  const [locationTourney, setLocationTourney] = useState("");

  /**Gets the number of players currently in the club, and gets a list of all names, both first and last name.  */
  const getMembers = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/getNumberPlayers"
    );
    setMembers(res.data);
    const response = await axios.get(
      "https://tb-sjakk-back.onrender.com/getPlayerNames"
    );
    setPlayerNames(response.data);
  };

  const getByDate = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/getNumberByDate"
    );
    console.log(res.data);
  };

  const getTournaments = async () => {
    const res = await axios.get(
      "https://tb-sjakk-back.onrender.com/getTournaments"
    );
    setTournamentsID(res.data);
  };

  const addGame = async () => {
    setNewGame(false);
    const requestOptions = {
      method: "POST",
      data: {
        white_name: whiteName,
        black_name: blackName,
        date: date,
        format: format,
        timeFormat: timeFormat,
        result: result,
        tournament: tournament,
      },
    };
    await axios(
      "https://tb-sjakk-back.onrender.com/addGame",
      requestOptions
    ).then((resp) => {
      console.log(resp.data);
    });
  };

  /**This function uses a POST method, such that the admin can add new players to the club. The parameters are gotten from the input fields.  */
  const addUser = async () => {
    setNewUser(false);
    const requestOptions = {
      method: "POST",
      data: {
        Firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        title: title,
        birthdate: birthdate,
        location: location,
        picture_url: picture,
        userChess: userNameChess,
        userLi: userNameLi,
      },
    };
    await axios("https://tb-sjakk-back.onrender.com/addUser", requestOptions);
  };

  const addTournament = async () => {
    setNewTourney(false);
    const requestOptions = {
      method: "POST",
      data: {
        startDate: startDate,
        endDate: endDate,
        name: name,
        location: location,
      },
    };
    await axios(
      "https://tb-sjakk-back.onrender.com/addTournament",
      requestOptions
    );
  };

  useEffect(() => {
    getMembers();
    getTournaments();
    getByDate();
  }, []);

  return (
    <div className="admin-main">
      <div className="admin-navbar">
        <span>Overview</span>
        <span onClick={() => setNewUser(true)}>Add User</span>
        <span onClick={() => setNewGame(true)}>Add Game</span>
        <span onClick={() => setNewTourney(true)}>Add Tournement</span>
      </div>
      <div className="data-admin-container">
        <div className="data-admin members">
          <h1>{members}</h1>
          <h1>Active Members</h1>
        </div>
        <div className="data-admin members">
          <h1>{members}</h1>
        </div>
        <div className="data-admin members">
          <h1>{members}</h1>
        </div>
      </div>
      {/**If add user is clicked, the form to enter information changes classname
       * and will be displayed on screen
       */}
      <div className={newUser ? " new-data newUser" : "d-none"}>
        <span className="close-div">
          <CloseIcon
            color={hover}
            onMouseOver={() => setHover("warning")}
            onMouseOut={() => setHover("black")}
            onClick={() => setNewUser(false)}
          />
        </span>

        <h2>Create new player</h2>
        <input
          type="text"
          className="admin-input"
          name="firstname"
          placeholder="firstname"
          required="true"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="lastname"
          placeholder="lastname"
          required="true"
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="nickname"
          placeholder="nickname"
          required="true"
          onChange={(e) => setNickname(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="title"
          placeholder="title"
          required="true"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="admin-input"
          name="title"
          placeholder="title"
          required="true"
          onChange={(e) => setBirthdate(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="location"
          placeholder="location"
          required="true"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="picture"
          placeholder="picture url"
          onChange={(e) => setPicture(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="username_chess"
          placeholder="username chess.com"
          onChange={(e) => setUserNameChess(e.target.value)}
        />
        <input
          type="text"
          className="admin-input"
          name="username_lichess"
          placeholder="username lichess"
          onChange={(e) => setuserNameLi(e.target.value)}
        />
        <button className="btn-add" onClick={() => addUser()}>
          Add User
        </button>
      </div>
      {/**Displays add new game if new game in menu is clicked */}
      <div className={newGame ? " new-data newGame" : "d-none"}>
        <span className="close-div">
          <CloseIcon
            color={hover}
            onMouseOver={() => setHover("warning")}
            onMouseOut={() => setHover("black")}
            onClick={() => setNewGame(false)}
          />
        </span>
        <h2>Add new game</h2>
        <div className="newGame-select">
          <PersonIcon style={{ color: "#D0BD87" }} fontSize="large" />
          <select onChange={(e) => setWhiteName(e.target.value)}>
            {playerNames.map((player) => {
              return <option>{player}</option>;
            })}
          </select>
          <h2>VS</h2>
          <select onChange={(e) => setBlackName(e.target.value)}>
            {playerNames.map((player) => {
              return <option>{player}</option>;
            })}
          </select>
          <PersonIcon fontSize="large" />
        </div>
        <div className="newGame-information">
          <div className="newGame-info">
            <select onChange={(e) => setTournament(e.target.value)}>
              {tournamentsID.map((tournament) => {
                return <option>{tournament}</option>;
              })}
            </select>
            <input
              type="date"
              className="admin-input"
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="newGame-info">
            <input
              type="text"
              placeholder="Format"
              className="admin-input"
              onChange={(e) => setFormat(e.target.value)}
            />
            <input
              type="text"
              placeholder="Time Format"
              className="admin-input"
              onChange={(e) => setTimeFormat(e.target.value)}
            />
          </div>
          <div className="newGame-info">
            <select onChange={(e) => setResult(e.target.value)}>
              <option>W</option>
              <option>D</option>
              <option>B</option>
            </select>
          </div>
          <button className="btn-add" onClick={() => addGame()}>
            Submit
          </button>
        </div>
      </div>
      <div className={newTourney ? "new-data newTourney" : "d-none"}>
        <span className="close-div">
          <CloseIcon
            color={hover}
            onMouseOver={() => setHover("warning")}
            onMouseOut={() => setHover("black")}
            onClick={() => setNewTourney(false)}
          />
        </span>
        <h1>Add new tournament</h1>
        <div className="newGame-info">
          <div className="block-d">
            <label for="start-date">Start date:</label>
            <input
              type="date"
              className="admin-input"
              name="start-date"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label for="end-date">End date:</label>
            <input
              type="date"
              name="end-date"
              className="admin-input"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div>
            <input
              className="admin-input"
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="admin-input"
              type="text"
              placeholder="Location"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-add" onClick={() => addTournament()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Admin;
