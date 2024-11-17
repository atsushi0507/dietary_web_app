import Link from "@/components/atoms/Link";
import Text from "@/components/atoms/Text";
import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Registered = () => {
    return (
        <>
            <Typography variant="body1">
                本登録が完了しました。
            </Typography>
            <Typography variant="body1">
                5秒後に初期設定画面に移動します。移動しない場合は{
                    <Link to="initial_setting" external={false}>
                        こちら
                    </Link>
                }をクリックしてください。
            </Typography>
        </>
    );
};

export default Registered;