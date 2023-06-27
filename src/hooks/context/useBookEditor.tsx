import { useState } from "react";

export default function useBookEditor() {
    const [isEditorOpen, setEditorState] = useState(false);
    const toggleEditor = () => {
        setEditorState(!isEditorOpen);
    };
    return [isEditorOpen, toggleEditor] as const
}