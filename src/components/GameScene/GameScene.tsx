import AudioDisplay from "../AudioDisplay/AudioDisplay";
import GroupButtons from "../ButtonConnect/GroupButtons";
import { useState, useEffect } from 'react'

import "./GameScene.css";
import { SongInfo} from "../../songInfo";
import GroupButtonType from "../ButtonConnect/GroupButtonType";
import GroupButtonInfo from "../ButtonConnect/GroupButtonInfo";
import GuessManager from "../GuessManager/GuessManager";
import Guess from "../GuessManager/Guess";

interface GameSceneProps {
    optionList: SongInfo[];
    songList: SongInfo[];
}
//Add checking logic to see how many correct guesses someone did make

function GameScene({optionList, songList} : GameSceneProps) {
    const [optionIndex, setOptionIndex] = useState<number | null>(null);
    const [songTitleIndex, setTitleIndex] = useState<number | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);

    useEffect(() => {
        if (optionIndex !== null && songTitleIndex !== null) {
            addGuess(optionIndex, songTitleIndex);
            setOptionIndex(null);
            setTitleIndex(null);
        }
    }, [optionIndex, songTitleIndex]);

    function addGuess(optionIndex: number, songIndex: number) {
        let currentGuesses = guesses;
        //Remove old lines when one that uses one of the previous ids gets created
        currentGuesses = currentGuesses.filter(x => x.optionId !== optionIndex);
        currentGuesses = currentGuesses.filter(x => x.songId !== songIndex);
        const optionId = optionList[optionIndex].id;
        const songId = optionList[songIndex].id; 
        
        currentGuesses.push({optionId: optionId, optionIndex: optionIndex, songId: songId, songIndex: songIndex});

        setGuesses(currentGuesses);
    }

    function onGroupButtonUpdate(buttonIndex: number, groupId: GroupButtonType) {
        if (groupId == GroupButtonType.Option) {
            setOptionIndex(buttonIndex);
        } else if (groupId == GroupButtonType.SongTitle) {
            setTitleIndex(buttonIndex);
        }
    }

    //go from SongInfo to GroupButtonInfo
    const optionButtons: GroupButtonInfo[] = optionList.map((info, index) => {
        return {name: "Option " + (index + 1), id: info.id};
    });

    const songButtons: GroupButtonInfo[] = songList.map(info => {
        return {name: info.songName, id: info.id};
    });

    const selectedSongInfo = (optionIndex != null) ? optionList[optionIndex] : null;

    return (
        <div className="game-scene">
            <div className="button-connect">
                <GroupButtons
                    groupButtonId={GroupButtonType.Option}
                    buttons = {optionButtons}
                    selectedButtonIndex={optionIndex}
                    onSelectedButton={onGroupButtonUpdate}                        
                />
                <GroupButtons
                    groupButtonId={GroupButtonType.SongTitle}
                    buttons = {songButtons}
                    selectedButtonIndex={songTitleIndex}
                    onSelectedButton={onGroupButtonUpdate}
                />
            </div>
            <AudioDisplay
                audioSrc={selectedSongInfo}
            /> 
            <GuessManager
                guesses={guesses}
            />
        </div>
    );
}

export default GameScene;