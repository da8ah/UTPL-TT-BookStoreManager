import { useState } from "react"
import { DraftModalAttributes } from "../view/screens/layouts/ModalEditorFactory"

export default function useModal() {
    const [modalAttributes, setModalAttributes] = useState<DraftModalAttributes>({ modalType: '', data: 0 })
    const [modalVisibility, setModalVisibility] = useState(false)
    return [modalAttributes, setModalAttributes, modalVisibility, setModalVisibility] as const
}