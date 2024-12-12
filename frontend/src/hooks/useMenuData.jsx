import axios from "axios";
import React, { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "menuCache";

// カスタムフック
export const useMenuData = () => {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 初期化: ローカルストレージから読み込み or Firestoreから取得
    useEffect(() => {
        const cachedData = loadFromLocalStorage();
        if (cachedData.length > 0) {
            setMenuData(cachedData);
            setLoading(false);
        } else {
            fetchAndCacheData();
        }
    }, []);

    // Firestoreからデータを取得してキャッシュする
    const fetchAndCacheData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://asia-northeast1-dietary-web-app.cloudfunctions.net/get_nutrition"
            )
            const data = response.data.nutrition_data;
            setMenuData(data);
            saveToLocalStorage(data);
        } catch (error) {
            console.error("Error fetching data from Firestore:", error);
        } finally {
            setLoading(false);
        }
    };

    return { menuData, loading, refetch: fetchAndCacheData };
};

// ローカルストレージ操作
const loadFromLocalStorage = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

const saveToLocalStorage = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};
