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
                <p>{`You correctly guessed ${amountCorrect} out of ${amountPossible}.`}</p>
                <div className="end-game-model__button-holder">
                    <button
                        onClick={() => onReset()}
                    >
                        Play Again
                    </button>
                    <button
                        onClick={() => onSelectType(null)}
                    >
                        Select New Category
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default EndGameModel;