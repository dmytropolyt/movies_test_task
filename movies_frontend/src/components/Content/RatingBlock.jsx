import { useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export { RatingBlock };

function RatingBlock({ rating, readonly }) {
    const defaultRating = 0;
    const currentRating = rating || defaultRating;
    const [rate, setRate] = useState(currentRating);
    const onChange = (event, newRate) => setRate(newRate);

    return (
        <Box>
            <Rating
                name='rating'
                value={rate}
                onChange={onChange}
                readOnly={readonly}
            />
        </Box>
    );
}