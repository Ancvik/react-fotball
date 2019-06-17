import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Table from "./Table"
import Team from "./Team"
import Match from "./Match"
import StatsForMatch from "./StatsForMatch"

class App extends React.Component {

  render(){

    return (
      <Router>
        <div className="App-header">
          <h1 className="Overskrift">Stian sin fotballside</h1>
          <div className="App-body">
          <Route path="/" exact component={Table} />
          <Route path="/team/:teamId" component={Team} />
          <Route path="/match/:matchId" component={Match} />
          <Route path="/matchstats/:matchId" component={StatsForMatch} /> 
          <ul className="info">
              <li className="info">djad dsas da fasf afsf </li>
            </ul>      
         
        </div>

        </div>
      </Router>
    );
  }
}

export default App;
