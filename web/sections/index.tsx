import React from "react";
import PreviewEditor from "../sections/PreviewEditor";
import Preview from "../sections/Preview";
import { NextRouter } from "next/router";

const page = (props: { router: NextRouter }) => {
  return (
    <>
      <div
        style={{
          width: "50%",
          float: "left",
          height: "100vh",
          padding: "65px",
          paddingBottom: "0",
        }}
      >
        <Preview
          key={JSON.stringify(props.router.query)}
          router={props.router}
        />
      </div>
      <div
        style={{
          width: "50%",
          float: "left",
          height: "100vh",
          padding: "65px",
          paddingBottom: "0",
          backgroundColor: "#F8F8F8",
        }}
      >
        <PreviewEditor />
      </div>
    </>
  );
};

export default page;
