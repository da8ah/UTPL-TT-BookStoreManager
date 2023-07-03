import { useState } from "react";

export default function useDatePicker(initialDate: Date = new Date()) {
    const [date, setDate] = useState<Date>(initialDate);
    return { date, onSelect: setDate };
};