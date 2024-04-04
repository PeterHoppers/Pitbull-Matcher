import "./EndGameModel.css";

import { songType } from "../../songInfo";

interface EndGameModelProps {
    amountCorrect: number;
    amountPossible: number;
    onSelectType: (songType: songType | null) => void;
    onReset: () => void;
}

function EndGameModel({amountCorrect, amountPossible, onSelectType, onReset} : EndGameModelProps) {
    return (
        <div className="end-game-model-holder">
            <div className="end-game-model">
                <p>{`Your score was ${amountCorrect} out of ${amountPossible}.`}</p>
                <div className="end-game-model__button-holder">
                    <button
                        onClick={() => onReset()}
                    >
                        Play Again
                    </button>
                    <button
                        onClick={() => onSelectType(null)}
                    >
                        Pick New Mode
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default EndGameModel;