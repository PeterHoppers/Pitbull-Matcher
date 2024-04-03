import AudioDisplay from "../AudioDisplay/AudioDisplay";
import GroupButtons from "../ButtonConnect/GroupButtons";
import { useState } from 'react'

import "./GameScene.css";
import { SongInfo} from "../../songInfo";
import GroupButtonType from "../ButtonConnect/GroupButtonType";
import GroupButtonInfo from "../ButtonConnect/GroupButtonInfo";

interface GameSceneProps {
    optionList: SongInfo[];
    songList: SongInfo[];
}

function GameScene({optionList, songList} : GameSceneProps) {
    const [optionId, setOptionId] = useState<number | null>(null);
    const [songTitleId, setTitleId] = useState<number | null>(null);

    function onGroupButtonUpdate(buttonId: number, groupId: GroupButtonType) {
        if (groupId == GroupButtonType.Option) {
            setOptionId(buttonId);
        } else if (groupId == GroupButtonType.SongTitle) {
            setTitleId(buttonId);
        }
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
                    onSelectedButton={onGroupButtonUpdate}                        
                />
                <GroupButtons
                    groupButtonId={GroupButtonType.SongTitle}
                    buttons = {songButtons}
                    onSelectedButton={onGroupButtonUpdate}
                />
            </div>
            <AudioDisplay
                audioSrc={selectedSongInfo}
            /> 
        </div>
    );
}

export default GameScene;