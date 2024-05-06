import "./common.scss";
import config from "@/configs/config";
import useLogout from "@/hooks/useLogout";
import { gotoEmailBox } from "@/utils/gotoEmailBox";

interface ErrorDialogProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
}
/**
 *
 * @param {ErrorDialogProps} props
 */
export function ErrorDialog(props: ErrorDialogProps) {
  const { title, description, onRetry, retryText, ...rest } = props;
  const { logout } = useLogout();
  function handleRetry(e: any) {
    e.stopPropagation();
    if (onRetry) {
      onRetry();
    }
  }

  return (
    <div className="errorDialogContainer">
      <div {...rest} className="errorDialog">
        <h1 className="">{title}</h1>
        <section className="errorDescription">
          <p>{description}</p>
        </section>
        <section className="actionContainer">
          <button onClick={logout} color="error">
            Reset
          </button>
          <button onClick={handleRetry}>{retryText}</button>
        </section>
      </div>
    </div>
  );
}

ErrorDialog.defaultProps = {
  title: "Something went wrong",
  description: (
    <div className="errorDialogDefault">
      <p className="description">
        Sorry, something unexpected happened, Please try again or contact our
        support.
      </p>
      <button onClick={() => gotoEmailBox(config.SUPPORT_EMAIL)}>
        {config.SUPPORT_EMAIL}
      </button>
    </div>
  ),
  retryText: "Refresh",
};

export default ErrorDialog;
