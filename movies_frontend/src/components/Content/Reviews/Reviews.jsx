import { useApp } from '../../../context/AppContext';
import { ReviewForm } from "./ReviewForm";
import { Review } from "./Review";

export { Reviews };

function Reviews({ reviews, movieId }) {
    const appData = useApp();
    const isLogin = appData.isLogin;
    const currentUser = appData.userInfo?.username;
    const userHasReviews = reviews.find(review => review.user === currentUser);
    const reviewEnabled = isLogin && !userHasReviews;
    const reviewRenderer = review => {
        const editable = review.user === currentUser;
        return <Review review={review} key={review.user} editable={editable} />;
    };
    const reviewsList = reviews.map(reviewRenderer);

    return (
        <div className="reviews">
            {reviewEnabled && <ReviewForm movieId={movieId} />}
            {reviewsList}
        </div>
    );
}