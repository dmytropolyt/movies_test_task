import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { MoviesList } from './Movies/MoviesList';
import { MoviePage } from './Movies/MoviePage';
import { Discussion } from './Discussions/Discussion';
import { MovieProvider } from '../../context/MovieProvider.jsx';

export { Content };

function Content() {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<MoviesList />} />
                <Route path='/movie/:movieId' element={<MovieProvider><MoviePage /></MovieProvider>} />
                <Route path='/discussion/:discussionId' element={<Discussion />} />
            </Routes>
        </Router>
    );
}