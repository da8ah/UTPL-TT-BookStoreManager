import { useState } from "react";

export default function useBookEditor() {
    const [isEditorOpen, setEditorState] = useState(false);
    const toggleEditor = (state: boolean) => {
        setEditorState(state);
    };
    return [isEditorOpen, toggleEditor] as const
}