import React from "react"
import './Match.css'
import { predictedResults } from "./poisson";

class Match extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            matches: null,
            playedMatches: []
        }
    }

    componentDidMount() {
        fetch(`https://api.nifs.no/matches/${this.props.match.params.matchId}/headtohead/`)
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ teams: data.teams, matches: data }))

        fetch("https://api.nifs.no/stages/679874/matches/")
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ playedMatches: data }))
    }
    render() {
        if (this.state.teams.length === 0) {
            return null
        }
        if (this.state.matches === null) {
            return null
        }

        if (this.state.playedMatches.length === 0) {
            return null
        }

        const matches = this.state.matches.previousMatches;
        const homeTeam = this.state.teams[0];
        const awayTeam = this.state.teams[1];

        const filteredTable = this.state.playedMatches.filter(match => (match.matchStatusId === 1))

       const result = predictedResults(filteredTable, homeTeam.name, awayTeam.name)

        return (
            <React.Fragment>
                <h2>Head to head mellom {homeTeam.name} og {awayTeam.name}</h2>
                <div className="App-body">
                    <table className="tabellHeadToHead">
                        <thead>
                            <tr>
                                <td className="tabellHeadToHead"></td>
                                <th className="tabellHeadToHead">{homeTeam.name}</th>
                                <th className="tabellHeadToHead">Uavgjort</th>
                                <th className="tabellHeadToHead">{awayTeam.name}</th>
                                <th className="tabellHeadToHead">Mål</th>
                                <th className="tabellHeadToHead">Differanse</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <th className="tabellHeadToHead">Hjemmebanen til {homeTeam.name} </th>
                                <td className="tabellHeadToHead">{homeTeam.wonHome}</td>
                                <td className="tabellHeadToHead">{homeTeam.drawnHome}</td>
                                <td className="tabellHeadToHead">{homeTeam.lostHome}</td>
                                <td className="tabellHeadToHead">{homeTeam.goalsForHome}  -  {homeTeam.goalsAgainstHome}</td>
                                <td className="tabellHeadToHead">{homeTeam.goalsForHome - homeTeam.goalsAgainstHome}</td>
                            </tr>
                            <tr>
                                <th className="tabellHeadToHead">Hjemmebanen til {awayTeam.name} </th>
                                <td className="tabellHeadToHead">{homeTeam.wonAway}</td>
                                <td className="tabellHeadToHead">{homeTeam.drawnAway}</td>
                                <td className="tabellHeadToHead">{homeTeam.lostAway}</td>
                                <td className="tabellHeadToHead">{homeTeam.goalsForAway} - {homeTeam.goalsAgainstAway}</td>
                                <td className="tabellHeadToHead">{homeTeam.goalsForAway - homeTeam.goalsAgainstAway}</td>
                            </tr>
                        </tbody>
                    </table>

                    <h2>Forventet resultat</h2>
                    <div className="center">{result.numberOfGoalsHome} - {result.numberOfGoalsAway}</div>

                    <h2>Tidligere kamper</h2>
                    <table className="tidligereKamper">
                        {matches.map(match => (

                            <tr>
                                <td>{match.name}</td>
                                <td>{match.result.homeScore90} - {match.result.awayScore90}</td>
                                <td className="textRight">{match.stage.fullName}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </React.Fragment>

        );
    }
}

export default Match;