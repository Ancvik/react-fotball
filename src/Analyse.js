import React from "react"
import { predictedResults } from "./poisson";
import TableView from "./TableView";
import { Link } from "react-router-dom";
import './Table.css';
import './Match.css';



class Analyse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: [],
            teams: []
        }
    }

    componentDidMount() {
        fetch("https://api.nifs.no/stages/679874/matches/")
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ matches: data }))

        fetch("https://api.nifs.no/stages/679874/table/")
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ teams: data.teams }))
    }

    render() {

        if (this.state.matches.length === 0) {
            return null
        }

        const playedMatches = this.state.matches.filter(match => (match.matchStatusId === 1))

        const futureMatches = this.state.matches.filter(match => (match.matchStatusId !== 1))

        const table = {}

        this.state.teams.forEach(team => {
            table[team.name] = team
        })

        futureMatches.forEach(match => {
            const result = predictedResults(playedMatches, match.homeTeam.name, match.awayTeam.name)
            const homeTeam = (table[match.homeTeam.name] || {
                points: 0,
                goalDifference: 0,
                won: 0,
                draw: 0,
                lost: 0,
                matches: 0
            })
            const awayTeam = (table[match.awayTeam.name] || {
                points: 0,
                goalDifference: 0,
                won: 0,
                draw: 0,
                lost: 0,
                matches: 0
            })

            homeTeam.goalDifference = homeTeam.goalDifference + (result.numberOfGoalsHome - result.numberOfGoalsAway)
            awayTeam.goalDifference = awayTeam.goalDifference + (result.numberOfGoalsAway - result.numberOfGoalsHome)

            if (result.numberOfGoalsHome > result.numberOfGoalsAway) {
                homeTeam.points = homeTeam.points + 3
                homeTeam.won = homeTeam.won + 1
                awayTeam.lost = awayTeam.lost + 1
            }
            else if (result.numberOfGoalsHome === result.numberOfGoalsAway) {
                homeTeam.points = homeTeam.points + 1
                awayTeam.points = awayTeam.points + 1
                awayTeam.draw = awayTeam.draw + 1
                homeTeam.draw = homeTeam.draw + 1
            }
            else {
                awayTeam.points = awayTeam.points + 3
                awayTeam.won = awayTeam.won + 1
                homeTeam.lost = homeTeam.lost + 1
            }
            table[match.homeTeam.name] = homeTeam
            table[match.awayTeam.name] = awayTeam
        });

        const tableList = Object.entries(table).map(keyValue => {
            return {
                name: keyValue[0],
                points: keyValue[1].points,
                goalDifference: keyValue[1].goalDifference,
                won: keyValue[1].won,
                draw: keyValue[1].draw,
                lost: keyValue[1].lost,
                played: keyValue[1].won + keyValue[1].draw + keyValue[1].lost
            }

        })

        const sortedTable = tableList.sort((team1, team2) => {
            return team2.points - team1.points
        })

        const probabilityTable = {}

        futureMatches.forEach(match => {
            const matchStatisic = (probabilityTable[match.name] || {
                matchBetween: match.homeTeam.name + "-" + match.awayTeam.name,
                homeVictory: 0,
                draw: 0,
                awayVictory: 0
            })

            const result = predictedResults(playedMatches, match.homeTeam.name, match.awayTeam.name)
            result.probabilityForHomeGoals.forEach((probabilityHome, indexHome) => {
                result.probabilityForAwayGoals.forEach((probabilityAway, indexAway) => {
                    if (indexHome > indexAway) {
                        matchStatisic.homeVictory = matchStatisic.homeVictory + probabilityHome * probabilityAway
                    }
                    else if (indexHome === indexAway) {
                        matchStatisic.draw = matchStatisic.draw + probabilityHome * probabilityAway
                    }
                    else {
                        matchStatisic.awayVictory = matchStatisic.awayVictory + probabilityAway * probabilityHome
                    }
                })
            })
            probabilityTable[match.name] = matchStatisic
        })

        const simulatedMatches = Object.entries(probabilityTable).map(keyValue => {
            return {
                name: keyValue[0],
                homeVictory: keyValue[1].homeVictory,
                draw: keyValue[1].draw,
                awayVictory: keyValue[1].awayVictory

            }
        })

        console.log(simulatedMatches)

        /*   const roundingToTwoDecimals = simulatedMatches.map(match => ({
              oeuo: "oeuoaue"
          }))
          const roundingToTwoDecimals = simulatedMatches.map(match => {
              return {   
                  oeuo: "oeuoaue"
              }
          }) */
        const roundingToTwoDecimals = simulatedMatches.map(match => ({
            name: match.name,
            percentHome: +(match.homeVictory * 100).toFixed(1),
            percentDraw: +(match.draw * 100).toFixed(1),
            percentAway: +(match.awayVictory * 100).toFixed(1)
        }))

        console.log(roundingToTwoDecimals)



        return (
            <React.Fragment>
                <div className="App-header">
                    <h1 className="Overskrift">Stians fotballside</h1>
                </div>
                <div className="App-body">
                    <Link to={`/`} className="center"><button>Gå til nåværende tabell</button></Link>
                    <TableView teams={sortedTable}></TableView>
                    <table className="tidligereKamper">
                        <tr>
                            <td>Kamp</td>
                            <td>Hjemme</td>
                            <td>Uavgjort</td>
                            <td>Borte</td>
                        </tr>
                        {roundingToTwoDecimals.map(match => (

                            <tr>
                                <td>{match.name}</td>
                                <td>{match.percentHome}%</td>
                                <td>{match.percentDraw}%</td>
                                <td>{match.percentAway}%</td>
                            </tr>
                        ))}

                    </table>
                </div>
            </React.Fragment>
        )



    }




}
export default Analyse;