import React from 'react';
import { styled } from '@linaria/react';

import Modal, { IModal } from './atom.modal';

interface IPublishModal extends IModal {
  title: string;
}

const PublishModal: React.FC<IPublishModal> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Container>
        <Header>
          <Icon src="/assets/icons/mdi_error_round.svg" />
          <Title>{title}</Title>
        </Header>
        <Content>{children}</Content>
        <ButtonList>
          <CancelButton onClick={onClose} style={{ marginRight: 12 }}>
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
