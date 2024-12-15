import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { surfacesCustomizations } from "./customizations/surfaces";
import { feedbackCustomizations } from "./customizations/feedback";

const AppTheme = (props) => {
    const { children, disableCustomTheme, themeComponents } = props;
    const theme = useMemo(() => {
        return disableCustomTheme
        ? {}
        : createTheme({
            cssVariables: {
                colorSchemeSelector: "data-mui-color-scheme",
                cssVarPrefix: "template",
            },
            colorSchemes,
            typography,
            shadows,
            shape,
            components: {
                ...surfacesCustomizations,
                ...feedbackCustomizations
            }
        });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return <>{children}</>
    }
    return (
        <ThemeProvider theme={theme} disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}

AppTheme.propTypes = {
    children: PropTypes.node,
    disableCustomTheme: PropTypes.bool,
    themeComponents: PropTypes.object
};

export default AppTheme;