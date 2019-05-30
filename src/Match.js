import React from "react"
import './Match.css';

class Match extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            teams: []
        }
    }
    
    componentDidMount() {
        fetch(`https://api.nifs.no/matches/${this.props.match.params.matchId}/headtohead/`)
            .then(function(response){
                return response.json()
            })
            .then(data => this.setState({teams: data.teams}))

    }
    render(){
        if(this.state.teams.length === 0){
            return null
        }
        const firstTeam = this.state.teams[0];
        const secondTeam = this.state.teams[1];
       return ( 
        <React.Fragment>
        <h2>Head to head mellom {firstTeam.name} og {secondTeam.name}</h2>       
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>{firstTeam.name}</th>
                        <th>Uavgjort</th>
                        <th>{secondTeam.name}</th>
                        <th>Mål</th>
                        <th>Målforskjell</th>
                    </tr>
                </thead>

            <tbody>
                <tr>
                    <th>Stadioen til {firstTeam.name} </th>
                    <td>{firstTeam.wonHome}</td>
                    <td>{firstTeam.drawnHome}</td>
                    <td>{firstTeam.lostHome}</td>
                    <td>{firstTeam.goalsForHome}  -  {firstTeam.goalsAgainstHome}</td>
                    <td>{firstTeam.goalsForHome - firstTeam.goalsAgainstHome}</td>
                </tr>
                <tr>
                    <th>Stadioen til {secondTeam.name} </th>
                    <td>{firstTeam.wonAway}</td>
                    <td>{firstTeam.drawnAway}</td>
                    <td>{firstTeam.lostAway}</td>
                    <td>{firstTeam.goalsForAway} - {firstTeam.goalsAgainstAway}</td>
                    <td>{firstTeam.goalsForAway - firstTeam.goalsAgainstAway}</td>
                </tr>
            </tbody>
        </table>
        </React.Fragment> 

        );
    }
}
    
export default Match;
    
