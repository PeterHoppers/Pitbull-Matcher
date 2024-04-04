import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

import './AudioDisplay.css';
import { SongInfo, songType } from '../../songInfo';

interface AudioDisplayProps {
    audioSrc: SongInfo | null | undefined;
    songType: songType
}

function AudioDisplay({audioSrc, songType}: AudioDisplayProps) {
    return (
        <div className='audio-display'>
            {audioSrc ? 
                <AudioPlayer
                    autoPlay
                    src={audioSrc.getSongURL(songType)}
                />
                : <></>
            }
            
        </div>
    );
}

export default AudioDisplay;