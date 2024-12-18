import axios from "axios";
import React, { useState, useEffect } from "react";
import sampleDB from "@/public/sampleDB.json";

const LOCAL_STORAGE_KEY = "menuCache";
const LAST_FETCH_TIME_KEY = "lastFetchTime";
const REFRESH_INTERVAL = 24 * 60 * 60 * 1000; // 本番用: 24時間 (86400000ms)
const DEV_REFRESH_INTERVAL = 30 * 1000; // 開発用: 30秒 (必要に応じて変更)

// カスタムフック
export const useMenuData = () => {
    const [menuData, setMenuData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initializeMenuData();
    }, []);

    const initializeMenuData = () => {
        const cachedData = loadFromLocalStorage();
        const lastFetchTime = loadLastFetchTime();

        const now = Date.now();
        const shouldFetchFromFirestore =
            !cachedData.length || now - lastFetchTime > REFRESH_INTERVAL;

        if (shouldFetchFromFirestore) {
            fetchAndCacheData();
        } else {
            const mergedData = mergeWithSampleDB(cachedData);
            setMenuData(mergedData);
            setLoading(false);
        }
    };

    const fetchAndCacheData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://asia-northeast1-dietary-web-app.cloudfunctions.net/get_nutrition"
            );
            const rawData = response.data.nutrition_data;

            // isVerifiedがtrueのデータのみ残す
            const verifiedData = rawData.filter((item) => item.isVerified);

            // ローカルストレージに保存
            saveToLocalStorage(verifiedData);
            saveLastFetchTime(Date.now());

            // ローカルデータとサンプルDBを結合
            const mergedData = mergeWithSampleDB(verifiedData);
            setMenuData(mergedData);
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

const loadLastFetchTime = () => {
    const lastFetch = localStorage.getItem(LAST_FETCH_TIME_KEY);
    return lastFetch ? parseInt(lastFetch, 10) : 0;
};

const saveLastFetchTime = (time) => {
    localStorage.setItem(LAST_FETCH_TIME_KEY, time.toString());
};

// サンプルDBとローカルストレージデータをマージ
const mergeWithSampleDB = (localData) => {
    const sampleData = sampleDB.map((item) => ({
        ...item,
        isVerified: true, // サンプルDBは常に検証済みとする
    }));
    return [...sampleData, ...localData];
};
