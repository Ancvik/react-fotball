import React from "react"
import './Team.css';

class TeamPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            team: null
        }
    }
    
    componentDidMount() {
        fetch(`https://nifs.laps.dev/teams/${this.props.match.params.teamId}`)
            .then(function(response){
                return response.json()
            })
            .then(data => this.setState({team: data}))

    }
    render(){
        if (this.state.team === null) {
            return null
        }
        const teamInfo = this.state.team
        console.log(this.state.team.kits)
        return (
            <div style={{backgroundColor: teamInfo.kits.colorCodes}}>

            </div>
        );
    }
}
    
export default TeamPage;