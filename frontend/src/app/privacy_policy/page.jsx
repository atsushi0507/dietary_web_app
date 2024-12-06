"use client";
import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const PrivacyPolicy = () => {
    return (
        <div>
            <Typography variant="h4" align="center">利用規約</Typography>

            <Container>
                <Typography variant="subtitle1">1. 基本方針</Typography>
                <Typography variant="body1">
                    [アプリ名]（以下「当サービス」）は、個人情報の重要性を認識し、その保護に努めます。本ポリシーは、当サービスが収集する個人情報の取り扱いに関する方針を定めたものです。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">2. 収集する情報</Typography>
                <Typography>
                    当サービスは、以下の情報を収集する場合があります。
                    <List>
                        <Item>ユーザー登録時に提供される情報（名前、メールアドレス、パスワードなど）</Item>
                        <Item>サービス利用に伴う記録情報（アクセスログ、利用履歴など）</Item>
                        <Item>その他、サービスの提供に必要な情報</Item>
                    </List>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">3. 情報の利用目的</Typography>
                <Typography variant="body1">
                    当サービスは、収集した個人情報を以下の目的で利用します。
                    <NumberList>
                        <Item>サービス提供および運営のため</Item>
                        <Item>ユーザーサポートのため</Item>
                        <Item>利用状況の分析およびサービス改善のため</Item>
                        <Item>法令に基づく対応のため</Item>
                    </NumberList>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">4. 第三者提供</Typography>
                <Typography variant="body1">
                    当サービスは、以下の場合を除き、個人情報を第三者に提供することはありません。
                    <NumberList>
                        <Item>ユーザーの同意がある場合</Item>
                        <Item>法令に基づき提供が必要な場合</Item>
                        <Item>業務委託に伴い、委託先に必要な範囲で情報を提供する場合</Item>
                    </NumberList>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">5. セキュリティ対策</Typography>
                <Typography variant="body1">
                    当サービスは、個人情報の漏洩、改ざん、紛失を防止するために、適切なセキュリティ対策を講じます。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">6. 個人情報の開示・訂正・削除</Typography>
                <Typography variant="body1">
                    ユーザーは、当サービスが保有する自身の個人情報について、開示、訂正、または削除を請求することができます。その際は、当サービスの指定する方法でご連絡ください。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">7. お問い合わせ</Typography>
                <Typography variant="body1">
                個人情報に関するお問い合わせは、以下の窓口までご連絡ください。
                [メールアドレス: health.hive.appあっとgmail.com
                (あっとは@に変えてください)]
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">8. 改訂</Typography>
                <Typography variant="body1">
                    本ポリシーは、法令やサービス内容の変更により随時改定することがあります。改定後の内容は、当サービス上で通知します。
                </Typography>
            </Container>
        </div>
    );

};

export default PrivacyPolicy;

const Container = styled.div`
    margin-bottom: 10px;
`

const NumberList = styled.ol`
    list-style-type: decimal; /* 順序付きリストの番号スタイル */
    margin-left: 20px; /* 適切なインデント */
    padding-left: 20px; /* 追加のパディング */
`;

const List = styled.li`
    list-style-type: disc;
    margin-left: 20px;
    padding-left: 20px
`

const Item = styled.li`
    margin-bottom: 10px; /* 各アイテム間の余白 */
`;
