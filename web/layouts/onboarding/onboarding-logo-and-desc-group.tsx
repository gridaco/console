import React, { useRef } from "react";
import { styled } from "linaria/react";

export function OnboardingLogoAndDesc({
  logo,
  description,
}: {
  logo: string;
  description: {
    message: string;
    button: boolean;
  };
}) {
  const inputFile = useRef<HTMLInputElement>(null);

  const onClick = () => {
    inputFile?.current?.click();
  };

  return (
    <Wrap>
      <LogoArtwork onClick={onClick} src={logo} />
      <Description
        onClick={() => {
          if (description.button) {
            onClick();
          }
        }}
      >
        {description.message}
      </Description>
      <input
        type="file"
        id="file"
        accept="image/png, image/jpeg"
        ref={inputFile}
        style={{ display: "none" }}
      />
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  flex: none;
  gap: 8px;
  box-sizing: border-box;
`;

const LogoArtwork = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
`;

const Description = styled.span`
  color: black;
  text-overflow: ellipsis;
  font-size: 12px;
  font-family: Inter, sans-serif;
  font-weight: 400;
  text-align: center;
  opacity: 0.5;
`;
