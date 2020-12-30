import { styled } from '@linaria/react';

const TextInput = styled.input`
  background: #f9f9f9;
  border: 1px solid #dadadc;
  border-radius: 4px;
  padding: 9px 12px;
  font-size: 13px;
  line-height: 1.2;
  color: #151617;
  flex: 1;

  &[data-auto-translate='true'] {
    background: #edf2ff;
    border: 1px solid #2562ff;
  }
`;

export default TextInput;
