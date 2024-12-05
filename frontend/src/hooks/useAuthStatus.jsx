"use client";

import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth(); // Firebase Auth インスタンスを取得
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true); // ユーザーがログインしている場合
            } else {
                setIsLoggedIn(false); // ユーザーがログアウトしている場合
            }
            setLoading(false); // 状態の更新が完了
        });

        // クリーンアップ関数: リスナーの解除
        return () => unsubscribe();
    }, []);

    return { isLoggedIn, loading };
};

export default useAuthStatus;
