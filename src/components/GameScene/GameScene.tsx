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
    const [optionId, setOptionId] = useState<number | null>(null);
    const [songTitleId, setTitleId] = useState<number | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);

    useEffect(() => {
        if (optionId !== null && songTitleId !== null) {
            addGuess(optionId, songTitleId);
            setOptionId(null);
            setTitleId(null);
        }
    }, [optionId, songTitleId]);

    function addGuess(optionId: number, songId: number) {
        let currentGuesses = guesses;
        //Remove old lines when one that uses one of the previous ids gets created
        currentGuesses = currentGuesses.filter(x => x.optionId !== optionId);
        currentGuesses = currentGuesses.filter(x => x.songId !== songId);
        const optionIndex = getIndexFromId(optionId, optionList);
        const songIndex = getIndexFromId(songId, songList);       
        
        currentGuesses.push({optionId: optionId, optionIndex: optionIndex, songId: songId, songIndex: songIndex});

        setGuesses(currentGuesses);
    }

    function onGroupButtonUpdate(buttonId: number, groupId: GroupButtonType) {
        if (groupId == GroupButtonType.Option) {
            setOptionId(buttonId);
        } else if (groupId == GroupButtonType.SongTitle) {
            setTitleId(buttonId);
        }
    }

    function getIndexFromId(id: number | null, songInfos: SongInfo[]) {
        const findingIndex = (x: SongInfo) => x.id == id;
        return songInfos.findIndex(findingIndex);
    }

    //go from SongInfo to GroupButtonInfo
    const optionButtons: GroupButtonInfo[] = optionList.map((info, index) => {
        return {name: "Option " + (index + 1), id: info.id};
    });

    const songButtons: GroupButtonInfo[] = songList.map(info => {
        return {name: info.songName, id: info.id};
    });

    const selectedSongInfo = (optionId != null) ? optionList.find(x => x.id == optionId) : null;

    return (
        <div className="game-scene">
            <div className="button-connect">
                <GroupButtons
                    groupButtonId={GroupButtonType.Option}
                    buttons = {optionButtons}
                    selectedButtonIndex={getIndexFromId(optionId, optionList)}
                    onSelectedButton={onGroupButtonUpdate}                        
                />
                <GroupButtons
                    groupButtonId={GroupButtonType.SongTitle}
                    buttons = {songButtons}
                    selectedButtonIndex={getIndexFromId(songTitleId, songList)}
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