import type { SidebarNavItem } from '../constants/nav'

type SidebarNavIconProps = {
  icon: SidebarNavItem['icon']
}

export function SidebarNavIcon({ icon }: SidebarNavIconProps) {
  const common = {
    viewBox: '0 0 24 24',
    width: 18,
    height: 18,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }

  if (icon === 'counter') {
    return (
      <svg {...common}>
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4M10 12h4M10 16h3" />
      </svg>
    )
  }
  if (icon === 'dashboard') {
    return (
      <svg {...common}>
        <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z" />
      </svg>
    )
  }
  if (icon === 'commerce') {
    return (
      <svg {...common}>
        <path d="M12 3.5l2.1 4.4 4.8.7-3.5 3.4.8 4.8L12 14.8 7.8 16.8l.8-4.8-3.5-3.4 4.8-.7L12 3.5z" />
      </svg>
    )
  }
  if (icon === 'loyalty') {
    return (
      <svg {...common}>
        <path d="M13 3l-7 10h5l-1 8 8-11h-5l1-7z" />
      </svg>
    )
  }
  if (icon === 'inventory') {
    return (
      <svg {...common}>
        <path d="M5 9h14l-1.2 10.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 9z" />
        <path d="M9 9V7a3 3 0 0 1 6 0v2" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="10" cy="8" r="3" />
      <path d="M3.8 19c1-3.2 3-4.8 6.2-4.8s5.2 1.6 6.2 4.8" />
      <path d="M18 8v6M15 11h6" />
    </svg>
  )
}
