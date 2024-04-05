import GroupButtonInfo from './GroupButtonInfo';
import GroupButtonType from './GroupButtonType';
import "./GroupButtons.css";

interface GroupButtonProps {
    groupButtonId: GroupButtonType;
    buttons: GroupButtonInfo[];
    selectedButtonIndex: number | null;
    guessedButtonsIndexes: number[];
    onSelectedButton: (buttonId: number, groupId: GroupButtonType) => void
}

function GroupButtons({groupButtonId, buttons, selectedButtonIndex, guessedButtonsIndexes, onSelectedButton}: GroupButtonProps) {
    function setSelectedButton(buttonId: number) {
        onSelectedButton(buttonId, groupButtonId);
    }

    const groupButtons = buttons.map((button, index) => {
        let buttonClass = "";
        
        if (index == selectedButtonIndex) {
            buttonClass += "selected-button";
        }

        if (guessedButtonsIndexes.includes(index)) {
            buttonClass += " guessed-button";
        }

        return <button 
                key={button.id.toString()} 
                id={`button-${groupButtonId}-${index}`}
                onClick={() => setSelectedButton(index)}
                className = {buttonClass}>
                    {button.name}
            </button>
    });

    return (
        <>
            <div className="group-button-holder">
                {groupButtons}
            </div>
        </>
    )
}

export default GroupButtons;