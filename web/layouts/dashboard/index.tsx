import React from "react";
import { styled } from "@linaria/react";
import DashboardAppbar from "../../components/appbar/dashboard.appbar";
import { DashboardSideNavigationBar } from "../../components/side-navigation-bar/dashboard-side-navigation-bar";

export default function DashboardLayout(props: { children: JSX.Element }) {
    return (
        <>
            <DashboardAppbar />
            <ContentWrapper>
                <DashboardSideNavigationBar />
                <ContentPage>{props.children}</ContentPage>
            </ContentWrapper>
        </>
    );
}

const ContentWrapper = styled.div`
    display: flex;
    flex: 1;
`;

const ContentPage = styled.div`
    flex: 1;
    padding: 0 72px;
    padding-top: 80px;
    padding-bottom: 55px;
    margin-left: 200px;
`;
