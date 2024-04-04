import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './AudioDisplay.css';
import { SongInfo } from '../../songInfo';

function AudioDisplay({audioSrc}: {audioSrc: SongInfo | null | undefined}) {
    return (
        <div className='audio-display'>
            {audioSrc ? 
                <AudioPlayer
                    autoPlay
                    src={audioSrc.getRapSongURL()}
                />
                : <></>
            }
            
        </div>
    );
}

export default AudioDisplay;