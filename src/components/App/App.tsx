import "./App.css";
import stoneImage from "../../assets/stone.png";

function App() {
  return (
    <div id="app" className="container">
      <div className="item a">
        <h1 className="name">Ben&nbsp;Pettijohn</h1>
        {/* <p className="job-title">Software Engineer</p> */}
      </div>
      <div className="item b"></div>
      <div className="item c"></div>
      <div className="item d"></div>
      <div className="item e"></div>
      <div className="item f">
        <img alt="Employment History" src={stoneImage} />
      </div>
    </div>
  );
}

export default App;
