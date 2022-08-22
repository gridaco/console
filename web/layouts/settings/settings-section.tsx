import { Button } from "@editor-ui/console";
import styled from "@emotion/styled";
import React from "react";

export function SettingsFormSection({
  children,
  submit,
  onSubmit,
  ...header_props
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submit: {
    label: string;
  };
} & SettingsSectionHeaderProps &
  React.PropsWithChildren) {
  return (
    <FormSection
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
    >
      <SettingsSectionHeader {...header_props} />
      {children}
      <SubmitLine>
        <Button>{submit.label}</Button>
      </SubmitLine>
    </FormSection>
  );
}

const FormSection = styled.form`
  padding-bottom: 40px;
  input {
    width: 60%;
  }
`;

const SubmitLine = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex: 1;
`;

export function SettingsSection({ children }: React.PropsWithChildren) {
  return <Section>{children}</Section>;
}

const Section = styled.section`
  padding-bottom: 40px;
`;

type SettingsSectionHeaderProps = {
  header: string;
  chip?: React.ReactNode;
  description?: string;
  paddingBottom?: number;
  paddintTop?: number;
};

export function SettingsSectionHeader({
  header,
  description,
  chip,
  paddingBottom = 0,
  paddintTop = 0,
}: SettingsSectionHeaderProps) {
  return (
    <Wrapper pb={paddingBottom || 0} pt={paddintTop || 0}>
      <HeaderContainer>
        <Header>{header}</Header>
        {chip}
      </HeaderContainer>
      {description && <Description>{description}</Description>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  pt: number;
  pb: number;
}>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  flex: none;
  gap: 18px;
  box-sizing: border-box;
  padding-bottom: ${(props) => props.pb}px;
  padding-top: ${(props) => props.pt}px;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex: none;
  gap: 10px;
  box-sizing: border-box;
`;

const Header = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 20px;
  font-family: Inter, sans-serif;
  font-weight: 700;
  text-align: left;
`;

const Description = styled.span`
  color: rgba(0, 0, 0, 0.8);
  text-overflow: ellipsis;
  font-size: 14px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: left;
  align-self: stretch;
  flex-shrink: 0;
`;
