import { useMemo } from 'react';

/**
 * Calculate the average PFC (Protein, Fat, Carbohydrate) over 7 days.
 * @param {Array} records - Array of daily meal records.
 * @returns {Array} - Average PFC values formatted as {name, value}.
 */
export const useAveragePFC = (records) => {
    const averagePFC = useMemo(() => {
        if (!records || records.length === 0) return [];

        const totalPFC = records.reduce((acc, record) => {
            acc.protein += parseFloat(record.pfc.protein);
            acc.fat += parseFloat(record.pfc.fat);
            acc.carb += parseFloat(record.pfc.carb);
            return acc;
        }, { protein: 0, fat: 0, carb: 0 });

        const days = records.length;
        return [
            { name: "タンパク質", value: parseFloat((totalPFC.protein / days).toFixed(1)) },
            { name: "脂質", value: parseFloat((totalPFC.fat / days).toFixed(1)) },
            { name: "炭水化物", value: parseFloat((totalPFC.carb / days).toFixed(1)) },
        ];
    }, [records]);

    return averagePFC;
};
