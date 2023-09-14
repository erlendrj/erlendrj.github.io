import React from "react";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import "./Tournaments.css";

export default function TournamentInd({ playerList }) {
  return (
    <table>
      <thead>
        <tr>
          <td className="table-head-td">Ranking</td>
          <td className="table-head-td">Name</td>
          <td className="table-head-td">Wins</td>
          <td className="table-head-td">Draws</td>
          <td className="table-head-td">Losses</td>
          <td className="table-head-td">Score</td>
        </tr>
      </thead>
      <tbody>
        {playerList.map((item, index) => {
          return (
            <>
              <tr>
                <td style={{ textAlign: "center" }}>
                  {index + 1 == 1 ? (
                    <EmojiEventsIcon
                      style={{ color: "FFD700" }}
                      fontSize="large"
                    />
                  ) : index + 1 == 2 ? (
                    <EmojiEventsIcon
                      style={{ color: "C0C0C0" }}
                      fontSize="medium"
                    />
                  ) : index + 1 == 3 ? (
                    <EmojiEventsIcon
                      style={{ color: "CD7F32" }}
                      fontSize="small"
                    />
                  ) : (
                    index + 1
                  )}
                </td>
                <td key={index + 1}>{item.player}</td>
                <td key={index + 2}>{item.wins}</td>
                <td key={index + 3}>{item.draws}</td>
                <td key={index + 4}>{item.losses}</td>
                <td key={index + 5}>{item.score}</td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}
