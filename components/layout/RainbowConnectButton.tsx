import { ConnectButton } from '@rainbow-me/rainbowkit';
import LemonPoints from './LemonPoints';
export const RainbowConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button className="btn btn-lg py-2 btn-outline-light" onClick={openConnectModal} type="button">
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button className="btn btn-lg py-2 btn-outline-light" onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: 'flex', gap: 5 }}>
                  <button
                    className={'btn btn-link p-0'}
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 28, height: 28 }}
                          />
                        )}
                      </div>
                    )}
                  </button>
                  <div className="input-group">
                    <div className="input-group-text" id="btnGroupAddon" style={{lineHeight: '22px', borderRadius: '0.75rem 0 0 0.75rem'}}><LemonPoints /></div>
                    <button className="btn btn-outline-light" onClick={openAccountModal} type="button">
                      {account.displayName}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};