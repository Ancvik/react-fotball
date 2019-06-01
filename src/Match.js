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
            <table className="tabellHeadToHead">
                <thead>
                    <tr>
                        <td className="tabellHeadToHead"></td>
                        <th className="tabellHeadToHead">{firstTeam.name}</th>
                        <th className="tabellHeadToHead">Uavgjort</th>
                        <th className="tabellHeadToHead">{secondTeam.name}</th>
                        <th className="tabellHeadToHead">Mål</th>
                        <th className="tabellHeadToHead">Målforskjell</th>
                    </tr>
                </thead>

            <tbody>
                <tr>
                    <th className="tabellHeadToHead">Hjemmebanen til {firstTeam.name} </th>
                    <td className="tabellHeadToHead">{firstTeam.wonHome}</td>
                    <td className="tabellHeadToHead">{firstTeam.drawnHome}</td>
                    <td className="tabellHeadToHead">{firstTeam.lostHome}</td>
                    <td className="tabellHeadToHead">{firstTeam.goalsForHome}  -  {firstTeam.goalsAgainstHome}</td>
                    <td className="tabellHeadToHead">{firstTeam.goalsForHome - firstTeam.goalsAgainstHome}</td>
                </tr>
                <tr>
                    <th className="tabellHeadToHead">Hjemmebanen til {secondTeam.name} </th>
                    <td className="tabellHeadToHead">{firstTeam.wonAway}</td>
                    <td className="tabellHeadToHead">{firstTeam.drawnAway}</td>
                    <td className="tabellHeadToHead">{firstTeam.lostAway}</td>
                    <td className="tabellHeadToHead">{firstTeam.goalsForAway} - {firstTeam.goalsAgainstAway}</td>
                    <td className="tabellHeadToHead">{firstTeam.goalsForAway - firstTeam.goalsAgainstAway}</td>
                </tr>
            </tbody>
        </table>
        </React.Fragment> 

        );
    }
}
    
export default Match;