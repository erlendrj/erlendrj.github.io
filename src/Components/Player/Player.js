import React, { useEffect } from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./player.css";

function Player({ player }) {
  /* These values are gotten from the player-parameter sent from the homepage-file */
  let { player_id, firstname, lastname, blitz, rapid, bullet } = player;

  return (
    <tbody>
      <tr>
        <td>
          {/**Bot first and last name is a link to the statistics page, and will use the player_id from the
           * database to determine what data to display.
           */}
          <a href={`/statistics/${player_id}`}>{firstname}</a>
        </td>
        <td>
          <a href={`/statistics/${player_id}`}>{lastname}</a>
        </td>
        <td>{bullet}</td>
        <td>{blitz}</td>
        <td>{rapid}</td>
      </tr>
    </tbody>
  );
}

export default Player;
