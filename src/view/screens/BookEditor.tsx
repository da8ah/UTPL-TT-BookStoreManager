import { useTheme } from "@ui-kitten/components";
import { useContext, useEffect } from "react";
import { Keyboard, View } from "react-native";
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
        setBasicProperty,
        setStatusProperty
    ] = useDraft(vimo.getDraft())

    useEffect(() => {
        toggleEditor(true)
        toggleDisabledState(bookISBN !== undefined)
        return () => { toggleEditor(false) }
    }, [])

    useEffect(() => {
        setModalVisibility(modalAttributes?.modalType !== undefined)
    }, [modalAttributes])

    return <View pointerEvents={isEditorOpen ? 'auto' : 'none'} style={[globalStyles.common, globalStyles.body, { backgroundColor: themeMode === 'dark' ? theme['background-basic-color-3'] : 'white' }]}>
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
            isEditorDisabled={isEditorDisabled}
            toggleDisabledState={toggleDisabledState}
            data={{
                createdDate,
                description,
                setBasicProperty
            }}
        />
    </View>
}
