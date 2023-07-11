import { Button, Datepicker, DatepickerProps, I18nConfig, Icon, NativeDateService, useTheme } from "@ui-kitten/components";
import { createRef } from "react";
import { View } from "react-native";

export default function DatePicker(props: DatepickerProps) {
    const theme = useTheme()

    const i18n: I18nConfig = {
        dayNames: {
            short: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
            long: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
        },
        monthNames: {
            short: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            long: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
        },
    };
    const localeDateService = new NativeDateService("ec", { i18n, startDayOfWeek: 1 });
    const componentRef = createRef<Datepicker>();

    const IrAHoy = () => (
        <View style={{ alignItems: "center" }}>
            <Button size="tiny" style={{ width: "30%", marginVertical: 2 }} onPress={() => {
                if (componentRef.current) componentRef.current.scrollToToday();
            }}>
                Ir a hoy
            </Button>
        </View>
    );

    const DatepickerIcon = () => <Icon name="calendar" fill={theme['background-alternative-color-4']} height="15" width="15" />;
    return <Datepicker
        ref={componentRef}
        {...props}
        size="small"
        accessoryLeft={props.accessoryLeft || DatepickerIcon}
        min={new Date(1900, 0, 1)}
        dateService={localeDateService}
        renderFooter={IrAHoy}
    />
}

export const toDate = function (date: string) {
    try {
        if (!new RegExp(/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}/).test(date)) throw Error('Fecha debe estar en formato (dd/MM/yyyy)');

        const dateSplitted = date.split("/");
        return new Date(
            Number.parseInt(dateSplitted[2]),
            Number.parseInt(dateSplitted[1]) - 1,
            Number.parseInt(dateSplitted[0])
        );
    } catch (error) {
        console.error(error);
        return new Date()
    }
};