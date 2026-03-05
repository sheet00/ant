export function formatNumber(n) {
  if (n === null || n === undefined || isNaN(n)) return '0'
  if (!isFinite(n)) return '∞'
  if (n < 0) return '-' + formatNumber(-n)
  if (n < 1e3) return Math.floor(n).toString()
  if (n < 1e6) return (n / 1e3).toFixed(1) + 'k'
  if (n < 1e9) return (n / 1e6).toFixed(2) + 'M'
  if (n < 1e12) return (n / 1e9).toFixed(2) + 'B'
  if (n < 1e15) return (n / 1e12).toFixed(2) + 'T'
  if (n < 1e18) return (n / 1e15).toFixed(2) + 'Qa'
  if (n < 1e21) return (n / 1e18).toFixed(2) + 'Qi'
  if (n < 1e24) return (n / 1e21).toFixed(2) + 'Sx'
  if (n < 1e27) return (n / 1e24).toFixed(2) + 'Sp'
  return n.toExponential(2)
}
