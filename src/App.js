import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Table from "./Table"
import Team from "./Team"

class App extends React.Component {

  render(){
   

    return (
      <Router>
        <div>
          <div className="App-header">
         
          <Route path="/" exact component={Table} />
          <Route path="/team/:teamId" component={Team} />

          
          </div>

        </div>
      </Router>
    );
  }
}

export default App;
