import IconButton from "@/components/atoms/IconButton";
import React, { useState } from "react";
import styled from "styled-components";
import MealRecordDisplay from "./mealRecordDisplay";
import InputMeal from "./inputMeal";

const mealType = [
    "朝食",
    "昼食",
    "夕食",
    "間食"
];

const MealRecord = ({ date, menuData }) => {
    const [selectedMeal, setSelectedMeal] = useState(null);

    const handleClickButton = (newMealType) => {
        setSelectedMeal(newMealType);
    }

    return (
        <>
            <ButtonArray>
                {mealType.map((meal) => {
                    return (
                        <div key={meal}>
                            <IconButton
                                key={meal}
                                text={meal}
                                onClick={() => handleClickButton(meal)}
                                isactive={selectedMeal === meal}
                            />
                        </div>
                    )
                })}
            </ButtonArray>
            {selectedMeal === null && <MealRecordDisplay date={date}/>}
            {selectedMeal !== null && <InputMeal selectedMeal={selectedMeal} setSelectedMeal={setSelectedMeal} date={date} menuData={menuData}/>}
        </>
    );
};

export default MealRecord;

const ButtonArray = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`