import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig"

// Firestoreから全てのメニューを取得
export const getFirestoreData = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "nutrition_data"));
        const menus = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return menus;
    } catch (error) {
        console.error("Error fetching menus:", error);
        throw error;
    }
};
