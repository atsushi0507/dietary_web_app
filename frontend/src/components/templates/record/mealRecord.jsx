import IconButton from "@/components/atoms/IconButton";
import React from "react";
import styled from "styled-components";

const mealType = [
    "朝食",
    "昼食",
    "夕食",
    "間食"
];

const MealRecord = () => {
    return (
        <>
            <ButtonArray>
                {mealType.map((meal) => {
                    return (
                        <IconButton
                            key={meal}
                            text={meal}
                            onClick={() => console.log(`${meal}`)}
                        />
                    )
                })}
            </ButtonArray>
        </>
    );
};

export default MealRecord;

const ButtonArray = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`