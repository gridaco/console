import React from 'react';
import Modal from 'react-modal';
import { styled } from '@linaria/react';

interface IPublishModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const PublishModal: React.FC<IPublishModal> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={modalStyles}>
      <Container>
        <Header>
          <Icon src="/assets/icons/mdi_error_round.svg" />
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
        <ButtonList>
          <CancelButton style={{ marginRight: 12 }}>
            <span>Cancel</span>
          </CancelButton>
          <ChangeButton onClick={onClose}>
            <span>Change</span>
          </ChangeButton>
        </ButtonList>
      </Container>
    </Modal>
  );
};

export default PublishModal;

const Container = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  min-width: 396px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 20px;
  line-height: 1.15;
  color: #000000;
`;

const Content = styled.p`
  margin: 0;
  margin-top: 12px;
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 1.2;
  color: #151617;
`;

const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const CancelButton = styled.button`
  border: 0;
  background: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  padding: 12px 16px;
  cursor: pointer;

  span {
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: 0.3px;
    color: #717278;
  }
`;

const ChangeButton = styled(CancelButton)`
  background: #f5c242;

  span {
    font-weight: bold;
    color: #151617;
  }
`;

const modalStyles: object = {
  content: {
    overflow: 'unset',
    position: 'unset',
    width: 'fit-content',
    inset: 0,
    border: 0,
    background: 'transparent',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    justifyContent: 'center',
  },
};
