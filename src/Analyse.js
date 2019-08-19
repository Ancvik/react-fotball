import React from "react"
import { predictedResults } from "./poisson";



class Analyse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            matches: []
        }
    }

    componentDidMount() {
        fetch("https://api.nifs.no/stages/679874/matches/")
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ matches: data }))
    }

    render() {

        if (this.state.matches.length === 0) {
            return null
        }

        const filteredTable = this.state.matches.filter(match => (match.matchStatusId === 1))

       const result = predictedResults(filteredTable, "Molde", "Tromsø")

        return (
            <ul>
                <li>{result.numberOfGoalsHome} - {result.numberOfGoalsAway}</li>
            </ul>


        )



    }




}
export default Analyse;