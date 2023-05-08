import './Body.css';
import { useCallback, useState } from 'react';
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
        setReview(newReview);
    };

    const handleResponse = res => {
        if (res.prediction === "Positive") {
            setSentiment(String.fromCodePoint(128522));
        }
        else if (res.prediction === "Negative") {
            setSentiment(String.fromCodePoint(128577));
        }
    } 

    const analyzeReview = useCallback(() => {
        fetch(process.env.REACT_APP_API_URL, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: review})
          })
         .then((response) => {
            return response.json();
         })
         .then((data) => {
            handleResponse(data)
         })
         .catch((err) => {
            console.log(err.message);
         });
    }, [review]);

    /*const analyzeReview = () => {
        handleResponse({
            sentiment: "happy"
        });
    }*/
    
    return (
        <div className="Body">
            <textarea className='ReviewTextArea' value={review} onChange={handleReviewChange}></textarea>
            <div className='Analysis'>
                <button className='AnalyseReviewButton' onClick={analyzeReview} disabled={disabled}>Check Sentiment</button>
                <Emoji className='SentimentEmoji' symbol={sentiment} />
            </div>
        </div>
    )
}