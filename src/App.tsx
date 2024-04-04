import './App.css'
import GameScene from './components/GameScene/GameScene';
import { useState } from 'react';
import SelectType from './components/Model/SelectTypeModel';

import { SongInfo, shuffleArray, songList, songType } from './songInfo';

//Add option to select different types of game modes
//Read how many correct answers were made, and ask them to try again or pick another mode
function App() {
  const [selectedSongType, setSongType] = useState<songType | null>(null);

  let usedSongs: SongInfo[] = [];

  for (let index : number = 0; index < songList.length; index++) {
      const songInfo : SongInfo = songList[index];
      songInfo.setId(index);
      usedSongs.push(songInfo);
  }

  usedSongs = shuffleArray(usedSongs);
  usedSongs = usedSongs.slice(0, 10);

  let songListOptions = [...usedSongs]; //so that we don't shuffle the used songs list
  songListOptions = shuffleArray(songListOptions);  

  function selectSongType(songType: songType | null) {
    setSongType(songType);
  }

  return (
    <>
      {(selectedSongType == null) 
        ?
            <SelectType
              onSelectType={selectSongType}
            />
        :
          <GameScene
            optionList = {usedSongs}
            songList = {songListOptions}
            songType = {selectedSongType}
            onSelectType={selectSongType}
          />
      }        
    </>
  )
}

export default App
