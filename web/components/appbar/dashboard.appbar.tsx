import React from "react";
import { styled } from "@linaria/react";

import logoImage from "../../assets/brand/logo.png";

export default function DashboardAppbar() {
    return (
        <Container>
            <LogoImage src={logoImage} />
            <Title>Overview</Title>
            <Toolbar>
                <ProfileImage src="/assets/examples/profile.png" />
            </Toolbar>
        </Container>
    );
}

const Container = styled.header`
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
`;

const LogoImage = styled.img`
    width: 27.68px;
    height: 28px;
`;

const Title = styled.span`
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: white;
    letter-spacing: 0.3px;
`;

const Toolbar = styled.div``;

const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`;
