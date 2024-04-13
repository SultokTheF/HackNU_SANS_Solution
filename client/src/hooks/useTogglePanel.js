import { useEffect } from "react";

const useTogglePanel = (signUpButton, signInButton, container) => {
  useEffect(() => {
    const handleSignUpClick = () => container.classList.add("right-panel-active");
    const handleSignInClick = () => container.classList.remove("right-panel-active");

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', handleSignUpClick);
      signInButton.addEventListener('click', handleSignInClick);
    }

    return () => {
      if (signUpButton && signInButton) {
        signUpButton.removeEventListener('click', handleSignUpClick);
        signInButton.removeEventListener('click', handleSignInClick);
      }
    };
  }, [signUpButton, signInButton, container]);
};

export default useTogglePanel;
