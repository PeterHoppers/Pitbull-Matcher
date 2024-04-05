import { songType } from "../../songInfo";
import "./SelectTypeModel.css";

interface SelectTypeProps {
    onSelectType: (songType: songType) => void
}

function SelectType({onSelectType}: SelectTypeProps) {
    return (
        <div className="pitbull-model">
            <h1>Welcome to Pitbull Matcher</h1>
            <p>Select a game mode type below to begin!</p>
            <div className="select-type-buttons">
                <button
                    onClick={() => onSelectType(songType.Rap)}    
                >
                    Standard
                </button>
                <button
                    onClick={() => onSelectType(songType.TTS)}    
                >
                    Text To Speech
                </button>
                <button
                    onClick={() => onSelectType(songType.Instrumental)}    
                >
                    Instrumental
                </button>

            </div>
        </div>
    )
}

export default SelectType;