import styled from "@emotion/styled";

export const OnboardingForms = styled.div<{ gap?: number; maxHeight?: number }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: ${(props) => (props.gap ? props.gap + "px" : "32px")};
  max-height: ${(props) => (props.maxHeight ? props.maxHeight + "px" : "")};
  overflow-y: scroll;
  align-self: stretch;
  box-sizing: border-box;
  flex-shrink: 0;
`;
