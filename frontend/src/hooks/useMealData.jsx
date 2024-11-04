import React, { useEffect, useState } from "react";
import sampleDB from "@/public/sampleDB.json";

const useCalcNutrition = () => {
    const [nutritionData, setNutritionData] = useState(null);

    useEffect(() => {
        const mealRecords = JSON.parse(localStorage.getItem("mealRecords"));
        console.log("In custom hook", mealRecords);
        if (!mealRecords || !mealRecords.menus){ console.log("Null!"); return};

        // fetch("/sampleDB.json")
        // .then((records) => response.json())
        // .then((sampleDB) => {
        //     console.log("Find DB");
        console.log(sampleDB);
        const calculatedData = Object.entries(mealRecords.menus).map(([menuName, volume]) => {
            const itemData = sampleDB.find(item => item.menu === menuName);
            if (!itemData) return null;

            const volumeRatio = volume;

            return {
                menu: menuName,
                calories: (itemData.cal * volumeRatio).toFixed(1),
                protein: (itemData.protein * volumeRatio).toFixed(1),
                fat: (itemData.fat * volumeRatio).toFixed(1),
                carb: (itemData.carb * volumeRatio).toFixed(1)
            };
        }).filter(item => item !== null);
        setNutritionData(calculatedData);
        // })
        // .catch((error) => console.error("Error loading sampleDB", error));
    }, []);

    return nutritionData;
};

export default useCalcNutrition;