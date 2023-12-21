import {
  useConnectModal,
  useAccountModal,
  useChainModal,
} from '@rainbow-me/rainbowkit';

export const SignInButton = () => {
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();

  return (
    <>
      {openConnectModal && (
        <button className='btn btn-lg btn-outline-light w-100' onClick={openConnectModal} type="button">
          Sign In
        </button>
      )}

      {openAccountModal && (
        <button className='btn btn-lg btn-outline-light w-100' onClick={openAccountModal} type="button">
          Sign In
        </button>
      )}

      {openChainModal && (
        <button className='btn btn-lg btn-outline-light w-100' onClick={openChainModal} type="button">
          Sign In
        </button>
      )}
    </>
  );
};