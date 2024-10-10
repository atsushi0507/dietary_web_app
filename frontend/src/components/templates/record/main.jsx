import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import Text from "@/components/atoms/Text";
import Calendar from "@/components/atoms/Calendar";
import dayjs from "dayjs";

const RecordTop = () => {
    const [date, setDate] = useState(dayjs());
    console.log(date);

    const handleDateChange = (newDate) => {
        // const formattedDate = newDate ? newDate.format("YYYY/MM/DD") : null;
        setDate(newDate)
    };

    return (
        <Grid container direction="column">
            <Grid size={4}>
                <Calendar 
                    value={date}
                    onDateChange={handleDateChange}
                />
            </Grid>
            <Grid size={8}>
                <Text>
                    Hello2
                </Text>
            </Grid>
        </Grid>
    );
};

export default RecordTop;