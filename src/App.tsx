import './App.css'
import GameScene from './components/GameScene/GameScene';

import { SongInfo, shuffleArray, songList } from './songInfo';

//Add option to select different types of game modes
//Read how many correct answers were made, and ask them to try again or pick another mode
function App() {
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

  return (
    <>
        <GameScene
          optionList = {usedSongs}
          songList = {songListOptions}
        />
    </>
  )
}

export default App
