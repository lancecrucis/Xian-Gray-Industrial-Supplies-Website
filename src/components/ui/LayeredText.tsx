import type React from 'react'

interface LayeredTextLine {
  top: string
  bottom: string
}

interface LayeredTextProps {
  lines?: LayeredTextLine[]
  fontSize?: string
  fontSizeMd?: string
  lineHeight?: number
  lineHeightMd?: number
  className?: string
}

const defaultLines: LayeredTextLine[] = [
  { top: '\u00A0', bottom: 'GENUINE' },
  { top: 'GENUINE', bottom: 'SERVICE' },
  { top: 'SERVICE', bottom: 'HONEST' },
  { top: 'HONEST', bottom: 'WORK' },
  { top: 'WORK', bottom: 'QUALITY' },
  { top: 'QUALITY', bottom: 'TRUST' },
  { top: 'TRUST', bottom: '\u00A0' },
]

export function LayeredText({
  lines = defaultLines,
  fontSize = '72px',
  fontSizeMd = '36px',
  lineHeight = 60,
  lineHeightMd = 35,
  className = '',
}: LayeredTextProps) {
  const centerIndex = Math.floor(lines.length / 2)

  return <div
    className={`layered-text ${className}`}
    tabIndex={0}
    aria-label="Genuine service, honest work, quality you can trust"
    style={{ '--layered-font-size': fontSize, '--layered-font-size-md': fontSizeMd } as React.CSSProperties}
  >
    <ul className="layered-text-list" aria-hidden="true">
      {lines.map((line, index) => {
        const desktopOffset = (index - centerIndex) * 35
        const mobileOffset = (index - centerIndex) * 20
        const isSlanted = index % 2 === 0

        return <li
          key={`${line.top}-${line.bottom}-${index}`}
          className="layered-text-line"
          style={{
            '--layered-line-height': `${lineHeight}px`,
            '--layered-line-height-md': `${lineHeightMd}px`,
            '--layered-offset': `${desktopOffset}px`,
            '--layered-offset-md': `${mobileOffset}px`,
            '--layered-skew': isSlanted ? '60deg, -30deg' : '0deg, -30deg',
            '--layered-scale': isSlanted ? '.66667' : '1.33333',
            '--layered-delay': `${index * 0.06}s`,
          } as React.CSSProperties}
        >
          <span className="layered-text-line-track">
            <span>{line.top}</span>
            <span>{line.bottom}</span>
          </span>
        </li>
      })}
    </ul>
  </div>
}
