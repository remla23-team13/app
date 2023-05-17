import './Body.css';
import { useCallback, useState } from 'react';
import Emoji from './emoji/Emoji';

export function Body() {

    const [review, setReview] = useState('');
    const [sentiment, setSentiment] = useState('');
    const [analyseDisabled, setAnalysedDisabled] = useState(true);
    const [wrongSentimentDisabled, setWrongSentimentDisabled] = useState(false);
    const [afterAnalysis, setAfterAnalysis] = useState(false);

    const handleReviewChange = event => {
        const newReview = event.target.value;
        if (newReview === "") {
            setAnalysedDisabled(true);
        }
        else if (analyseDisabled) setAnalysedDisabled(false);
        setSentiment("");
        setAfterAnalysis(false);
        setReview(newReview);
    };

    const handleResponse = res => {
        if (res.prediction === "Positive") {
            setSentiment(String.fromCodePoint(128522));
        }
        else if (res.prediction === "Negative") {
            setSentiment(String.fromCodePoint(128577));
        }

        
        setAnalysedDisabled(true);
        setWrongSentimentDisabled(false);
        setAfterAnalysis(true);
    } 

    const analyzeReview = useCallback(() => {
        fetch(process.env.REACT_APP_API_MODEL_PATH + "/predict", {
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

    // const analyzeReview = () => {
    //     handleResponse({
    //         prediction: "Positive"
    //     });
    // }

    const incrementNWrongSentiments = () => {
        fetch(process.env.REACT_APP_API_MODEL_PATH + "/wrong", {
            method: 'POST'
            })
        setWrongSentimentDisabled(true);
    }
    
    return (
        <div className="Body">
            <textarea className='ReviewTextArea' value={review} onChange={handleReviewChange}></textarea>
            <div className='Analysis'>
                <button className='AnalyseReviewButton' onClick={analyzeReview} disabled={analyseDisabled}>Check Sentiment</button>
                <Emoji className='SentimentEmoji' symbol={sentiment} />
                { afterAnalysis && <button className='WrongSentimentButton' onClick={incrementNWrongSentiments} disabled={wrongSentimentDisabled} >Wrong Sentiment</button> }
            </div>
        </div>
    )
}