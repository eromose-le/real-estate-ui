import React from "react";
import "./common.scss";

interface ErrorContentType {
  icon?: string | React.ReactElement;
  title?: string;
  data?: unknown[];
  headerTitle?: string;
  className?: string;
  description?: string;
  header?: React.ReactNode;
  variant?: "error" | "primary";
  children?: React.ReactNode;
  onReload?: () => void;
}

function ErrorContent(props: ErrorContentType): JSX.Element {
  const {
    icon,
    title,
    header,
    headerTitle,
    description,
    variant,
    children,
    onReload,
    className,
    ...rest
  } = props;

  return (
    <div className="errorContentContainer" {...rest}>
      <div>
        {headerTitle ? (
          <>
            <h1>{headerTitle}</h1>
          </>
        ) : null}
        <div className="errorContentBody">
          {header}
          <h4>{title}</h4>
          <p style={{ color: "#6C6C6C" }}>{description}</p>

          {onReload && (
            <div>
              <button
                className="default-button"
                onClick={onReload}
                title="Refresh"
              >
                refresh
              </button>
            </div>
          )}

          <div className="w-full max-w-xs mt-4 inline-flex justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

ErrorContent.defaultProps = {
  icon: "Danger",
  variant: "error",
  title: "Something went wrong",
  description: "We're quite sorry about this!",
};

export default ErrorContent;
