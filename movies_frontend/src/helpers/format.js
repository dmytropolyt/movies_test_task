export { movieRenderSummary };

function movieRenderSummary(movieData) {
    const actorsList = movieData.actors.map(actor => actor.full_name);
    const year = new Date(movieData.release_year).getFullYear();
    const summary = {
        director: { label: 'Director', value: movieData.director },
        actors: { label: 'Actors', value: actorsList.join(', ') },
        year: { label: 'Year', value: year }
    };

    return summary;
}