import type { ActionSignal } from '../types/action'

export function ActionGlyph({ signal }: { signal: ActionSignal }) {
  const common = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (signal === 'weather') {
    return (
      <svg {...common}>
        <path d="M7 16h10a3.5 3.5 0 0 0 .4-7 5 5 0 0 0-9.6-1.2A3.2 3.2 0 0 0 7 16z" />
        <path d="M9 19l-1 2M12 19v2M15 19l1 2" />
      </svg>
    )
  }
  if (signal === 'chart') {
    return (
      <svg {...common}>
        <path d="M4 16.5 9 11l3 3 7.5-8" />
        <path d="M14 6h6v6" />
      </svg>
    )
  }
  if (signal === 'check') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.4 12.2 11 14.7l4.7-5.2" />
      </svg>
    )
  }
  if (signal === 'clock') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 2" />
      </svg>
    )
  }
  if (signal === 'beans') {
    return (
      <svg {...common}>
        <path d="M8 16c3 2 8 2 10-2 1-2 .2-5-2-7-3-2-7-1-8 2s-2 5 0 7z" />
        <path d="M10 10c1.5 1.2 2.2 2.6 2 4.5" />
      </svg>
    )
  }
  if (signal === 'members') {
    return (
      <svg {...common}>
        <circle cx="12" cy="9" r="3.1" />
        <path d="M9.2 8.2 8 4.2h2.6M14.8 8.2 16 4.2h-2.6" />
        <path d="M9.6 12.1 8.8 18h6.4l-.8-5.9" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <path d="M12 3.5 19.5 12 12 20.5 4.5 12 12 3.5z" />
    </svg>
  )
}
