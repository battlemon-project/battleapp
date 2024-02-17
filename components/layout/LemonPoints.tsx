import { usePointsBalance } from "hooks/usePointsBalance";
import React from "react";

const LemonPoints = React.memo(() => {
  const { balance } = usePointsBalance()
  return (
    <span>{(balance || 0) / 1000000000000000000} LP</span>
  );
});

LemonPoints.displayName = 'LemonPoints';

export default LemonPoints;