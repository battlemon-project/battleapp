import { NftMetaData } from 'lemon';
import styles from '../inventory.module.css';
import cn from 'classnames';

interface NextTokenProps {
  onClick: (token: NftMetaData) => void
  token: NftMetaData
  isSelected: boolean
}

export default function TokenLink({ onClick, token, isSelected }: NextTokenProps) {
  const handleClick = (token: NftMetaData) => (e: React.MouseEvent) => {
    e.preventDefault();
    onClick(token)
  }

  return (<>
    <div className={cn('rounded-4 position-relative', styles.itemBg, { [styles.itemBgActive]: isSelected })} onClick={handleClick(token)}>
      <img src={token.image} className="img-fluid" height="512" width="512" />
    </div>
  </>)
}