import { useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'

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
  const [isActive, setIsActive] = useState(false)
  const centerIndex = Math.floor(lines.length / 2)

  const toggleFromTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') setIsActive(current => !current)
  }

  const toggleFromKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    setIsActive(current => !current)
  }

  return <div
    className={`layered-text${isActive ? ' is-active' : ''}${className ? ` ${className}` : ''}`}
    tabIndex={0}
    role="button"
    aria-pressed={isActive}
    aria-label="Genuine service, honest work, quality you can trust"
    onPointerUp={toggleFromTouch}
    onKeyDown={toggleFromKeyboard}
    style={{ '--layered-font-size': fontSize, '--layered-font-size-md': fontSizeMd } as CSSProperties}
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
          } as CSSProperties}
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
