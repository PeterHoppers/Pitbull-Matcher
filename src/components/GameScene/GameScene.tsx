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

//TODO: Add lines between the buttons when selected a pair: https://www.npmjs.com/package/leader-line
//TODO: Add ability to clear out the selections whenever a pair is made

//Implement enum for the audio display so that it can choose to play
//Add checking logic to see how many correct guesses someone did make

function GameScene({optionList, songList} : GameSceneProps) {
    const [optionId, setOptionId] = useState<number | null>(null);
    const [songTitleId, setTitleId] = useState<number | null>(null);
    const [guesses, setGuesses] = useState<Guess[]>([]);

    console.log(guesses);

    let selectedOptionIndex : number | null = null;    
    if (optionId !== null) {
        selectedOptionIndex = getIndexFromId(optionId, optionList);
    }   
    
    let selectedSongIndex : number | null = null;    
    if (songTitleId !== null) {
        selectedSongIndex = getIndexFromId(songTitleId, songList);
    }   

    useEffect(() => {
        if (selectedOptionIndex !== null && selectedSongIndex !== null) {
            addGuess(selectedOptionIndex, selectedSongIndex);
            setOptionId(null);
            setTitleId(null);
        }
    }, [selectedOptionIndex, selectedSongIndex]);

    function addGuess(optionIndex: number, songIndex: number) {
        let currentGuesses = guesses;
        //Remove old lines when one that uses one of the previous ids gets created
        currentGuesses = currentGuesses.filter(x => x.optionIndex !== optionIndex);
        currentGuesses = currentGuesses.filter(x => x.songIndex !== songIndex);
        currentGuesses.push({optionIndex: optionIndex, songIndex: songIndex});
        setGuesses(currentGuesses);
    }

    function onGroupButtonUpdate(buttonId: number, groupId: GroupButtonType) {
        if (groupId == GroupButtonType.Option) {
            setOptionId(buttonId);
        } else if (groupId == GroupButtonType.SongTitle) {
            setTitleId(buttonId);
        }
    }

    function getIndexFromId(id: number, songInfos: SongInfo[]) {
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
                    selectedButtonIndex={selectedOptionIndex}
                    onSelectedButton={onGroupButtonUpdate}                        
                />
                <GroupButtons
                    groupButtonId={GroupButtonType.SongTitle}
                    buttons = {songButtons}
                    selectedButtonIndex={selectedSongIndex}
                    onSelectedButton={onGroupButtonUpdate}
                />
            </div>
            <AudioDisplay
                audioSrc={selectedSongInfo}
            /> 
            <GuessManager/>
        </div>
    );
}

export default GameScene;