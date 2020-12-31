import React from 'react';
import { styled } from '@linaria/react';

interface IBottomBar {
  changes: number;
}

const BottomBar: React.FC<IBottomBar> = ({ changes }) => {
  return (
    <Container>
      <Information>
        <PublishIconWrapper style={{ marginRight: 12 }}>
          <PublishIcon src="/assets/icons/mdi_publish_round.svg" />
        </PublishIconWrapper>
        <Message>
          <strong>{changes.toLocaleString()}</strong> Changes ready to publish
        </Message>
      </Information>
      <ButtonList>
        <OutlineButton style={{ marginRight: 12 }}>
          <span>Review</span>
        </OutlineButton>
        <PublishButton>
          <Circle style={{ marginRight: 8 }}>
            <span>{changes.toLocaleString()}</span>
          </Circle>
          <span>Publish</span>
        </PublishButton>
      </ButtonList>
    </Container>
  );
};

export default BottomBar;

const Container = styled.div`
  background: #151617;
  box-shadow: inset 0px 1px 0px #eeeeee;
  padding: 16px 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Information = styled.div`
  display: flex;
  align-items: center;
`;

const PublishIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #312d24;
  border: 1px solid #f5c242;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
`;

const PublishIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Message = styled.p`
  margin: 0;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.2;
  letter-spacing: 0.3px;
  color: #ffffff;

  & > strong {
    font-weight: 700;
  }
`;

const ButtonList = styled.div`
  display: flex;
  align-items: center;
`;

const DefaultButton = styled.button`
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 12px;
  cursor: pointer;
`;

const OutlineButton = styled(DefaultButton)`
  border: 1px solid #ffffff;

  & > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 1.2;
    color: #ffffff;
  }
`;

const PublishButton = styled(DefaultButton)`
  background: #f5c242;

  & > span {
    font-weight: bold;
    font-size: 14px;
    line-height: 1.2;
    color: #151617;
  }
`;

const Circle = styled.span`
  border: 1px solid #151617;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  & > span {
    font-weight: bold;
    font-size: 11px;
    line-height: 1.2;
    display: flex;
    align-items: center;
    color: #151617;
  }
`;
