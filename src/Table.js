import React from "react"
import {Link} from "react-router-dom";
import './Table.css';
class Table extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch("https://api.nifs.no/stages/679874/table/")
            .then(function(response){
                return response.json()
            })
            .then(data => this.setState({teams: data.teams}))
    }

    render(){

        const sortedTeams = this.state.teams.sort((team1, team2) => {
            return team1.position - team2.position
          })
        const teamRows = sortedTeams.map((team)=> {
            return <tr>
                        <td>{team.place}.  <Link to={`/team/${team.id}`} className ="LinkColor">{team.name}</Link> </td>
                        <td className="tabellverdier">{team.played}</td>
                        <td className="tabellverdier">{team.won}</td>
                        <td className="tabellverdier">{team.draw}</td>
                        <td className="tabellverdier">{team.lost}</td>
                        <td className="tabellverdier">{team.goalDifference}</td>
                        <td className="tabellverdier">{team.points}</td>
                    </tr>
        })
        return(
        <table className="tableEliteserien">
            <thead>
                <tr>
                    <th colSpan="7">Eliteserien 2019</th>

                </tr>
                <tr>
                    <th className="Lag">Lag</th>
                    <th>K</th>
                    <th>S</th>
                    <th>U</th>
                    <th>T</th>
                    <th>Målforskjell</th>
                    <th>Poeng</th>
                </tr>
            </thead>
            <tbody>
                {teamRows}
            </tbody>
        </table>
        )
    }

}
export default Table;