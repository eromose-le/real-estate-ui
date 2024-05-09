import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import "../../index.scss";
import { Notify } from "@/common/Notify";

// Declare cloudinary property on Window interface
declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        config: any,
        callback: (error: any, result: any) => void
      ) => any;
    };
  }
}

interface UploadWidgetProps {
  uwConfig: any;
  setState: React.Dispatch<React.SetStateAction<any[]>>;
}

interface CloudinaryScriptContextType {
  loaded: boolean;
}

const CloudinaryScriptContext = createContext<CloudinaryScriptContextType>({
  loaded: false,
});

const UploadWidget: React.FC<UploadWidgetProps> = ({ uwConfig, setState }) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const uploadButtonRef = useRef<HTMLButtonElement>(null);

  const initializeCloudinaryWidget = useCallback(() => {
    if (window.cloudinary && window.cloudinary.createUploadWidget) {
      const myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            Notify("Image uploaded", "success");
            setState((prev) => [...prev, result.info.secure_url]);
            setLoaded(true); // Set loaded to true when image URL is generated
          }
        }
      );

      uploadButtonRef.current?.addEventListener("click", () => {
        myWidget.open();
      });
    }
  }, [setState, uwConfig]);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.id = "uw";
    script.src = "https://upload-widget.cloudinary.com/global/all.js";
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (loaded) {
      initializeCloudinaryWidget();
    }
  }, [loaded, initializeCloudinaryWidget]);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <button
        ref={uploadButtonRef}
        id="upload_widget"
        className="cloudinary-button default-button"
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
