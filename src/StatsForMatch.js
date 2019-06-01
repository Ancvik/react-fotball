import React from "react"
import "./StatsForMatch.css";

class StatsForMatch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            matchStats: null
        }
    }
    
    componentDidMount() {
        fetch(`https://api.nifs.no/matches/?fiksId=${this.props.match.params.matchId}`)
            .then(function(response){
                return response.json()
            })
            .then(data => this.setState({matchStats: data}))

    }
    
    render(){
        if(this.state.matchStats === null){
            return null
        }
   const stats = this.state.matchStats;
       return (
        <React.Fragment>
        <h2>Statistikk for kampen {stats.name} i {stats.stage.fullName}</h2>

        <table className="stats">
            <tbody>
                <tr>
                    <th className="stats">Pause:</th>
                    <td className="stats">{stats.result.homeScore45} - {stats.result.awayScore45}</td>
                </tr>
                <tr>
                    <th className="stats">Fulltid:</th>
                    <td className="stats">{stats.result.homeScore90} - {stats.result.awayScore90}</td>
                </tr>

                <tr>
                    <th className="stats">Skudd:</th>
                    <td className="stats">{stats.matchStatistics.shotsOnGoalHomeTeam} - {stats.matchStatistics.totalShotsAwayTeam}</td>                    
                </tr>
                
                <tr>
                    <th className="stats">Skudd på mål:</th>
                    <td className="stats">{stats.matchStatistics.totalShotsHomeTeam} - {stats.matchStatistics.totalShotsAwayTeam}</td>
                </tr>

                <tr>
                    <th className="stats">Ballbesittelse:</th>
                        <td className="stats">{stats.matchStatistics.possessionHomeTeam} - {stats.matchStatistics.possessionAwayTeam}</td>
                </tr>

            </tbody>
        </table>
        </React.Fragment> 
          

        );
    }
}
    
export default StatsForMatch;