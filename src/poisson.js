import pmf from "distributions-poisson-pmf"


export function calculateStrength(matches = [], goalsScoredReducer, goalsConcededReducer, goalsAverage, goalsConceededAverage) {

    const goalsScored = matches.reduce(goalsScoredReducer, 0);
    const goalsConceded = matches.reduce(goalsConcededReducer, 0);
    const attack = (goalsScored / matches.length) / goalsAverage
    const defense = (goalsConceded / matches.length) / goalsConceededAverage

    return {
        attack,
        defense
    }
}

export function predictedResults(playedMatches = [], homeTeam = "", awayTeam = "") {

    const sumHomeGoals = (previous, current) => {
        return previous + current.homeGoals;
    };

    const sumAwayGoals = (previous, current) => {
        return previous + current.awayGoals;
    };

    const simplifiedMatchList = playedMatches.map(match => ({
        homeTeam: "" + match.homeTeam.name,
        awayTeam: "" + match.awayTeam.name,
        homeGoals: +match.result.homeScore90,
        awayGoals: +match.result.awayScore90
    }))

    const totalGoalsHome = simplifiedMatchList.reduce(sumHomeGoals, 0);

    const totalGoalsAway = simplifiedMatchList.reduce(sumAwayGoals, 0);

    const numberOfMatchesPlayed = simplifiedMatchList.length;   

    const averageGoalsHome = (totalGoalsHome / numberOfMatchesPlayed);
    const averageGoalsAway = (totalGoalsAway / numberOfMatchesPlayed);

    const homeTeamMatchesReversed = simplifiedMatchList.filter(match => match.homeTeam === homeTeam)
                                    .reverse()
    const homeTeamMatchesRecent = homeTeamMatchesReversed.filter((_,index) => (index <= 2))
    const homeTeamMatchesRest = homeTeamMatchesReversed.filter((_,index) => (index > 2))

    const homeStrengthRecent = calculateStrength(homeTeamMatchesRecent, sumHomeGoals, sumAwayGoals, averageGoalsHome, averageGoalsAway);
    const homeRest = calculateStrength(homeTeamMatchesRest, sumHomeGoals, sumAwayGoals, averageGoalsHome, averageGoalsAway);

    const attackingStrengthHome = ((homeStrengthRecent.attack * 1.3) + (homeRest.attack * 0.7)) / 2;
    const defensiveStrengthHome = ((homeStrengthRecent.defense * 0.7) + (homeRest.defense * 1.3)) / 2;

    const awayTeamMatchesReversed = simplifiedMatchList.filter(match => match.awayTeam === homeTeam)
                                    .reverse()
    const awayTeamMatchesRecent = awayTeamMatchesReversed.filter((_,index) => (index <= 2))
    const awayTeamMatchesRest = awayTeamMatchesReversed.filter((_,index) => (index > 2))

    const awayStrengthRecent = calculateStrength(awayTeamMatchesRecent, sumAwayGoals, sumHomeGoals, averageGoalsAway, averageGoalsAway);
    const awayRest = calculateStrength(awayTeamMatchesRest, sumAwayGoals, sumHomeGoals, averageGoalsAway, averageGoalsHome);

    const attackingStrengthAway = ((awayStrengthRecent.attack * 1.3) + (awayRest.attack * 0.7)) / 2;
    const defensiveStrengthAway = ((awayStrengthRecent.defense * 0.7) + (awayRest.defense * 1.3)) / 2;

    const poissonHomeTeam = attackingStrengthHome * defensiveStrengthAway * averageGoalsHome
    const poissonAwayTeam = defensiveStrengthHome * attackingStrengthAway * averageGoalsAway



    const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12];

    const probabilityForHomeGoals = pmf(x, {
        lambda: poissonHomeTeam,
    });

    const probabilityForAwayGoals = pmf(x, {
        lambda: poissonAwayTeam,
    });

    const maxHomeProbability = Math.max(...probabilityForHomeGoals)

    const numberOfGoalsHome = probabilityForHomeGoals.indexOf(maxHomeProbability)

    const maxAwayProbability = Math.max(...probabilityForAwayGoals)

    const numberOfGoalsAway = probabilityForAwayGoals.indexOf(maxAwayProbability)

    const result = {
        numberOfGoalsHome: numberOfGoalsHome,
        numberOfGoalsAway: numberOfGoalsAway,
        probabilityForHomeGoals: probabilityForHomeGoals,
        probabilityForAwayGoals: probabilityForAwayGoals
    }
    return result
}