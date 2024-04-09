import { songType } from "../../songInfo";
import "./SelectTypeModel.css";
import { useState } from "react";

interface SelectTypeProps {
    onSelectType: (songType: songType) => void
}

function SelectType({onSelectType}: SelectTypeProps) {
    const [selectedMode, setMode] = useState<songType| null>(null);

    function onSelectButtonClick(songType: songType) {
        setMode(songType);
    }

    //convert the values of song type into an array so that we can create a button for each of them
    const songTypeArray = (Object.values(songType) as Array<songType>).map(type => {
        const typeToString = (type === songType.TTS) ? "Text To Speech" : type;
        return <button
                    key={type}
                    className={`select-type-button select-type-${type.toLowerCase()}`}
                    onClick={() => onSelectButtonClick(type)}    
                >{typeToString}</button>
    });

    let categoryInfo = "";
    switch (selectedMode) {
        case songType.Hook:
            categoryInfo = "This introductory category highlights the most momentous parts of each song, which Pitbull most often graciously spotlights others in rather than himself.";
            break; 
        case songType.Rap:
            categoryInfo = "Listen to Pitbull dive into diverse topics throughout his discography and deduce which song each example of linguistic prowess originates from.";
            break;  
        case songType.TTS:
            categoryInfo = "Match emotional renditions of Pitbull's most insightful lyricisms with the song where these treasures were unearthed from."
            break;
        case songType.Instrumental:
            categoryInfo = "Analyze Pitbull's handcrafted instrumental wonders after they've been detached from the rest of the composition."
            break;
        case songType.Reverse:
            categoryInfo = "Myths hint at secret knowledge that can be gleamed from reversing songs. Pair these reversed raps with their songs and perhaps reveal their hidden truths."
            break;
        default:
            break;      
    }

    return (
        <div className="pitbull-model">
            <section className="pitbull-model__content">
                <h1>Pitbull Matcher</h1>
                <h2><i>A quizzical celebration of one of the rappers of all time!</i></h2>
                <h3>How To Play</h3>
                <ul className="pitbull-list">
                    <li>There'll be two sets of buttons: one labelled "Track #" and one labelled with Pitbull song titles</li>
                    <li>Selecting a "Track" button will play an audio track</li>
                    <li>Your goal is to then select the song title that audio track is from</li>
                </ul>
                <h3>Select Category</h3>
                <div className={`select-type-buttons selected-button-${selectedMode?.toLowerCase()}`}>
                    {songTypeArray}
                </div>           

                {(selectedMode != null) &&
                    <div>
                        <p className="category-description">{categoryInfo}</p>
                        <button
                            className="pitbull-model__confirm-btn"
                            onClick={() => onSelectType(selectedMode)}    
                        >Begin
                        </button>
                    </div>
                    
                }
            </section>
            <div className="pitbull-model-background">
                <img src="/Pitbull-Matcher/pitbull-two.png"></img>
                <img src="/Pitbull-Matcher/pitbull-one.png"></img>
            </div>
        </div>
    )
}

export default SelectType;