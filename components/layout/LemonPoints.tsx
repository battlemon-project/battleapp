import { usePointsBalance } from "hooks/usePointsBalance";

export default function LemonPoints() {
  const { balance } = usePointsBalance()
  return (
    <span>{balance / 1000000000000000000} LP</span>
  );
}