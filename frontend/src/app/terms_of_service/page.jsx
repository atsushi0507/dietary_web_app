"use client";
import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";

const TermsOfService = () => {
    return (
        <div>
            <Typography variant="h4" align="center">利用規約</Typography>

            <Container>
                <Typography variant="subtitle1">第1条 (適用)</Typography>
                <Typography variant="body1">
                    本規約は、[アプリ名]（以下「当サービス」といいます）の利用に関する条件を定めるものです。当サービスをご利用いただく方（以下「ユーザー」といいます）は、本規約に同意したものとみなします。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第2条 (利用登録)</Typography>
                <Typography>
                    <NumberList>
                        <Item>ユーザーは、当サービスが定める方法により利用登録を行うものとします。</Item>
                        <Item>利用登録の際に提供する情報は、正確かつ最新の内容を保証するものとします。</Item>
                        <Item>当サービスは、利用登録申請者が以下の事由に該当する場合、登録を拒否することがあります。</Item>
                        <List>
                            <Item>利用登録申請時に虚偽の情報を提供した場合</Item>
                            <Item>過去に本規約に違反したことがある場合</Item>
                            <Item>その他、当サービスが利用登録を適当でないと判断した場合</Item>
                        </List>
                    </NumberList>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第3条 (禁止事項)</Typography>
                <Typography variant="body1">
                    ユーザーは、当サービスの利用にあたり、以下の行為を行ってはなりません。
                    <NumberList>
                        <Item>法令または公序良俗に違反する行為</Item>
                        <Item>サービスの運営を妨害する行為</Item>
                        <Item>他のユーザーまたは第三者の権利を侵害する行為</Item>
                        <Item>不正アクセスやクラッキング行為</Item>
                        <Item>その他、当サービスが不適切と判断する行為</Item>
                    </NumberList>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第4条 (免責事項)</Typography>
                <Typography variant="body1">
                    <NumberList>
                        <Item>当サービスは、提供する情報の正確性や完全性を保証するものではありません。</Item>
                        <Item>ユーザーが当サービスを利用することで被った損害について、一切の責任を負いません。</Item>
                        <Item>当サービスは、事前通知なしにサービスの内容を変更または停止することがあります。</Item>
                    </NumberList>
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第5条 (サービス内容の変更・終了)</Typography>
                <Typography variant="body1">
                    当サービスは、事前の通知なくサービスの内容を変更または終了することができるものとします。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第6条 (利用規約の変更)</Typography>
                <Typography variant="body1">
                    当サービスは、必要に応じて本規約を変更することがあります。変更後の規約は、当サービスが別途定める方法で通知します。
                </Typography>
            </Container>

            <Container>
                <Typography variant="subtitle1">第7条 (準拠法および管轄)</Typography>
                <Typography variant="body1">
                    本規約は、日本法に準拠し解釈されます。また、当サービスに関する紛争は、[所在地の管轄裁判所]を専属的合意管轄とします。
                </Typography>
            </Container>
        </div>
    );

};

export default TermsOfService;

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
