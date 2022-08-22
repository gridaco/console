import { styled } from "linaria/react";
import React from "react";
import { SettingsAppbar } from "./settings-appbar";

export function SettingsPage({ children }: React.PropsWithChildren) {
  return (
    <Page>
      <SettingsAppbar />
      {children}
    </Page>
  );
}

export function SettingsNavigation({ children }: React.PropsWithChildren) {
  return <Nav>{children}</Nav>;
}

export function SettingsBody({ children }: React.PropsWithChildren) {
  return <Body>{children}</Body>;
}

export function SettingsMain({ children }: React.PropsWithChildren) {
  return <Main>{children}</Main>;
}

export function SettingsHeader({ children }: React.PropsWithChildren) {
  return <Header>{children}</Header>;
}

const Page = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex: none;
  min-height: 100vh;
  background-color: white;
  box-sizing: border-box;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;

  .header {
    margin-top: 100px;
  }

  padding-right: 80px;
  padding-left: 80px;

  @media (max-width: 768px) {
    padding-right: 40px;
    padding-left: 40px;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-start;
  flex: none;
  box-sizing: border-box;
  padding: 80px 0px 120px;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: flex-start;
  flex: 1;
  gap: 18px;
  box-sizing: border-box;
  padding: 40px 0px 0px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 260px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Main = styled.main`
  overflow: hidden;
  position: relative;
  align-self: stretch;
  flex-shrink: 0;
  flex: 1;
`;
