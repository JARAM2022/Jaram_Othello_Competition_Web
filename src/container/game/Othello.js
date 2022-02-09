import React from "react";
import { Grid } from '@mui/material';

import "./Othello.scss";

const Othello = ({ socket, room_id, player, turn, board , placeable}) => {
  // arr[8][8]
  
  const PutStone = (x, y) => {
    if (turn === socket.id) {
      for(let index = 0; index < placeable[0].length; index++){
        if((placeable[0][index][0] === x) && (placeable[0][index][1] === y)){
          socket.emit("put_stone", { index });
          return;
        }
      }
    }
  };
  return (
    <Grid container direction="column"alignItems="center" justifyContent="center" columns={2}>
      <Grid item xs={2}>
      <table className="Othello_table">
        <tbody>
          {board.map((i, idx) => {
            return (
              <tr key={idx}>
                {i.map((j, idx2) => {
                  return (
                    <td
                      onClick={() => PutStone(idx, idx2)}
                      className={"Othello_td board_color_" + ((idx + idx2) % 2)+" "}
                      key={idx2}>
                      <div
                        className={placeable.length > 0 ?
                           ((placeable[0].some(([x,y]) => x === idx && y === idx2 && turn === socket.id) ? "placeable" :"") +
                            (j === 0 ? "black" : "") +
                            (j === 1 ? "white" : "")):""
                        }
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      </Grid>
    </Grid>
  );
};

export default Othello;
