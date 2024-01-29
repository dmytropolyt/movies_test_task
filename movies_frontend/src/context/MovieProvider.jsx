import { createContext, useContext, useReducer } from "react";
export { MovieProvider, useMovie, useMovieDispatch };

const initMovieData = {};

const MovieContext = createContext();
const MovieDispatchContext = createContext();

function MovieProvider({ children }) {
    const [movieData, movieDispatch] = useReducer(MovieContextReducer, initMovieData);

    return (
        <MovieContext.Provider value={movieData}>
            <MovieDispatchContext.Provider value={movieDispatch}>
                {children}
            </MovieDispatchContext.Provider>
        </MovieContext.Provider>
    );
}

function useMovie() {
    return useContext(MovieContext);
}

function useMovieDispatch() {
    return useContext(MovieDispatchContext);
}

function MovieContextReducer(state, action) {
    switch (action.type) {
        case 'SET_REVIEWS':
            const sorter = (left_review, right_review) => {
                const [left_date, right_date] = [left_review, right_review].map(review => new Date(review.created_at).getTime());
                return right_date - left_date 
            } 
            action.payload.sort(sorter)
            return { ...state, reviews: action.payload };
        default:
            return state;
    }
}