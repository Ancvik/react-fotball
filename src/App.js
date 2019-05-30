import React from 'react';
import './App.css';
import Table from "./Table"

const numberOfTeams = 16;
const teams = [{"name": "Rosenborg", "position": 12} , {"name": "Stabæk", "position": 11}];
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      teams: []
    }
  }
  componentDidMount() {
    const fetchedTeams = fetch("https://api.nifs.no/stages/679874/table/")
      .then(function(response){
        return response.json()
      })
      .then(data => this.setState({teams: data.teams}))
  }
  render(){
    const sortedTeams = this.state.teams.sort((team1, team2) => {
      return team1.position - team2.position
    })
    const teamsList = sortedTeams.map((team) => {
      return <li>{team.name}</li>
    })
    return (
      <div>
        <header className="App-header">
        <Table teams={sortedTeams}/>


        
        </header>
      </div>
    );
  }
}

export default App;
