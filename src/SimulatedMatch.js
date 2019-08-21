import React from "react"
import "./StatsForMatch.css";
import { predictedResults } from "./poisson";
import './Match.css'

class SimulatedMatch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            matchesMap: {}
        }
    }

    componentDidMount() {
        [679874].forEach(i =>
            fetch(`https://api.nifs.no/stages/${i}/matches/`)
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState(({matchesMap}) => {
                matchesMap[i] = data
                return matchesMap;
            }
                ))
            )
            
    }

    render() {

        
        const combinedNewAnd2018 = Object.values(this.state.matchesMap).reduce((prev, curr) => {    
            return [...prev, ...curr]
        }, [])

        if (combinedNewAnd2018.length === 0) {
            return null
        }

        const fiksId = +this.props.match.params.matchId;
        const playedMatches = combinedNewAnd2018.filter((match, index) => (match.matchStatusId === 1))

        const currentMatch = combinedNewAnd2018.filter(match => (match && match.externalIds && match.externalIds.fiks === fiksId))[0]     
        
        if(!currentMatch) {
            return null;
        }
        const homeTeam = currentMatch.homeTeam
        const awayTeam = currentMatch.awayTeam

        const result = predictedResults(playedMatches, homeTeam.name, awayTeam.name)

        const goalPrecentageFirstFiveHome = result.probabilityForHomeGoals.filter((_, indexHome) => (indexHome <= 4)).map(value => ((value*100).toFixed(1)))

        const goalPrecentageFirstFiveAway = result.probabilityForAwayGoals.filter((_, indexAway) => (indexAway <= 4)).map(value => ((value*100).toFixed(1)))

        const goalPrecentageFivePlussHome = (result.probabilityForHomeGoals.filter((_, indexHome) => (indexHome > 4))
                                                .reduce((previous, current) => (previous + current))*100).toFixed(1)
                                                

        const goalPrecentageFivePlussAway = (result.probabilityForAwayGoals.filter((_, indexAway) => (indexAway > 4))
                                                .reduce((previous, current) => (previous + current))*100).toFixed(1)
                                                


        

      /*
                    0 1 2 3 4 5+
            Molde   % % % % % %
            Bronn   % % % % % %

      */
        

        return (
            
            <div className="App-body">
            <h2>Sannsynlighet for antall scorede mål per lag i matchen {homeTeam.name} - {awayTeam.name}</h2>
                <table className="tabellHeadToHead">
                    <thead>
                        <tr>
                            <td className="tabellHeadToHead"></td>
                            <th className="tabellHeadToHead">0</th>
                            <th className="tabellHeadToHead">1</th>
                            <th className="tabellHeadToHead">2</th>
                            <th className="tabellHeadToHead">3</th>
                            <th className="tabellHeadToHead">4</th>
                            <th className="tabellHeadToHead">5+</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <th className="tabellHeadToHead">{homeTeam.name} </th>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveHome[0]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveHome[1]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveHome[2]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveHome[3]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveHome[4]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFivePlussHome}%</td>
                        </tr>
                        <tr>
                            <th className="tabellHeadToHead">{awayTeam.name} </th>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveAway[0]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveAway[1]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveAway[2]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveAway[3]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFirstFiveAway[4]}%</td>
                            <td className="tabellHeadToHead">{goalPrecentageFivePlussAway}%</td>
                        </tr>
                    </tbody>
                </table>
                </div>
        )

        }
}

export default SimulatedMatch;
