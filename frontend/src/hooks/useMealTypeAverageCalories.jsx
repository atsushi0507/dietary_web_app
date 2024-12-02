import { useMemo } from 'react';

/**
 * Calculate the average calories per meal type over 7 days.
 * @param {Array} records - Array of daily meal records returned by useCalcWeeklyNutrition.
 * @returns {Array} - Average calories per meal type formatted as {name, value}.
 */
export const useMealTypeAverageCalories = (records) => {
    const averageMealCalories = useMemo(() => {
        if (!records || records.length === 0) return [];

        const mealTypeSums = {};
        const mealTypeCounts = {};

        records.forEach(record => {
            if (record.balance) {
                Object.entries(record.balance).forEach(([mealType, percentage]) => {
                    const mealCalories = record.totalCalories * parseFloat(percentage); // カロリー割合から実数を計算
                    if (!mealTypeSums[mealType]) {
                        mealTypeSums[mealType] = 0;
                        mealTypeCounts[mealType] = 0;
                    }
                    mealTypeSums[mealType] += mealCalories;
                    mealTypeCounts[mealType] += 1;
                });
            }
        });

        return Object.keys(mealTypeSums).map(mealType => ({
            name: mealType,
            value: parseFloat((mealTypeSums[mealType] / mealTypeCounts[mealType]).toFixed(1)),
        }));
    }, [records]);

    return averageMealCalories;
};
