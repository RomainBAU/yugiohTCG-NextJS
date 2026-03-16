export type CardImage = {
  id: number
  image_url: string
  image_url_small?: string
}

export type CardBanlistInfo = {
  ban_tcg: string // "Banned", "Limited", "Semi-Limited", "Unlimited"
  ban_ocg?: string
}

export type Card = {
  id: number
  name: string
  type: string
  desc: string
  atk?: number
  def?: number
  level?: number
  race?: string
  attribute?: string
  archetype?: string
  card_images: CardImage[]
  banlist_info?: CardBanlistInfo
}