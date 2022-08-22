import { Button, TextField } from "@editor-ui/console";
import {
  SettingsBody,
  SettingsFormSection,
  SettingsHeader,
  SettingsMain,
  SettingsNavigation,
  SettingsPage,
  SettingsSection,
  SettingsSectionHeader,
} from "layouts/settings";
import Link from "next/link";
import React from "react";

export default function GeneralSettingsPage() {
  return (
    <SettingsPage>
      <SettingsHeader>
        <h1>General</h1>
      </SettingsHeader>
      <SettingsBody>
        <SettingsNavigation>
          <Link href={"/settings/billing"}>Billing</Link>
          <Link href={"/settings/members"}>Members</Link>
          <Link href={"/settings/invoices"}>Invoices</Link>
          <Link href={"/settings"}>General</Link>
        </SettingsNavigation>
        <SettingsMain>
          <SettingsFormSection
            header="Name"
            description="This is your team's visible name within Grida. For example, the name of your company or department."
            paddingBottom={24}
            onSubmit={(e) => {
              console.log(e);
            }}
            submit={{
              label: "Save",
            }}
          >
            <TextField />
          </SettingsFormSection>
          <SettingsFormSection
            header="Domain"
            description="This is your team's visible name within Grida. For example, the name of your company or department."
            paddingBottom={24}
            onSubmit={(e) => {}}
            submit={{
              label: "Save",
            }}
          >
            <TextField />
          </SettingsFormSection>
          <SettingsSection>
            <SettingsSectionHeader
              header="Logo"
              description="This is your team's visible name within Grida. For example, the name of your company or department."
              paddingBottom={24}
            />
          </SettingsSection>
          <SettingsSection>
            <SettingsSectionHeader
              header="Theme color"
              description="This is your team's visible name within Grida. For example, the name of your company or department."
              paddingBottom={24}
            />
            <TextField />
          </SettingsSection>
          <SettingsSection>
            <SettingsSectionHeader
              header="Default Language"
              description="This is your team's visible name within Grida. For example, the name of your company or department."
              paddingBottom={24}
            />
            <TextField />
          </SettingsSection>
          <SettingsSection>
            <SettingsSectionHeader
              header="Danger Zone"
              description="This is your team's visible name within Grida. For example, the name of your company or department."
              paddingBottom={24}
            />
            <Button>Delete</Button>
          </SettingsSection>
        </SettingsMain>
      </SettingsBody>
    </SettingsPage>
  );
}
