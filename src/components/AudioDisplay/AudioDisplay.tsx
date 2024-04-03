import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './AudioDisplay.css';
import { SongInfo } from '../../songInfo';

function AudioDisplay({audioSrc}: {audioSrc: SongInfo | null}) {
    return (
        <div className='audio-display'>
            {audioSrc != null ? 
                <AudioPlayer
                    autoPlay
                    src={audioSrc.getRapSongURL()}
                    onPlay={e => console.log("onPlay")}
                    // other props here
                />
                : <></>
            }
            
        </div>
    );
}

export default AudioDisplay;