import React from "react"
import {Link} from "react-router-dom";
import './Team.css';

class Team extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            matches: []
        }
    }
    
    componentDidMount() {
        fetch(`https://api.nifs.no/stages/679874/matches/?teamId=${this.props.match.params.teamId}`)
            .then(function(response){
                return response.json()
            })
            .then(data => this.setState({matches: data}))

    }
    render(){
       const nextMatches = this.state.matches
            .filter(match => match.matchStatusId !== 1)
            .slice(0, 5)
            .map((match)=>{  
                return <li>
                    <Link to={`/match/${match.id}`} className ="LinkColor">{match.homeTeam.name + " - " + match.awayTeam.name}</Link>                
                    </li>
            })
            const previousMatches = this.state.matches
            .filter(match => match.matchStatusId === 1)
            .map((match)=>{
                return<li><Link to={`/matchstats/${match.externalIds.fiks}`} className ="LinkColor">{match.homeTeam.name + " - " + match.awayTeam.name}</Link>
                </li>
            })    
        return (
            <div>
            <h2>Kamper Spilt:</h2>
                <ul>
                {previousMatches}
                </ul>
            <h2>Neste 5 kampene:</h2>
            <ul>
            {nextMatches}
            </ul>


            </div>
        );
    }
}
    
export default Team;
    
