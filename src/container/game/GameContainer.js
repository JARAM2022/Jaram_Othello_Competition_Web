import React from "react";

import Othello from "./Othello";
import RoomInfo from "./RoomInfo";

const GameContainer = ({ socket, room_info, game_info }) => {
  /**
   * room_info :
   * {
   *     room_id,
   *     room_status,
   *     player[[id,isready]...],
   *     spectator[...]
   * }
   * game_info :
   * {
   *     room_id,
   *     player[[id,isready]...],
   *     turn,
   *     board[8][8]
   * }
   */
  return (
    <div>
      <h1>
        room_id : {room_info.room_id}
      </h1>
      <Othello socket={socket} {...game_info} />
      <RoomInfo socket={socket} {...room_info} turn={game_info.turn}/>
    </div>
  );
};

export default GameContainer;