import Link from "@/components/atoms/Link";
import Text from "@/components/atoms/Text";
import React from "react";
import styled from "styled-components";

const Registered = () => {
    return (
        <>
            <Text>
                本登録が完了しました。
            </Text>
            <Text>
                5秒後に初期設定画面に移動します。移動しない場合は{
                    <Link to="initial_setting" external={false}>
                        こちら
                    </Link>
                }をクリックしてください。
            </Text>
        </>
    );
};

export default Registered;