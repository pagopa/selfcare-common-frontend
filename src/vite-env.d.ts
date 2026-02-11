/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly REACT_APP_MOCK_USER: string
    // add other variables here...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
