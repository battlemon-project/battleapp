import Image from 'next/image';

export default function BattlemonLoader() {
  return (
    <div style={{left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)'}} className="h-100 vw-100 position-fixed top-0 left-0 d-flex align-items-center justify-content-center">
      <div className="relative d-inline-block" style={{width: '256px', height: '256px'}}>
        <Image
          src={`/images/btlmn_logo_inner_256.png`}
          alt="Battlemon Logo inner."
          width={256}
          height={256}
          className="position-absolute"
        />
        <Image
          src={`/images/btlmn_logo_outer_256.png`}
          alt="Battlemon Logo Outer."
          width={256}
          height={256}
          className={`position-absolute spinner`}
        />
      </div>
    </div>
  );
};
