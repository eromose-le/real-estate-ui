import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";

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
            console.log("Done! Here is the image info: ", result.info);
            setState((prev) => [...prev, result.info.secure_url]);
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
        className="cloudinary-button"
      >
        Upload
      </button>
    </CloudinaryScriptContext.Provider>
  );
};

export default UploadWidget;
export { CloudinaryScriptContext };
