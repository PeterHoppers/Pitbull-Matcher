import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const [selectedId, setSelectedId] = useState(0);

  const folderName = "BackInTime";
  const trackName = "backInTimeTTS";

  return (
    <>
      <AudioPlayer
        autoPlay
        src={`/Pitbull-Matcher/audio/${folderName}/${trackName}.mp3`}
        onPlay={e => console.log("onPlay")}
        // other props here
      />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      
    </>
  )
}

export default App
