import React from "react";
import { MemberRow } from "@app/members";
import {
  SettingsBody,
  SettingsHeader,
  SettingsMain,
  SettingsNavigation,
  SettingsPage,
  SettingsSectionHeader,
} from "layouts/settings";
import Link from "next/link";
export default function MembersManagePage({ members, pendingInvitations }) {
  return (
    <SettingsPage>
      <SettingsHeader>
        <h1>Members</h1>
      </SettingsHeader>
      <SettingsBody>
        <SettingsNavigation>
          <Link href={"/settings/billing"}>Billing</Link>
          <Link href={"/settings/members"}>Members</Link>
          <Link href={"/settings/invoices"}>Invoices</Link>
          <Link href={"/settings"}>General</Link>
        </SettingsNavigation>
        <SettingsMain>
          <SettingsSectionHeader
            header="Invite new members"
            paddingBottom={24}
          />
          <SettingsSectionHeader
            header="Allowed email domains"
            description="By default, all your invoices will be sent to the email address of the creator of your team. If you want to use a custom email address specifically for receiving invoices, enter it here."
            paddingBottom={24}
          />
          <SettingsSectionHeader
            header="Pending invitations"
            paddingBottom={24}
          />
          {pendingInvitations.map((inv) => (
            <MemberRow
              key={inv.id}
              name="Alex"
              email="alex@mcqueen.com"
              role="Owner"
            />
          ))}
          <SettingsSectionHeader header="Members" paddingBottom={24} />
          {members.map((member) => (
            <MemberRow
              key={member.id}
              name="Alex"
              email="alex@mcqueen.com"
              role="Owner"
            />
          ))}
        </SettingsMain>
      </SettingsBody>
    </SettingsPage>
  );
  //
}

export function getServerSideProps(context) {
  return {
    props: {
      members: [
        {
          id: "1",
          name: "Alex",
          email: "alex@mcqueen.com",
          role: "Owner",
        },
        {
          id: "1",
          name: "Coco",
          email: "coco@channel.com",
          role: "Owner",
        },
        {
          id: "1",
          name: "Universe",
          email: "universe@grida.co",
          role: "Owner",
        },
      ],
      pendingInvitations: [],
    },
  };
}
