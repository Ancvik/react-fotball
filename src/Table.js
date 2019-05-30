import React from "react"
import './Table.css';
class Table extends React.Component{
    render(){
        console.log(this.props.teams)
        const teamRows = this.props.teams.map((team)=> {
            return <tr>
                        <td>{team.place}. {team.name}</td>
                        <td>{team.played}</td>
                        <td>{team.won}</td>
                        <td>{team.draw}</td>
                        <td>{team.lost}</td>
                        <td>{team.goalDifference}</td>
                        <td>{team.points}</td>
                    </tr>
        })
        return(
        <table>
            <thead>
                <tr>
                    <th colSpan="7">Eliteserien 2019</th>

                </tr>
                <tr>
                    <th>Lag</th>
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