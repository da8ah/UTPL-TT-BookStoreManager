import { useState } from "react";

export default function useEditor() {
    const [isEditorDisabled, setDisabledState] = useState(false);
    const toggleDisabledState = (state: boolean) => {
        setDisabledState(state);
    };
    return [isEditorDisabled, toggleDisabledState] as const
}