import React from "react";

const MealRecordDisplay = ({ mealData }) => {
    // mealDataからmealRecordsを取得
    const { mealRecords } = mealData;

    return (
        <div>
            {Object.entries(mealRecords).map(([mealType, menus]) => {
                if (menus === null) {
                    return (
                        <div key={mealType}>
                            <strong>{mealType}:</strong> 記録なし
                        </div>
                    );
                } else {
                    const totalCalories = menus.reduce((sum, menu) => sum + menu.calories, 0);
                    const menuList = menus.map(menu => menu.name).join("、");

                    return (
                        <div key={mealType}>
                            <strong>{mealType}:</strong> {menuList} ({totalCalories} kcal)
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default MealRecordDisplay;
