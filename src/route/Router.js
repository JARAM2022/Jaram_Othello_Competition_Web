import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import io from "socket.io-client";

import GameContainer from "container/game/GameContainer";
import RoomContainer from "container/room/RoomContainer";

import { API_URL } from "_variables.js";

const socket = io.connect(API_URL, { transports: ["websocket"] });

function Router() {
  const navigate = useNavigate();
  const location = useLocation();

  const [room_list, setRoomList] = useState([]);
  const [info, setInfo] = useState({
    room_info: { room_id: "", room_status: "", player: [], spectator: [] },
    game_info: { room_id: "", player: [], turn: "", board: [] },
  });

  useEffect(() => {
    if (location.pathname.startsWith("/game/")) {
      let room_id = location.pathname.replaceAll("/game/", "");
      socket.emit("join_room", { room_id });
    }
    console.log("useEffect");
    socket.on("command", (info) => {
      console.log("Server From Client : ", info);
      switch (info.command) {
        case "update_room":
          setRoomList(info.room_list);
          navigate("/room");
          break;
        case "room_info":
          setInfo({ room_info: info.room_info, game_info: info.game_info });
          navigate(`/game/${info.room_info.room_id}`);
          break;
        default:
          console.log("command not found", info.command);
      }
    });
  }, []);

  return (
    <div>
      <div> 내 ID : {socket.id} </div>
      <Routes>
        <Route
          path="/*"
          element={<RoomContainer socket={socket} room_list={room_list} />}
        />
        <Route
          path="/game/*"
          element={<GameContainer socket={socket} {...info} />}
        />
      </Routes>
    </div>
  );
}

export default Router;
