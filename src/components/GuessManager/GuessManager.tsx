import Guess from "./Guess";

import "./GuessManager.css";

interface GuessManagerProps {
    guesses: Guess[]
    revealAnswers: boolean
}

//TODO: on resize, redraw the lines
function GuessManager({guesses, revealAnswers}: GuessManagerProps) {
    const guessesDrawn = guesses.map((guess, index) => {
        const point1Element = document.getElementById(`button-0-${guess.optionIndex}`);
        const point2Element = document.getElementById(`button-1-${guess.songIndex}`);

        if (point1Element == null || point2Element == null) {
            console.log(`Couldn't find ${point1Element} or ${point2Element}`);
            return;
        }

        const offsetLeft = point1Element.offsetLeft;
        const width = point1Element.offsetWidth;

        const x1 = offsetLeft + width;
        const y1 = point1Element.offsetTop + point1Element.offsetHeight / 2;
        const x2 = point2Element.offsetLeft;
        const y2 = point2Element.offsetTop + (point2Element.offsetHeight / 2);

        const isCorrect = (guess.optionId == guess.songId);
        let classText = "";

        if (revealAnswers) {
            if (isCorrect) {
                classText = "is-correct";
            } else {
                classText = "is-incorrect";
            }
        }        

        return <line 
                    key={`line-${index}`}
                    className={classText}
                    x1={x1}
                    x2={x2}
                    y1={y1}
                    y2={y2}
                />
    });    

    return (
        <>
            <svg id="guess-svg">                
                {guessesDrawn}
            </svg>
        </>
    )
}

export default GuessManager;