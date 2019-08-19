import React from "react"
import {Link} from "react-router-dom";
import './Table.css';
class TableView extends React.Component{
    

    render(){

        const sortedTeams = this.props.teams.sort((team1, team2) => {
            return team2.points - team1.points
          })
        const teamRows = sortedTeams.map((team,index)=> {

        team.place = index + 1
        const teamName = this.props.includeLink ? <Link to={`/team/${team.id}`} className ="LinkColor">{team.name}</Link> : team.name
        if(team.place === 1){
            return <tr>
                        <td className="serielederLag">{team.place}. {teamName}</td>
                        <td className="serielederVerdier">{team.played}</td>
                        <td className="serielederVerdier">{team.won}</td>
                        <td className="serielederVerdier">{team.draw}</td>
                        <td className="serielederVerdier">{team.lost}</td>
                        <td className="serielederVerdier">{team.goalDifference}</td>
                        <td className="serielederVerdier">{team.points}</td>
                    </tr>
        }
        
        if(team.place === 2 || team.place === 3){
            return <tr>
                        <td className="europakvalikkLag">{team.place}.  {teamName} </td>
                        <td className="europakvalikkVerdier">{team.played}</td>
                        <td className="europakvalikkVerdier">{team.won}</td>
                        <td className="europakvalikkVerdier">{team.draw}</td>
                        <td className="europakvalikkVerdier">{team.lost}</td>
                        <td className="europakvalikkVerdier">{team.goalDifference}</td>
                        <td className="europakvalikkVerdier">{team.points}</td>
                    </tr>
        }

        if(team.place === 14){
            return <tr>
                        <td className="kvalikkLag">{team.place}.  {teamName} </td>
                        <td className="kvalikkVerdier">{team.played}</td>
                        <td className="kvalikkVerdier">{team.won}</td>
                        <td className="kvalikkVerdier">{team.draw}</td>
                        <td className="kvalikkVerdier">{team.lost}</td>
                        <td className="kvalikkVerdier">{team.goalDifference}</td>
                        <td className="kvalikkVerdier">{team.points}</td>
                    </tr>
        }
            
        if(team.place === 15 || team.place === 16){
            return <tr>
                        <td className="nedrykkLag">{team.place}.  {teamName} </td>
                        <td className="nedrykkVerdier">{team.played}</td>
                        <td className="nedrykkVerdier">{team.won}</td>
                        <td className="nedrykkVerdier">{team.draw}</td>
                        <td className="nedrykkVerdier">{team.lost}</td>
                        <td className="nedrykkVerdier">{team.goalDifference}</td>
                        <td className="nedrykkVerdier">{team.points}</td>
                    </tr>
        }
            return <tr>
                        <td>{team.place}.  {teamName} </td>
                        <td className="tabellverdier">{team.played}</td>
                        <td className="tabellverdier">{team.won}</td>
                        <td className="tabellverdier">{team.draw}</td>
                        <td className="tabellverdier">{team.lost}</td>
                        <td className="tabellverdier">{team.goalDifference}</td>
                        <td className="tabellverdier">{team.points}</td>
                    </tr>
        })
        return(
        <div className="App-body">
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
        <ul className="info">
                        <li className="info"> <span className="boks" style={{ backgroundColor: "green" }}></span> CL-Kvalikk</li>
                        <li className="info"> <span className="boks" style={{ backgroundColor: "lightgreen" }}></span> EL-Kvalikk</li>
                        <li className="info"> <span className="boks" style={{ backgroundColor: "lightcoral" }}></span> Kvalikk</li>
                        <li className="info"> <span className="boks"></span> Nedrykk</li>
                    </ul>
            </div>
        )
    }

}
export default TableView;