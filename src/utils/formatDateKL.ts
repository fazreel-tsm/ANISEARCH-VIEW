export function formatDateToKL(iso?: string | null) {
  if (!iso) return ''
  const d = new Date(iso)
  // convert UTC to Asia/Kuala_Lumpur (UTC+8)
  const kl = new Date(d.getTime() + 8 * 60 * 60 * 1000)
  const dd = String(kl.getDate()).padStart(2, '0')
  const mm = String(kl.getMonth() + 1).padStart(2, '0')
  const yyyy = kl.getFullYear()
  return `${dd}/${mm}/${yyyy}`
}
