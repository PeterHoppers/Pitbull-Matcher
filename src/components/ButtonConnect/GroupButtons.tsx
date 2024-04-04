import GroupButtonInfo from './GroupButtonInfo';
import GroupButtonType from './GroupButtonType';
import "./GroupButtons.css";

interface GroupButtonProps {
    groupButtonId: GroupButtonType;
    buttons: GroupButtonInfo[];
    selectedButtonIndex: number | null;
    onSelectedButton: (buttonId: number, groupId: GroupButtonType) => void
}

function GroupButtons({groupButtonId, buttons, selectedButtonIndex, onSelectedButton}: GroupButtonProps) {
    function setSelectedButton(buttonId: number) {
        onSelectedButton(buttonId, groupButtonId);
    }

    const groupButtons = buttons.map((button, index) => {
        const buttonClass = (index == selectedButtonIndex) ? "selected-button" : "";
        return <button 
                key={button.id.toString()} 
                id={`button-${groupButtonId}-${index}`}
                onClick={() => setSelectedButton(button.id)}
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