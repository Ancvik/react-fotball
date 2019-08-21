import pmf from "distributions-poisson-pmf"

export function predictedResults(playedMatches, homeTeam, awayTeam) {

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

    const numberOfMatches = simplifiedMatchList.length;

    const matchesHome = simplifiedMatchList.filter(match => (match.homeTeam === homeTeam));
    const goalsScoredAtHome = matchesHome.reduce(sumHomeGoals, 0);
    const goalsConcededAtHome = matchesHome.reduce(sumAwayGoals, 0);
    const attackingStrengthHome = (goalsScoredAtHome / matchesHome.length) / (totalGoalsHome / numberOfMatches)
    const defensiveStrengthHome = (goalsConcededAtHome / matchesHome.length) / (totalGoalsAway / numberOfMatches)


    const matchesAway = simplifiedMatchList.filter(match => (match.awayTeam === awayTeam));
    const goalsScoredAway = matchesAway.reduce(sumAwayGoals, 0);
    const goalsConcededAway = matchesAway.reduce(sumHomeGoals, 0);
    const attackingStrengthAway = (goalsScoredAway / matchesAway.length) / (totalGoalsAway / numberOfMatches)
    const defensiveStrengthAway = (goalsConcededAway / matchesAway.length) / (totalGoalsAway / numberOfMatches)


    const poissonHomeTeam = attackingStrengthHome * defensiveStrengthAway * (totalGoalsHome / numberOfMatches)
    const poissonAwayTeam = defensiveStrengthHome * attackingStrengthAway * (totalGoalsAway / numberOfMatches)

    const x = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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