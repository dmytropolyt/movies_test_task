import * as config from './config.js';
export { reviewEditUrl };

function reviewEditUrl(reviewId, mode) {
    return `${config.url.review}${reviewId}${mode === 'patch' ? '/' : ''}`;
}