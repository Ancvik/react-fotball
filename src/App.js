import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Table from "./Table"
import Team from "./Team"
import Match from "./Match"

class App extends React.Component {

  render(){
   

    return (
      <Router>
        <div>
          <div className="App-header">
         
          <Route path="/" exact component={Table} />
          <Route path="/team/:teamId" component={Team} />
          <Route path="/match/:matchId" component={Match} />

          
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
