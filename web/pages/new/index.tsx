import React from "react";
import { styled } from "linaria/react";
import {
  OnboardingBody,
  OnboardingForms,
  OnboardingHeader,
  OnboardingLogoAndDesc,
  OnboardingPage,
} from "layouts/onboarding";
import { Button, Divider, TextField, TextFormField } from "@editor-ui/console";
import { useEffect } from "react";
import type { GetArrayElementType } from "utils/utility-types";
import { validateEmail } from "utils/validatiors";
import { useRouter } from "next/router";

const steps = ["essential", "invite"] as const;

export default function NewWrokspaceOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = React.useState<GetArrayElementType<typeof steps>>(
    steps[0]
  );

  const Body = () => {
    switch (step) {
      case "essential":
        return <EssentialFrom onSubmit={() => setStep(steps[1])} />;
      case "invite":
        return <InviteForm />;
    }
  };

  return (
    <OnboardingPage>
      <OnboardingBody>
        <Body />
      </OnboardingBody>
      <CancelContainer>
        <Button
          height={"40px"}
          color="white"
          onClick={() => {
            router.replace("/");
          }}
        >
          Cancel
        </Button>
      </CancelContainer>
    </OnboardingPage>
  );
}

const CancelContainer = styled.div`
  position: absolute;
  right: 21px;
  top: 21px;
`;

/**
 * `<EssentialFrom>` ('/new#essential (empty)')
 * - [Open in Figma](https://figma.com/file/MikewnarPfpWXfRNVX1H6c?node-id=1412:20437)
 * - [Open in Grida](https://code.grida.co/files/MikewnarPfpWXfRNVX1H6c?node=1412:20437)
 *
 *
 * ---
 * @example
 * ```tsx
 * import React from "react";
 *
 * export default function () {
 *   return (
 *     <>
 *       👇 instanciate widget like below. 👇
 *       <EssentialFrom/>
 *     </>
 *   )
 * }
 * ```
 * ---
 * @params {any} props - this widget does not requires props. you can pass custom dynamic props to the widget as you want (on typescript, it will raise type check issues).
 * ---
 * @preview
 * ![](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/24ccaf9f-6a4d-4522-9dfe-c18412c1bc13)
 * ---
 * @remarks
 * @see {@link https://grida.co/docs} for more information.
 * ---
 * Code generated by grida.co | engine 0.0.1 (Apache-2.0) | Generated code under CC0 (public domain) *This code is free to use, modify, and redistribute. (aknowledgment is not required)*
 *
 *
 * ![Made with Grida](https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png)
 * <!-- Info: Please do not remove this comment unless intended. removing this section will break grida integrations. -->
 * <!-- grida.meta.widget_declaration | engine : 0.0.1 | source : figma://MikewnarPfpWXfRNVX1H6c/1412:20437 -->
 */
function EssentialFrom({
  onSubmit,
}: {
  onSubmit: (v: { name: string; url: string; logo?: string }) => void;
}) {
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [valid, setValid] = React.useState(false);

  useEffect(() => {
    setValid(name.length > 0 && url.length > 0);
  }, [name, url]);

  return (
    <>
      <OnboardingHeader
        header="Create a workspace"
        description="Choose the name and url for the new workspace."
      />
      <OnboardingLogoAndDesc
        logo={
          "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/545a163d-8331-4bd7-8b30-fcecb81fbaae"
        }
        description={{
          message: "Choose logo",
          button: true,
        }}
      />
      <OnboardingForms>
        <TextFormField
          onChange={setName}
          value={name}
          label="Workspace name"
          placeholder="Dot inc."
          helpText="The name of your company or organization."
        />
        <TextFormField
          onChange={setUrl}
          value={url}
          label="Workspace URL"
          placeholder="grida.co/dot"
          helpText="You can’t change this later."
        />
      </OnboardingForms>
      <Button
        disabled={!valid}
        height={"40px"}
        onClick={() => onSubmit({ name, url })}
      >
        Continue
      </Button>
    </>
  );
}

/**
 * `<NewInvite>` ('/new#invite')
 * - [Open in Figma](https://figma.com/file/MikewnarPfpWXfRNVX1H6c?node-id=1412:21528)
 * - [Open in Grida](https://code.grida.co/files/MikewnarPfpWXfRNVX1H6c?node=1412:21528)
 *
 *
 * ---
 * @example
 * ```tsx
 * import React from "react";
 *
 * export default function () {
 *   return (
 *     <>
 *       👇 instanciate widget like below. 👇
 *       <NewInvite/>
 *     </>
 *   )
 * }
 * ```
 * ---
 * @params {any} props - this widget does not requires props. you can pass custom dynamic props to the widget as you want (on typescript, it will raise type check issues).
 * ---
 * @preview
 * ![](https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/c8caf319-c254-4907-abff-96fbfef1ad6c)
 * ---
 * @remarks
 * @see {@link https://grida.co/docs} for more information.
 * ---
 * Code generated by grida.co | engine 0.0.1 (Apache-2.0) | Generated code under CC0 (public domain) *This code is free to use, modify, and redistribute. (aknowledgment is not required)*
 *
 *
 * ![Made with Grida](https://bridged-service-static.s3.us-west-1.amazonaws.com/branding/logo/32.png)
 * <!-- Info: Please do not remove this comment unless intended. removing this section will break grida integrations. -->
 * <!-- grida.meta.widget_declaration | engine : 0.0.1 | source : figma://MikewnarPfpWXfRNVX1H6c/1412:21528 -->
 */
export function InviteForm() {
  const maxinvites = 10;
  const [formCount, setFormCount] = React.useState(3);
  const [emails, setEmails] = React.useState<string[]>(
    new Array(formCount).fill("")
  );

  useEffect(() => {
    const validemails = emails.filter(validateEmail);
    if (validemails.length >= 3) {
      setFormCount(Math.min(validemails.length + 1, maxinvites));
    }
  }, [emails]);

  return (
    <>
      <OnboardingHeader
        header="Invite teammates"
        description="Choose the name and url for the new workspace."
      />
      <OnboardingLogoAndDesc
        logo={
          "https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/545a163d-8331-4bd7-8b30-fcecb81fbaae"
        }
        description={{
          message: "Grida Inc.",
          button: false,
        }}
      />
      <OnboardingForms gap={12} maxHeight={400}>
        {new Array(formCount).fill(0).map((_, index) => {
          const onsubmit = (v) => {
            // update value in array with index
            setEmails((prev) => {
              const newArray = [...prev];
              newArray[index] = v;
              return newArray;
            });
          };
          return (
            <TextField
              key={index}
              placeholder="Email address"
              onChange={onsubmit}
              onEnter={onsubmit}
            />
          );
        })}
      </OnboardingForms>
      <Divider />
      {/* 
      <Frame406>
        <Checkbox
          src="https://figma-alpha-api.s3.us-west-2.amazonaws.com/images/429b45bb-45ce-4172-ab3b-0b7deaf9adee"
          alt="icon"
        />
        <AllowAnyoneWithAGriadCoEmailToJoinThisWorkspace>
          Allow anyone with a @griad.co email to join this workspace
        </AllowAnyoneWithAGriadCoEmailToJoinThisWorkspace>
      </Frame406> */}

      <Button
        // disabled={!valid}
        height={"40px"}
        // onClick={() => onSubmit({ name, url })}
      >
        Take me to Grida
      </Button>
    </>
  );
}
