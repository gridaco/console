import { GridaLogo } from "components/logo";
import { styled } from "linaria/react";
import { useRouter } from "next/router";

export function SettingsAppbar() {
  const router = useRouter();

  return (
    <Wrap>
      <HomeButton
        onClick={() => {
          router.push("/");
        }}
      >
        <GridaLogo />
        <HomeText>Console</HomeText>
      </HomeButton>
    </Wrap>
  );
}

const Wrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 16px 0px 12px 73px;
  z-index: 9;
  background: white;

  @media (max-width: 768px) {
    padding: 16px 0px 12px 36px;
  }
`;

const HomeText = styled.span`
  user-select: none;
  font-weight: 700;
  font-size: 14px;
`;

const HomeButton = styled.button`
  height: 36px;
  border-radius: 4px;
  gap: 8px;
  display: flex;
  align-items: center;
  border: none;
  background: none;
  padding: 4px;

  :hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :active {
    background: rgba(0, 0, 0, 0.1);
  }

  transition: all 0.2s ease-in-out;
`;
