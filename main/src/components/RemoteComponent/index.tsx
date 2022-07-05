import React, { FC } from "react";
import ErrorBoundary from "../ErrorBoundary";
import { useRemotes } from "../../context/remotes";
import { loadComponent } from "../../utils";
import { findRemoteUrl } from "../../utils/remote";

type Props = {
  fallback?: string | React.ReactNode;
  remote: "PRODUCTS" | "CART";
  component: string;
  scope?: string;
};

const RemoteWrapper: FC<Props> = ({
  remote,
  component,
  scope = "default",
  fallback = null,
}) => {
  const [remotes] = useRemotes();
  const remoteUrl = findRemoteUrl(remote, remotes);
  const Component = React.lazy(
    loadComponent(remote, remoteUrl, `./${component}`, scope)
  );
  return (
    <ErrorBoundary>
      <React.Suspense fallback={fallback}>
        <Component />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default RemoteWrapper;
