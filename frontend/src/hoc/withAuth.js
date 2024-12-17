"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useRouter();
        const auth = getAuth();
        const user = auth.currentUser; // ログイン状態を取得
        const userInfo = localStorage.getItem("userData");

        useEffect(() => {
            if (!user) {
                router.push("/register_login"); // ログインしていない場合はトップページにリダイレクト
            }

            if (!userInfo) {
                router.push("/initial_setting");
            }
        }, [user]);

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;
