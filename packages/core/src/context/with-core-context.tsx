import React from "react";
import { CoreContext } from "./core-context";
import { WithCoreContextProps } from "./with-core-context-props";

export const withCoreContext = (
  Component: React.ComponentType<WithCoreContextProps & { [key: string]: any }>
) => (props) => {
  return (
    <CoreContext.Consumer>
      {(context) => <Component {...props} context={context} />}
    </CoreContext.Consumer>
  );
};
