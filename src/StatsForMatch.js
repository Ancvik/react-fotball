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
        <h2>{stats.name}</h2>       
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>{stats.homeTeam.name}</th>
                        <th>{stats.awayTeam.name}</th>
                    </tr>
                </thead>

            <tbody>
                <tr>
                    <th>Skudd</th>
                    <td>{stats.matchStatistics.totalShotsHomeTeam}</td>
                    <td>{stats.matchStatistics.totalShotsAwayTeam}</td>
                </tr>
                <tr>
                    <th>Skudd på mål</th>
                    <td>{stats.matchStatistics.shotsOnGoalHomeTeam}</td>
                    <td>{stats.matchStatistics.shotsOnGoalAwayTeam}</td>
                </tr>
                <tr>
                    <th>Ballbesittelse</th>
                    <td>{stats.matchStatistics.possessionHomeTeam}</td>
                    <td>{stats.matchStatistics.possessionAwayTeam}</td>
                </tr>
            </tbody>
        </table>
        </React.Fragment> 

        );
    }
}
    
export default StatsForMatch;