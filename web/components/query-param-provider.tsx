import { NextQueryParamProvider } from "next-query-params";
import React, { memo } from "react";

const QueryParamProvider = (props: { children?: React.ReactNode }) => {
  const { children, ...rest } = props;

  return <NextQueryParamProvider {...rest}>{children}</NextQueryParamProvider>;
};

export default memo(QueryParamProvider);
