import React from "react"

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
                {match.homeTeam.name + " - " + match.awayTeam.name}
                    </li>
            })
        return (
            <div>
                <ul>
                 {nextMatches}
                </ul>


            </div>
        );
    }
}
    
export default Team;
    
