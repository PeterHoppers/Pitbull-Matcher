import AudioDisplay from "../AudioDisplay/AudioDisplay";
import GroupButtons from "../ButtonConnect/GroupButtons";
import { useState } from 'react'

import "./GameScene.css";
import { SongInfo, songType} from "../../songInfo";
import GroupButtonType from "../ButtonConnect/GroupButtonType";
import GroupButtonInfo from "../ButtonConnect/GroupButtonInfo";
import GuessManager from "../GuessManager/GuessManager";
import Guess from "../GuessManager/Guess";
import EndGameModel from "../Model/EndGameModel";

interface GameSceneProps {
    optionList: SongInfo[];
    songList: SongInfo[];
    songType: songType;
    onSelectType: (songType: songType | null) => void;
    onReplay: () => void;
}
//Add checking logic to see how many correct guesses someone did make

function GameScene({optionList, songList, songType, onSelectType, onReplay} : GameSceneProps) {
    const [optionIndex, setOptionIndex] = useState<number | null>(null);
    const [songTitleIndex, setTitleIndex] = useState<number | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [revealAnswer, setReveal] = useState<boolean>(false);

    if (optionIndex !== null && songTitleIndex !== null) {
        addGuess(optionIndex, songTitleIndex);
        setOptionIndex(null);
        setTitleIndex(null);
    }

    function addGuess(optionIndex: number, songIndex: number) {
        let currentGuesses = guesses;
        //Remove old lines when one that uses one of the previous ids gets created
        currentGuesses = currentGuesses.filter(x => x.optionIndex !== optionIndex);
        currentGuesses = currentGuesses.filter(x => x.songIndex !== songIndex);
        const optionId = optionList[optionIndex].id;
        const songId = songList[songIndex].id; 
        const isCorrect = (optionId == songId);
        
        currentGuesses.push({optionId: optionId, optionIndex: optionIndex, songId: songId, songIndex: songIndex, isCorrect: isCorrect});

        setGuesses(currentGuesses);
    }

    function onGroupButtonUpdate(buttonIndex: number, groupId: GroupButtonType) {
        if (groupId == GroupButtonType.Option) {
            setOptionIndex(buttonIndex);
        } else if (groupId == GroupButtonType.SongTitle) {
            setTitleIndex(buttonIndex);
        }
    }

    function onRevealAnswers() {
        setReveal(true);
    }

    function clearGuesses() {
        setGuesses([]);
        setReveal(false);
        onReplay();
    }

    const optionButtons: GroupButtonInfo[] = optionList.map((info, index) => {
        return {name: "Track " + (index + 1), id: info.id};
    });

    const songButtons: GroupButtonInfo[] = songList.map(info => {
        return {name: info.songName, id: info.id};
    });

    const selectedSongInfo = (optionIndex != null && !revealAnswer) ? optionList[optionIndex] : null;

    return (
        <div className="game-scene">
            {(guesses.length == songList.length && selectedSongInfo == null && !revealAnswer) && 
                <div className="game-scene__reveal-holder">
                    <button
                        className="game-scene__reveal-button"
                        onClick={onRevealAnswers}
                    >
                    Submit Answers
                </button>    
                </div>                            
            }

            {(revealAnswer) && 
                <EndGameModel      
                    amountCorrect={guesses.filter(x => x.isCorrect).length}
                    amountPossible={guesses.length}          
                    onSelectType = {onSelectType}
                    onReset = {clearGuesses}
                />
            }

            <div className="game-scene-background">
                <div>                    
                    <img src="/Pitbull-Matcher/pitbullHead-svg.svg"></img>
                </div>
            </div>

            <div className="button-connect">
                <GroupButtons
                    groupButtonId={GroupButtonType.Option}
                    buttons = {optionButtons}
                    selectedButtonIndex={optionIndex}
                    guessedButtonsIndexes = {guesses.map(guess => guess.optionIndex)}
                    onSelectedButton={onGroupButtonUpdate}                        
                />
                <GroupButtons
                    groupButtonId={GroupButtonType.SongTitle}
                    buttons = {songButtons}
                    selectedButtonIndex={songTitleIndex}
                    guessedButtonsIndexes = {guesses.map(guess => guess.songIndex)}
                    onSelectedButton={onGroupButtonUpdate}
                />
            </div>
            <AudioDisplay
                audioSrc={selectedSongInfo}
                songType={songType}
            /> 
            <GuessManager
                guesses={guesses}
                revealAnswers={revealAnswer}
            />
        </div>
    );
}

export default GameScene;