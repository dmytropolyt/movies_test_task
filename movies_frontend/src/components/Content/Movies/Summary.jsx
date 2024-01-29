import * as format from '../../../helpers/format.js';
export { Summary };

function Summary({ movieData }) {
    const movieSummaryData = format.movieRenderSummary(movieData);
    const summaryRenderer = ([key, { label, value }]) => (
        <div key={key} className="movie_summary_item">
            <span className="movie_summary_label">{label}:</span>
            <span className="movie_summary_value">{value}</span>
        </div>
    );
    const movieSummary = Object.entries(movieSummaryData).map(summaryRenderer);

    return <div className="movie_summary">{movieSummary}</div>;
}