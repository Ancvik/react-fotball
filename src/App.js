import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Table from "./Table"
import Team from "./Team"
import TeamPage from "./TeamPage"
import Match from "./Match"
import StatsForMatch from "./StatsForMatch"
import Analyse from "./Analyse"
import SimulatedMatch from "./SimulatedMatch"

class App extends React.Component {

  render(){

    return (
      
      <Router>
          <Route path="/" exact component={Table} />
          <Route path="/team/:teamId" component={Team} />
          <Route path="/team-test/:teamId" component={TeamPage} />
          <Route path="/match/:matchId" component={Match} />
          <Route path="/matchstats/:matchId" component={StatsForMatch} /> 
          <Route path="/simulatedTable" component={Analyse} /> 
          <Route path="/simulatedMatch/:matchId" component={SimulatedMatch} /> 
      </Router>
    );
  }
}

export default App;