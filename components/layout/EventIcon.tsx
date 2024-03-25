import { PrizeType } from 'hooks/useBuyBox';
import { blockExplorer, truncate } from 'utils/misc';

const images: Record<PrizeType, string> = {
  [PrizeType.Sticker]: '/images/rewards/Reward_Sticker.png',
  [PrizeType.SmallEthers]: '/images/rewards/Reward_ETH_small.png',
  [PrizeType.MediumEthers]: '/images/rewards/Reward_ETH_med.png',
  [PrizeType.LargeEthers]: '/images/rewards/Reward_ETH_med.png',
  [PrizeType.SmallPoints]: '/images/rewards/Reward_Pts_small.png',
  [PrizeType.MediumPoints]: '/images/rewards/Reward_Pts_med.png',
  [PrizeType.LargePoints]: '/images/rewards/Reward_Pts_big.png',
  [PrizeType.PointsLemon]: '/images/rewards/Reward_Pts_big.png',
  [PrizeType.PointsItem]: '/images/rewards/Reward_Pts_med.png',
  [PrizeType.Hoodie]: '', 
  [PrizeType.Shirt]: '', 
  [PrizeType.Cap]: '', 
  [PrizeType.CheapPickaxe]: '/images/rewards/Reward_IcePick_1.png',
  [PrizeType.GoodPickaxe]: '/images/rewards/Reward_IcePick_2.png',
  [PrizeType.GreatPickaxe]: '/images/rewards/Reward_IcePick_3.png',
  [PrizeType.Item]: '/images/rewards/Reward_Item.png',
  [PrizeType.Lemon]: '/images/rewards/Reward_Lemon.png'
}

export default function EventIcon({ prize, hash, text, chain_id }: { prize: PrizeType, hash: string, text: string, chain_id: number }) {
  return (
    <div className="d-flex align-items-center">
      <img src={images[prize]} width="40" />
      <div className="px-2">
        {text} Transaction:<br />
        <a href={`${blockExplorer[chain_id]}/tx/${hash}`} style={{color: '#fff', textDecoration: 'underline'}} target="_blank">{truncate(hash, 10)}</a>
      </div>
    </div>
  );
}