import { styled } from "@linaria/react";

export default styled.button`
  background: #000000;
  border: 0;
  border-radius: 4px;
  padding: 20px 40px;
  color: white;
  font-weight: 900;
  font-size: 18px;
  line-height: 21px;
  cursor: pointer;

  &:active,
  &:focus {
    outline: 0;
  }
`;
