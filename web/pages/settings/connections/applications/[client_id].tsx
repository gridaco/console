import Head from "next/head";

export default function AuthorizedOAuthApps({
  client_id,
  clinet_name,
}: {
  client_id: string;
  clinet_name: string;
}) {
  return (
    <>
      <Head>
        <title>{clinet_name}</title>
      </Head>
      <h1>{clinet_name}</h1>
    </>
  );
}

export async function getServerSideProps(context) {
  const { client_id } = context.query;
  return {
    props: {
      client_id,
      client_name: "test",
    },
  };
}
