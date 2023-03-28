import { useState, useEffect, useRef } from "react";
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
  const [userSelect,setUserSelect] = useState({hair:0,color:0})
  const [hair,setHair] = useState(null);
  const [glasses,setGlasses] = useState(null);
  const [gradient,setGradient] = useState(null);
  const hairInput = useRef(null);
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
  const changeHair = () => {
    
  }
  const handleHair = () => {
    if(hair === 1){
      setHair(0)
    }
    else{
      setHair(1);
    }
  }
  const handleGlasses = () => {
    if(glasses === 1){
      setGlasses(0);
    }else{
      setGlasses(1);
    }
  }
  const handleGradient = () => {
    if(gradient === 1){
      setGradient(0)
    }else{
      setGradient(1)
    }
  }
  const changeAvatar = () => {
    if(hair === 1 && glasses === 1 && gradient === 1){
      setConfig(genConfig({ hairStyle: "mohawk" ,glassesStyle:"round",isGradient:true}));
    }
    if(hair === 1){
      setConfig(genConfig({hairStyle:"mohawk"}))
    }
    if(hair === 1 && glasses === 1){
      setConfig(genConfig({hairStyle:"mohawk",glassesStyle:"round"}))
    }
    if(hair === 1 && gradient === 1){
      setConfig(genConfig({hairStyle:"mohawk",isGradient:true}))
    }
    if(glasses === 1){
      console.log("Glasses")
      setConfig(genConfig({glassesStyle:"round"}))
    }
    if(gradient === 1){
      setConfig(genConfig({isGradient:true}))
    }
    if(glasses === 1 && gradient === 1){
      setConfig(genConfig({isGradient:true,glassesStyle:"round"}))
    }
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

<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleHair}/>
  <label class="form-check-label" for="flexSwitchCheckDefault">😊</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleGlasses}/>
  <label class="form-check-label" for="flexSwitchCheckDefault">🕶️</label>
</div>
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleGradient}/>
  <label class="form-check-label" for="flexSwitchCheckDefault">🟢🔵🔴</label>
</div>
        <button className="btn btn-success btn-lg" onClick={changeAvatar}>Randomize</button>
        <button className="btn btn-danger btn-lg" onClick={downloadAvatar}>Download</button>

      </div>
    </div>
  );
};

export default App;
