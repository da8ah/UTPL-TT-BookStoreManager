import { useState } from "react"
import { ModalAttributes } from "../view/components/ModalDisplay"

export default function useModal() {
    const [modalAttributes, setModalAttributes] = useState<ModalAttributes>()
    const [modalVisibility, setModalVisibility] = useState(false)
    return [modalAttributes, setModalAttributes, modalVisibility, setModalVisibility] as const
}