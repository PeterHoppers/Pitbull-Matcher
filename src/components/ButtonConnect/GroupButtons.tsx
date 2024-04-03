import { useState } from 'react';
import GroupButtonInfo from './GroupButtonInfo';
import GroupButtonType from './GroupButtonType';
import "./GroupButtons.css";

interface GroupButtonProps {
    groupButtonId: GroupButtonType; //enum
    buttons: GroupButtonInfo[];
    onSelectedButton: (buttonId: number, groupId: GroupButtonType) => void
}

function GroupButtons({groupButtonId, buttons, onSelectedButton}: GroupButtonProps) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    function setSelectedButton(buttonId: number) {
        setSelectedId(buttonId);
        onSelectedButton(buttonId, groupButtonId);
    }

    const groupButtons = buttons.map(button => {
        const buttonClass = (button.id == selectedId) ? "selected-button" : "";
        return <button 
                key={button.id.toString()} 
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