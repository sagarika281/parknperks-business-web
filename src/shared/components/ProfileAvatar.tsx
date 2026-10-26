type ProfileAvatarSize = 'sm' | 'md' | 'lg'

type ProfileAvatarProps = {
  name: string
  gradient: string
  size?: ProfileAvatarSize
  className?: string
}

export function ProfileAvatar({
  name,
  gradient,
  size = 'md',
  className,
}: ProfileAvatarProps) {
  const initial = name.charAt(0).toUpperCase()

  return (
    <span
      className={['profile-avatar', `is-${size}`, className]
        .filter(Boolean)
        .join(' ')}
      style={{ background: gradient }}
      aria-hidden="true"
    >
      {initial}
    </span>
  )
}
