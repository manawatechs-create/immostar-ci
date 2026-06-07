import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showTagline?: boolean
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const sizes = {
    sm: { width: 120, height: 30 },
    md: { width: 180, height: 45 },
    lg: { width: 240, height: 60 },
  }

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <Image
          src="/images/logo.svg"
          alt="ImmoStar Logo"
          width={sizes[size].width}
          height={sizes[size].height}
          className="transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      {showTagline && (
        <span className="hidden md:inline-block text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          ⭐ La star de l&apos;immobilier
        </span>
      )}
    </Link>
  )
}
