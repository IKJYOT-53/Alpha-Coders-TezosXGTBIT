import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Avatar,{genConfig} from "react-nice-avatar";
import { buyTicketOperation, endGameOperation } from "./utils/operation";
import { fetchStorage } from "./utils/tzkt";
import { async } from "q";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
const App = () => {
  // Players holding lottery tickets
  const [players, setPlayers] = useState([]);
  const [tickets, setTickets] = useState(5);
  const [loading, setLoading] = useState(false);
  const [config,setConfig] = useState(null);
  // Set players and tickets remaining
  useEffect(() => {
    // TODO 9 - Fetch players and tickets remaining from storage
    (async () => {
      const storage = await fetchStorage();
      setPlayers(Object.values(storage.players));
      setTickets(storage.tickets_available);
    })();
  }, []);

  // TODO 7.a - Create onBuyTicket
  const onBuyTicket = async () => {
    try {
      setLoading(true);
      await buyTicketOperation();
      alert("Transaction succesful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };

  // TODO 11.a - Create onEndGame
  const onEndGame = async () => {
    try {
      setLoading(true);
      await endGameOperation();
      alert("Transaction succesful!");
    } catch (err) {
      alert(err.message);
    }
    setLoading(false);
  };
  const changeAvatar = () => {
    setConfig(genConfig())
    console.log(config)
  }
  // Download Avatar
  // const downloadAvatar = async () => {
  //   const scale = 2;
  //   const node = document.getElementById("avatar");
  //   if (node) {
  //     const blob = await domtoimage.toBlob(node, {
  //       height: node.offsetHeight * scale,
  //       style: {
  //         transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
  //         "border-radius": 0
  //       },
  //       width: node.offsetWidth * scale
  //     });

  //     saveAs(blob, "avatar.png");
  //   }
  // }
  const downloadAvatar = async () => {
    const scale = 2;
    const node = document.getElementById("avatar");
    console.log(node);
      if (node) {
      const blob = await domtoimage.toBlob(node, {
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale}) translate(${node.offsetWidth / 2 / scale}px, ${node.offsetHeight / 2 / scale}px)`,
          "border-radius": 0
        },
        width: node.offsetWidth * scale
      });

      saveAs(blob, "avatar.png");
    }
  }
  return (
    <div className="h-100">
      
      <Navbar />
      <div className="d-flex flex-column justify-content-center align-items-center h-100">
        {/* Ticket remaining display */}
        {/* List of Players */}
        {config ? 
        <Avatar style={{width:"20rem",height:"20rem"}} {...config} id="avatar"/>
       : <img src="https://cdn.pixabay.com/animation/2022/10/11/03/16/03-16-39-160_512.gif" />}
        <button className="btn btn-success btn-lg" onClick={changeAvatar}>Randomize</button>
        <button className="btn btn-danger btn-lg" onClick={downloadAvatar}>Download</button>
        <div className="mt-2">
          {players.map((player, index) => (
            <div key={index}>
              <b>Ticket {index + 1}:</b> {player}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
