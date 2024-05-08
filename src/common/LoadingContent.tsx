import { ReactNode, useEffect } from "react";
// import useDataRef from "hooks/"; // TODO: add data ref for update
// import ErrorContent from "common/ErrorContent";
import clsx from "clsx";
import ErrorContent from "./ErrorContent";
// import LoadingIndicator from "./LoadingIndicator";
// import EmptyContentCard from "./EmptyContentCard";

interface LoadingContentType<T> {
  size: number;
  error: boolean;
  loading: boolean;
  children: JSX.Element | (() => JSX.Element);
  onReload: () => void;
  onMount: () => void;
  data: T[];
  loadingContent: JSX.Element | ((x: JSX.Element) => ReactNode);
  errorContent: JSX.Element | ((x: JSX.Element) => ReactNode);
  emptyContent: JSX.Element | ((x: JSX.Element) => ReactNode);
  className: string;
}

/**
 * @typedef {{
 * size: string | number,
 * onMount: Function,
 * onReload: Function,
 * error: boolean,
 * loading: boolean,
 * errorContent: React.ReactNode,
 * emptyContent:  React.ReactNode,
 * loadingContent: React.ReactNode,
 * }} LoadingContentProps
 */

/**
 *
 * @param {LoadingContentProps} props
 */
function LoadingContent<T>(props: Partial<LoadingContentType<T>>): JSX.Element {
  const {
    size,
    error,
    loading,
    data,
    children,
    onReload,
    onMount,
    loadingContent,
    errorContent,
    emptyContent,
    className,
    ...rest
  } = props;

  const defaultLoadingContent = (
    <div className="flex justify-center items-center w-full h-full">
      <span id="loading-indicator"></span>
    </div>
  );
  const defaultEmptyContent = <span {...rest}>Empty content</span>;
  const defaultErrorContent = (
    <ErrorContent onReload={() => onReload?.()} {...rest}></ErrorContent>
  );

  if (error) {
    return (
      <div className={clsx(className)}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {errorContent
          ? typeof errorContent === "function"
            ? errorContent(defaultErrorContent)
            : errorContent
          : defaultErrorContent}
      </div>
    );
  }

  if (loading) {
    return (
      <div className={clsx(className)}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {loadingContent
          ? typeof loadingContent === "function"
            ? loadingContent(defaultLoadingContent)
            : loadingContent
          : defaultLoadingContent}
      </div>
    );
  }

  if (!loading && !error && data?.length === 0) {
    return (
      <div className={clsx(className)}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {emptyContent
          ? typeof emptyContent === "function"
            ? emptyContent(defaultEmptyContent)
            : emptyContent
          : defaultEmptyContent}
      </div>
    );
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{typeof children === "function" ? children() : children}</>;
}

LoadingContent.defaultProps = {
  size: 40,
  children: null,
};

export default LoadingContent;

export {};
