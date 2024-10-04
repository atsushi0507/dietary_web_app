import React from "react";
import styled from "styled-components";

const Text = ({ children, fontWeight = 'normal', textAlign = 'left', as: Component = 'p' }) => {
    return (
      <Component style={{ fontWeight, textAlign }}>
        {children}
      </Component>
    );
  };

export default Text;
