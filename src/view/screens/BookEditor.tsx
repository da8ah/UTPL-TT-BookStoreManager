import { useTheme } from "@ui-kitten/components";
import { useContext, useEffect, useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { EditorContext } from "../../hooks/context/EditorContext";
import { ThemeContext } from "../../hooks/context/ThemeContext";
import useAppViewModel from "../../hooks/context/useAppViewModel";
import useDraft from "../../hooks/useDraft";
import useEditor from "../../hooks/useEditor";
import useModal from "../../hooks/useModal";
import ModalDisplay from "../components/ModalDisplay";
import { BookEditorRouteProps } from "../routes/types.nav";
import { globalStyles } from "../styles/styles";
import EditorBasicData from "./layouts/EditorBasicData";
import EditorBottom from "./layouts/EditorBottom";
import EditorStatus from "./layouts/EditorStatus";
import ModalBookFactory, { DraftModalAttributes } from "./layouts/ModalBookFactory";

export default function BookEditor({ route }: { route: BookEditorRouteProps }) {
    const { themeMode } = useContext(ThemeContext)
    const theme = useTheme()

    const { vimo } = useAppViewModel()
    const bookISBN = route.params?.bookISBN
    const { isEditorOpen, toggleEditor } = useContext(EditorContext)
    const [isEditorDisabled, toggleDisabledState] = useEditor()
    const [modalAttributes, setModalAttributes, modalVisibility, setModalVisibility] = useModal<DraftModalAttributes>()
    const [
        isbn,
        title,
        author,
        releaseDate,
        createdDate,
        description,
        grossPricePerUnit,
        inOffer,
        discountPercentage,
        hasIva,
        ivaPercentage,
        stock,
        visible,
        recommended,
        bestSeller,
        recent,
        setBook,
        setBasicProperty,
        setStatusProperty
    ] = useDraft(vimo.getDraft())
    const [clearInputFocus, setClearInputFocus] = useState(false)

    useEffect(() => {
        toggleEditor(true)
        toggleDisabledState(bookISBN !== undefined)
        return () => { if (bookISBN !== undefined) vimo.forceBooksUpdate(); toggleEditor(false) }
    }, [])

    useEffect(() => {
        setModalVisibility(modalAttributes?.modalType !== undefined)
    }, [modalAttributes])

    return <TouchableWithoutFeedback testID="editor" onPress={() => {
        setClearInputFocus(true)
        setClearInputFocus(false)
    }}
        style={{ top: 0, right: 0, bottom: 0, left: 0 }}
    >
        <View pointerEvents={isEditorOpen ? 'auto' : 'none'} style={[globalStyles.common, globalStyles.body, { backgroundColor: themeMode === 'dark' ? theme['background-basic-color-3'] : 'white' }]}>
            <ModalDisplay
                visible={modalVisibility}
                onBackdropPress={() => { if (Keyboard.isVisible()) Keyboard.dismiss(); setModalVisibility(false) }}
            >
                {modalAttributes && <ModalBookFactory
                    {...modalAttributes}
                    onButtonPress={(data: number) => {
                        if (modalAttributes.modalType === "discountPercentage") setStatusProperty('inOffer', true)
                        setStatusProperty(modalAttributes.modalType, data)
                        setModalVisibility(false)
                    }}
                />}
            </ModalDisplay>
            <EditorBasicData
                clearInputFocus={clearInputFocus}
                isNew={bookISBN === undefined}
                isEditorDisabled={isEditorDisabled}
                data={{
                    isbn,
                    // imgRef,
                    title,
                    author,
                    releaseDate,
                    setBasicProperty
                }}
            />
            <EditorStatus
                isEditorDisabled={isEditorDisabled}
                setModalAttributes={setModalAttributes}
                data={{
                    grossPricePerUnit,
                    inOffer,
                    discountPercentage,
                    hasIva,
                    ivaPercentage,
                    stock,
                    visible,
                    recommended,
                    bestSeller,
                    recent,
                    setStatusProperty
                }}
            />
            <EditorBottom
                bookISBN={bookISBN}
                resetBook={setBook}
                isEditorDisabled={isEditorDisabled}
                toggleDisabledState={toggleDisabledState}
                data={{
                    createdDate,
                    description,
                    setBasicProperty
                }}
            />
        </View>
    </TouchableWithoutFeedback>
}
