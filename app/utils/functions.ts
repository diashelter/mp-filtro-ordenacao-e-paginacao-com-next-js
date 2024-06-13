export default function formatAmountToBrl(amount: number) {
  if (!amount) {
    return null;
  }
  return Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
}
