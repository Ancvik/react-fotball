import React from "react"
import { Link } from "react-router-dom";
import './Table.css';
import TableView from "./TableView"
class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        fetch("https://api.nifs.no/stages/679874/table/")
            .then(function (response) {
                return response.json()
            })
            .then(data => this.setState({ teams: data.teams }))
    }

    render() {

        return (
            <React.Fragment>
                <div className="App-header">
                    <h1 className="Overskrift">Stians fotballside</h1>
                </div>
                <div className="App-body">
                    <Link to={`/simulatedTable`} className ="center"><button>Simulere gjenværende sesong</button></Link>
                    <TableView teams={this.state.teams} includeLink></TableView>
                </div>
            </React.Fragment>
        )
    }

}
export default Table;