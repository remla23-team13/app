import './Body.css';
import { useState } from 'react';
import Emoji from './emoji/Emoji';

export function Body() {

    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [disabled, setDisabled] = useState(true);

    const handleReviewChange = event => {
        const newReview = event.target.value;
        if (newReview === "") {
            setSentiment("");
            setDisabled(true);
        }
        else if (disabled) setDisabled(false);
        setReview();
    };

    const handleResponse = res => {
        console.log(res);
        if (res.sentiment === "happy") {
            setSentiment(String.fromCodePoint(128522));
        }
        else if (res.sentiment === "sad") {
            setSentiment(String.fromCodePoint(128577));
        }
    } 

    const analyzeReview = () => {
        console.log(process.env.REACT_APP_API_URL)
        fetch(process.env.REACT_APP_API_URL)
         .then((response) => {
            console.log(response)
            response.json()
         })
         .then((data) => {
            handleResponse(data)
         })
         .catch((err) => {
            console.log(err.message);
         });
    };

    const analyzeReviewTest = () => {
        handleResponse({
            sentiment: "happy"
        });
    }
    
    return (
        <div className="Body">
            <textarea className='ReviewTextArea' value={review} onChange={handleReviewChange}></textarea>
            <div className='Analysis'>
                <button className='AnalyseReviewButton' onClick={analyzeReviewTest} disabled={disabled}>Check Sentiment</button>
                <Emoji className='SentimentEmoji' symbol={sentiment} />
            </div>
        </div>
    )
}