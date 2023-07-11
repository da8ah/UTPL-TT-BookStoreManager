import { useState } from "react"
import { DraftModalAttributes } from "../view/screens/layouts/ModalBookFactory"

export default function useModal() {
    const [modalAttributes, setModalAttributes] = useState<DraftModalAttributes>()
    const [modalVisibility, setModalVisibility] = useState(false)
    return [modalAttributes, setModalAttributes, modalVisibility, setModalVisibility] as const
}