/// <reference types="vite/client" />
const config = {
  URL_API: import.meta.env.VITE_URL_API,
  NODE_ENV: import.meta.env.VITE_NODE_ENV,
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL,
};
export default config;
