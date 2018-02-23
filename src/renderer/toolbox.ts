
export const formatMoney = (v) => {
  if (v === undefined) return ['0.00', true]
  else return [Number(v).toFixed(2), false]
}
