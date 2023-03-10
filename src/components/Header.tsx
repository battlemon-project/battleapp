import { useWallet, ConnectButton } from '@suiet/wallet-kit';
import Logo from './Logo'

function Header() {
  const wallet = useWallet();
  const fps = 60;
  
  const signOut = () => {
    localStorage.removeItem('WK__LAST_CONNECT_WALLET_NAME')
    wallet.disconnect()
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark">
      <div className="container">
        <Logo />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> 
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
            {fps && <li className="nav-item">
              <span className="nav-link" style={{color: 'white'}}>
                <span id="fps">60</span> FPS
              </span>
            </li> }
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 fs-5">
            <li className="nav-item dropdown">
              {wallet?.address ?
                <>
                  <button className="btn btn-lg btn-outline-light dropdown-toggle" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="short_address">
                      <span className="ellipsis">{wallet?.address}</span>
                      <span className="indent">{wallet?.address}</span>
                    </span>
                  </button>
                  <ul className="dropdown-menu w-100" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href={"#"} onClick={signOut}>Sign Out</a></li>
                  </ul>
                </>
                :
                // <button onClick={ethos.showSignInModal} className="btn btn-lg btn-outline-light">Sign In</button>
                <ConnectButton label="Connect" />
              }
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;