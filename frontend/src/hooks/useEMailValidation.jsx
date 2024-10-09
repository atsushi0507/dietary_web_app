import { useState } from 'react';

const useEmailValidation = () => {
    const [isValidEmail, setIsValidEmail] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);
        setIsValidEmail(isValid);
        return isValid;
    };

    return { isValidEmail, validateEmail };
};

export default useEmailValidation;
