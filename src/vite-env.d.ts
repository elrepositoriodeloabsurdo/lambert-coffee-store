/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TUU_CHECKOUT_URL?: string;
  readonly VITE_TRANSBANK_CHECKOUT_URL?: string;
  readonly VITE_HERO_VIDEO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
