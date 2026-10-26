export type TradeSignal = {
  id: string
  kind: 'weather' | 'event' | 'margin'
  label: string
  detail: string
  hint: string
}

export const TRADE_SIGNALS: TradeSignal[] = [
  {
    id: 'weather',
    kind: 'weather',
    label: 'WEATHER',
    detail: 'Heavy rain 2–4 PM',
    hint: 'Push hot beverage WhatsApp to 18 lapsed members — rain days see 3× delivery spike.',
  },
  {
    id: 'event',
    kind: 'event',
    label: 'LOCAL EVENT',
    detail: 'Indiranagar Walkathon — 400m away',
    hint: 'High footfall expected 7–9 AM. Pre-position 2 extra staff. Extend grab-n-go bar.',
  },
  {
    id: 'margin',
    kind: 'margin',
    label: 'MARGIN',
    detail: 'Coffee cost up 4.2% this week',
    hint: 'Absorb or pass ₹3/cup. Consider a ₹5 add-on oat milk upsell to offset.',
  },
]
