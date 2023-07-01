import { createContext } from "react";

export const EditorContext = createContext({
    isEditorOpen: false,
    toggleEditor: (state: boolean) => { },
});