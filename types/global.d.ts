export {};

declare global {
  interface Window {
    google?: {
      accounts?: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: google.accounts.id.CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (element: HTMLElement | null, options: {
            theme: string, size: string
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}