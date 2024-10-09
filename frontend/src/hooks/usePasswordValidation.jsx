import { useState } from 'react';

const usePasswordValidation = () => {
    const [isValidPassword, setIsValidPassword] = useState(false);

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W_]).{8,64}$/;
        const isValid = passwordRegex.test(password);
        setIsValidPassword(isValid);
        return isValid;
    };

    return { isValidPassword, validatePassword };
};

export default usePasswordValidation;
