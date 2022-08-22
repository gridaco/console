import { styled } from "linaria/react";
import Image from "next/image";
export function GridaLogo() {
  return (
    <span>
      <Image
        src="/brand/logo-black.png"
        width="28px"
        height="28px"
        alt="Grida logo"
      />
    </span>
  );
}
