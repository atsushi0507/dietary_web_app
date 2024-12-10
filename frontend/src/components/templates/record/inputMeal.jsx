import MenuCard from "@/components/molecules/menuCard";
import TextSearch from "@/components/molecules/textSearch";
import Button from "@/components/atoms/Button";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MenuEntry from "@/components/molecules/menuEntry";
import { Typography } from "@mui/material";
import RegisterMealForm from "@/components/organisms/RegisterMealForms";

const user_id = "test-user-123";

const sampleSearchData = [
    { menu: "チキンカツ", cal: 270.0 },
    { menu: "とんかつ", cal: 310.0 },
    { menu: "タコス", cal: 189.0 },
    { menu: "コーヒー牛乳", cal: 210 },
    { menu: "チャーハン", cal: 168 },
];

const InputMeal = ({ date, selectedMeal, setSelectedMeal }) => {
    const [strMenu, setStrMenu] = useState("");
    const [doSearch, setDoSearch] = useState(false);
    const [menuSelections, setMenuSelections] = useState({});
    const [sampleData, setSampleData] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 食事タイプが切り替わった際に状態をリセット
        setSampleData([]);
        setMenuSelections({});
        setDoSearch(false);
    }, [selectedMeal]);

    const handleMenuChange = (menu, volume) => {
        setMenuSelections((prevState) => ({
            ...prevState,
            [menu]: volume,
        }));
    };

    const handleSearch = (e) => {
        setStrMenu(e.target.value);
    };

    const onClickSearchButton = () => {
        setDoSearch(true);
    };

    const handleRegisterMeal = () => {
        const tmpData = {
            user_id,
            date,
            meal_type: selectedMeal,
            menus: menuSelections,
        };
        saveMealRecord(tmpData);
        resetState();
        setSelectedMeal(null);
    };

    const handleNoMeal = () => {
        const tmpData = {
            user_id,
            date,
            meal_type: selectedMeal,
            menus: {"食べなかった": 1},
        };
        saveMealRecord(tmpData);
        resetState();
        setSelectedMeal(null);
    };

    const handleDeleteMenu = (menu) => {
        setMenuSelections((prevSelections) => {
            // 新しいオブジェクトを作成して対象のキーを削除
            const updatedSelections = { ...prevSelections };
            delete updatedSelections[menu];
            return updatedSelections;
        });

        setSampleData((prevData) => prevData.filter((item) => item.menu !== menu));
    };

    const handleFormOpen = () => {
        setIsFormOpen(true);
        setError(null);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setError(null);
    };

    const validateFormData = (formData) => {
        const errors = {};
        const floatFields = ["cal", "protein", "fat", "carbs", "volume"];
    
        // メニュー名のチェック
        if (!formData.menu.trim()) {
          errors.menu = "メニュー名を入力してください。";
        }
    
        // 数値フィールドのチェック
        floatFields.forEach((field) => {
          if (!formData[field] || isNaN(formData[field])) {
            errors[field] = `${field} は数値を入力してください。`;
          } else if (parseFloat(formData[field]) < 0) {
            errors[field] = `${field} は0以上の値を入力してください。`;
          }
        });
    
        return errors;
      };

      const handleFormSubmit = (formData) => {
        const errors = validateFormData(formData);
    
        if (Object.keys(errors).length > 0) {
          setError(errors); // エラーを表示
          return; // エラーがある場合でもフォームは閉じない
        }
    
        setError(null); // エラーをリセット
        console.log("Registered data:", {
          ...formData,
          cal: parseFloat(formData.cal).toFixed(1),
          protein: parseFloat(formData.protein).toFixed(1),
          fat: parseFloat(formData.fat).toFixed(1),
          carbs: parseFloat(formData.carbs).toFixed(1),
          volume: parseFloat(formData.volume).toFixed(1),
        });
    
        // Firestoreに登録する処理をここに追加
    
        handleFormClose(); // エラーがない場合のみフォームを閉じる
      };

    const saveMealRecord = (mealData) => {
        const mealRecords = JSON.parse(localStorage.getItem("mealRecord")) || {};

        if (!mealRecords[mealData.date]) mealRecords[mealData.date] = {};
        if (!mealRecords[mealData.date][mealData.meal_type])
            mealRecords[mealData.date][mealData.meal_type] = {};

        Object.entries(mealData.menus).forEach(([menu, volume]) => {
            mealRecords[mealData.date][mealData.meal_type][menu] = volume;
        });

        localStorage.setItem("mealRecord", JSON.stringify(mealRecords));
    };

    const resetState = () => {
        setSampleData([]);
        setMenuSelections({});
        setStrMenu("");
        setDoSearch(false);
    };

    const handleSelectedMenu = (data) => {
        setSampleData((prevData) => [
            ...prevData,
            { menu: data.menu, cal: data.cal },
        ]);
        setDoSearch(false);
    };

    const filteredResults = sampleSearchData.filter((data) =>
        data.menu.includes(strMenu)
    );

    return (
        <>
            <TextSearch
                strMenu={strMenu}
                setStrMenu={handleSearch}
                handleSearch={onClickSearchButton}
            />

            {!doSearch &&
                sampleData.map((data) => (
                    <MenuCard
                        key={data.menu}
                        menuData={data}
                        onVolumeChange={handleMenuChange}
                        onDelete={handleDeleteMenu}
                    />
                ))}
            {doSearch && filteredResults.length > 0 &&
                filteredResults.map((data) => (
                    <MenuEntry
                        key={data.menu}
                        menuResult={data}
                        handleAddMeal={handleSelectedMenu}
                    />
                ))}
            {doSearch && filteredResults.length === 0 && (
                <>
                    <StyledLink onClick={handleFormOpen}>
                        <Typography variant="body1">新しいメニューを登録</Typography>
                    </StyledLink>
                        <RegisterMealForm
                            open={isFormOpen}
                            onClose={handleFormClose}
                            onSubmit={handleFormSubmit}
                            error={error}
                        />
                </>
            )}
            <ButtonArray>
                <Button onClick={handleNoMeal}>食べなかった</Button>
                <Button onClick={handleRegisterMeal}>登録</Button>
            </ButtonArray>
        </>
    );
};

export default InputMeal;

const ButtonArray = styled.div`
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
`;

const StyledLink = styled.a`
    text-decoration: underline;
    color: #333;
    cursor: pointer;
    transition: color 0.5s;

    &:hover {
        color: #3f3f3f;
        text-decoration: none;
    }

    &:active {
        color: #00376d;
    }
`;