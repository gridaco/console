import React from "react";
import { styled } from "@linaria/react";

import DashboardAppbar from "../components/appbar/dashboard.appbar";
import Button from "../components/button";

const Home = () => {
    return (
        <>
            <DashboardAppbar />
            <Wrapper>
                <BannerWrapper>
                    <BannerContainer>
                        <CreateButton>Create New</CreateButton>
                    </BannerContainer>
                </BannerWrapper>
            </Wrapper>
        </>
    );
};

export default Home;

const Wrapper = styled.main`
    flex: 1;
    padding-top: 55px;
    padding-bottom: 55px;
`;

const BannerWrapper = styled.div`
    background-color: #f4f4f4;
    width: 100%;
    height: 32vh;
    display: flex;
`;

const BannerContainer = styled.div`
    width: 92%;
    margin: 0 auto;
    position: relative;
`;

const CreateButton = styled(Button)`
    position: absolute;
    bottom: -26px;
    right: 0;
`;
