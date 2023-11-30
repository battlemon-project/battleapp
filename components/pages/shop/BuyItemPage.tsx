import cn from 'classnames';
import styles from './shop.module.css'
import EthSymbol from 'components/layout/EthSymbol';
import Link from 'next/link';
import { truncate } from 'utils/misc';
import { useItemMint } from 'hooks/useItemMint';
import { useItemBalance } from 'hooks/useItemBalance';
import { useEffect } from 'react';

export default function BuyItemPage() {
  const { itemMint: mintBack, itemMintStatus: mintBackStatus } = useItemMint(0);
  const { itemMint: mintCap, itemMintStatus: mintCapStatus } = useItemMint(1);
  const { itemMint: mintBelt, itemMintStatus: mintBeltStatus } = useItemMint(2);
  const { itemMint: mintGlasses, itemMintStatus: mintGlassesStatus } = useItemMint(3);
  const { itemMint: mintMask, itemMintStatus: mintMaskStatus } = useItemMint(4);
  const { itemMint: mintFireArms, itemMintStatus: mintFireArmsStatus } = useItemMint(5);
  const { itemMint: mintColdArms, itemMintStatus: mintColdArmsStatus } = useItemMint(6);
  const { itemMint: mintShoes, itemMintStatus: mintShoesStatus } = useItemMint(7);
  const { balance, refreshBalance } = useItemBalance();

  useEffect(() => {
    if (![mintBackStatus, mintCapStatus, mintBeltStatus, mintGlassesStatus, mintMaskStatus, mintFireArmsStatus, mintColdArmsStatus, mintShoesStatus].includes('loading')) {
      refreshBalance?.();
    }
  }, [mintBackStatus, mintCapStatus, mintBeltStatus, mintGlassesStatus, mintMaskStatus, mintFireArmsStatus, mintColdArmsStatus, mintShoesStatus])

  return (
    <div className="container py-3 mb-auto">
      <Link href="/shop">
        <button className='btn btn-outline-light'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-left mb-05" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          <span className='ps-2'>Back to Shop</span>
        </button>
      </Link>
      <div className="row mt-3">
        <div className='col-12 col-md-5 mb-4'>
          <img className={cn('rounded-4 img-fluid', styles.lightBg)} src="/images/shop/items-gallery.gif" />
        </div>
        <div className="col-12 col-md-7">
          <div className={cn('p-3 py-4 rounded-4 mb-4', styles.lightBg)}>
            <p className="mb-3">Unique Key-card that gives access to the incredible game world of Lemoland, full of adventures and NFT treasures. </p>
            <p className="mb-3">Unique NFT key-pass will be available in Testnet and also transferred to Mainnet.</p>
            <div className="d-flex justify-content-between mb-2">
              <b>Contract Address</b>
              <div>{truncate(process.env.NEXT_PUBLIC_CONTRACT_ITEMS!, 8)}</div>
            </div>
            <div className="d-flex justify-content-between">
              <b>Token Standard</b>
              <div>ERC721</div>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintBack()}>
                { mintBackStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Back for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintCap()}>
                { mintCapStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Cap for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintBelt()}>
                { mintBeltStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Belt for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintGlasses()}>
                { mintGlassesStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Glasses for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintMask()}>
                { mintMaskStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Mask for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintFireArms()}>
                { mintFireArmsStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Fire Arms for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintColdArms()}>
                { mintColdArmsStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Cold Arms for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>
            <div className="col-6">
              <button className={cn('d-flex justify-content-center mb-4', styles.buyBtn)} onClick={() => mintShoes()}>
                { mintShoesStatus == 'loading' ? 
                  <div className="spinner-border spinner-border-sm my-1" role="status"></div> :
                  <>
                    <span className='fs-17 fst-italic pe-2'>Buy Shoes for </span>
                    <EthSymbol>0.01</EthSymbol>
                  </>
                }
              </button>
            </div>            
          </div>
          
          {!!balance && <Link href="/hub/items">
            <button className='btn btn-lg btn-outline-light w-100'>
              <span className='ps-2'>Look at your {balance} item{balance !== 1 ? 's' : ''} in NFT Hub</span>
            </button>
          </Link>}
        </div>
      </div>
    </div>
  );
};