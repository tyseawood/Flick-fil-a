/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly APP_APIKEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
