import { useEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'

interface CursorPosition {
  x: number
  y: number
}

interface LookOverride {
  x?: number
  y?: number
}

interface PupilProps extends LookOverride {
  cursor: CursorPosition
  size?: number
  maxDistance?: number
  pupilColor?: string
}

interface EyeBallProps extends LookOverride {
  cursor: CursorPosition
  size?: number
  pupilSize?: number
  maxDistance?: number
  eyeColor?: string
  pupilColor?: string
  isBlinking?: boolean
}

export interface AnimatedCharactersProps {
  className?: string
  passwordLength?: number
  showPassword?: boolean
  isTyping?: boolean
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value))

function useCursorPosition(): CursorPosition {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => setCursor({ x: event.clientX, y: event.clientY })
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return cursor
}

function useRandomBlink() {
  const [isBlinking, setIsBlinking] = useState(false)

  useEffect(() => {
    let blinkTimeout: number | undefined
    let closeTimeout: number | undefined

    const scheduleBlink = () => {
      blinkTimeout = window.setTimeout(() => {
        setIsBlinking(true)
        closeTimeout = window.setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink()
        }, 150)
      }, Math.random() * 4000 + 3000)
    }

    scheduleBlink()
    return () => {
      if (blinkTimeout) window.clearTimeout(blinkTimeout)
      if (closeTimeout) window.clearTimeout(closeTimeout)
    }
  }, [])

  return isBlinking
}

function calculatePupilPosition(
  element: HTMLDivElement | null,
  cursor: CursorPosition,
  maxDistance: number,
  override: LookOverride,
) {
  if (override.x !== undefined && override.y !== undefined) return { x: override.x, y: override.y }
  if (!element) return { x: 0, y: 0 }

  const rect = element.getBoundingClientRect()
  const deltaX = cursor.x - (rect.left + rect.width / 2)
  const deltaY = cursor.y - (rect.top + rect.height / 2)
  const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance)
  const angle = Math.atan2(deltaY, deltaX)

  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance }
}

function usePupilTransform(
  pupilRef: RefObject<HTMLDivElement | null>,
  eyeRef: RefObject<HTMLDivElement | null>,
  cursor: CursorPosition,
  maxDistance: number,
  overrideX?: number,
  overrideY?: number,
) {
  useEffect(() => {
    const pupil = pupilRef.current
    const eye = eyeRef.current ?? pupil
    if (!pupil || !eye) return

    const position = calculatePupilPosition(eye, cursor, maxDistance, { x: overrideX, y: overrideY })
    pupil.style.transform = `translate(${position.x}px, ${position.y}px)`
  }, [cursor, eyeRef, maxDistance, overrideX, overrideY, pupilRef])
}

export function Pupil({ cursor, size = 12, maxDistance = 5, pupilColor = '#2D2D2D', x, y }: PupilProps) {
  const pupilRef = useRef<HTMLDivElement>(null)
  usePupilTransform(pupilRef, pupilRef, cursor, maxDistance, x, y)

  return <div
    ref={pupilRef}
    className="hero-character-pupil"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: pupilColor,
    }}
  />
}

export function EyeBall({
  cursor,
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = '#fff',
  pupilColor = '#000',
  isBlinking = false,
  x,
  y,
}: EyeBallProps) {
  const eyeRef = useRef<HTMLDivElement>(null)
  const pupilRef = useRef<HTMLDivElement>(null)
  usePupilTransform(pupilRef, eyeRef, cursor, maxDistance, x, y)

  return <div
    ref={eyeRef}
    className="hero-character-eyeball"
    style={{
      width: `${size}px`,
      height: isBlinking ? '2px' : `${size}px`,
      backgroundColor: eyeColor,
    }}
  >
    {!isBlinking && <div
      ref={pupilRef}
      className="hero-character-pupil"
      style={{
        width: `${pupilSize}px`,
        height: `${pupilSize}px`,
        backgroundColor: pupilColor,
      }}
    />}
  </div>
}

interface CharacterPosition {
  faceX: number
  faceY: number
  bodySkew: number
}

function useCharacterPosition(ref: RefObject<HTMLDivElement | null>, cursor: CursorPosition): CharacterPosition {
  const [position, setPosition] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 })

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const element = ref.current
      if (!element) return
      const rect = element.getBoundingClientRect()
      const deltaX = cursor.x - (rect.left + rect.width / 2)
      const deltaY = cursor.y - (rect.top + rect.height / 3)
      setPosition({
        faceX: clamp(deltaX / 20, -15, 15),
        faceY: clamp(deltaY / 30, -10, 10),
        bodySkew: clamp(-deltaX / 120, -6, 6),
      })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [cursor, ref])

  return position
}

function getFaceStyle(left: number, top: number): CSSProperties {
  return { left: `${left}px`, top: `${top}px` }
}

export function AnimatedCharacters({
  className = '',
  passwordLength = 0,
  showPassword = false,
  isTyping = false,
}: AnimatedCharactersProps) {
  const cursor = useCursorPosition()
  const isGrayBlinking = useRandomBlink()
  const isBlackBlinking = useRandomBlink()
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false)
  const [isGrayPeeking, setIsGrayPeeking] = useState(false)
  const grayRef = useRef<HTMLDivElement>(null)
  const blackRef = useRef<HTMLDivElement>(null)
  const paleYellowRef = useRef<HTMLDivElement>(null)
  const yellowRef = useRef<HTMLDivElement>(null)
  const grayPosition = useCharacterPosition(grayRef, cursor)
  const blackPosition = useCharacterPosition(blackRef, cursor)
  const paleYellowPosition = useCharacterPosition(paleYellowRef, cursor)
  const yellowPosition = useCharacterPosition(yellowRef, cursor)
  const isPasswordRevealed = passwordLength > 0 && showPassword

  useEffect(() => {
    if (!isTyping) {
      const timer = window.setTimeout(() => setIsLookingAtEachOther(false), 0)
      return () => window.clearTimeout(timer)
    }

    const startTimer = window.setTimeout(() => setIsLookingAtEachOther(true), 0)
    const endTimer = window.setTimeout(() => setIsLookingAtEachOther(false), 800)
    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(endTimer)
    }
  }, [isTyping])

  useEffect(() => {
    if (!isPasswordRevealed) {
      return
    }

    let peekTimeout: number | undefined
    let resetTimeout: number | undefined
    const schedulePeek = () => {
      peekTimeout = window.setTimeout(() => {
        setIsGrayPeeking(true)
        resetTimeout = window.setTimeout(() => {
          setIsGrayPeeking(false)
          schedulePeek()
        }, 800)
      }, Math.random() * 3000 + 2000)
    }

    schedulePeek()
    return () => {
      if (peekTimeout) window.clearTimeout(peekTimeout)
      if (resetTimeout) window.clearTimeout(resetTimeout)
    }
  }, [isPasswordRevealed])

  const isLookingAtEachOtherNow = isTyping && isLookingAtEachOther
  const isGrayPeekingNow = isPasswordRevealed && isGrayPeeking

  const grayHeight = isTyping || (passwordLength > 0 && !showPassword) ? 440 : 400
  const grayTransform = isPasswordRevealed
    ? 'skewX(0deg)'
    : isTyping || (passwordLength > 0 && !showPassword)
      ? `skewX(${grayPosition.bodySkew - 12}deg) translateX(40px)`
      : `skewX(${grayPosition.bodySkew}deg)`
  const grayFace = isPasswordRevealed
    ? getFaceStyle(20, 35)
    : isLookingAtEachOtherNow
      ? getFaceStyle(55, 65)
      : getFaceStyle(45 + grayPosition.faceX, 40 + grayPosition.faceY)
  const blackTransform = isPasswordRevealed
    ? 'skewX(0deg)'
    : isLookingAtEachOtherNow
      ? `skewX(${blackPosition.bodySkew * 1.5 + 10}deg) translateX(20px)`
      : isTyping || (passwordLength > 0 && !showPassword)
        ? `skewX(${blackPosition.bodySkew * 1.5}deg)`
        : `skewX(${blackPosition.bodySkew}deg)`
  const blackFace = isPasswordRevealed
    ? getFaceStyle(10, 28)
    : isLookingAtEachOtherNow
      ? getFaceStyle(32, 12)
      : getFaceStyle(26 + blackPosition.faceX, 32 + blackPosition.faceY)

  return <div className={`hero-characters ${className}`} aria-hidden="true">
    <div
      ref={grayRef}
      className="hero-character hero-character-gray"
      style={{
        left: '70px',
        width: '180px',
        height: `${grayHeight}px`,
        backgroundColor: '#b3b3b3',
        zIndex: 1,
        transform: grayTransform,
      }}
    >
      <div className="hero-character-face hero-character-face-gray" style={grayFace}>
        <EyeBall size={18} pupilSize={7} maxDistance={5} cursor={cursor} pupilColor="#2D2D2D" isBlinking={isGrayBlinking} x={isPasswordRevealed ? (isGrayPeekingNow ? 4 : -4) : isLookingAtEachOtherNow ? 3 : undefined} y={isPasswordRevealed ? (isGrayPeekingNow ? 5 : -4) : isLookingAtEachOtherNow ? 4 : undefined} />
        <EyeBall size={18} pupilSize={7} maxDistance={5} cursor={cursor} pupilColor="#2D2D2D" isBlinking={isGrayBlinking} x={isPasswordRevealed ? (isGrayPeekingNow ? 4 : -4) : isLookingAtEachOtherNow ? 3 : undefined} y={isPasswordRevealed ? (isGrayPeekingNow ? 5 : -4) : isLookingAtEachOtherNow ? 4 : undefined} />
      </div>
    </div>

    <div
      ref={blackRef}
      className="hero-character hero-character-black"
      style={{
        left: '240px',
        width: '120px',
        height: '310px',
        backgroundColor: '#2D2D2D',
        zIndex: 2,
        transform: blackTransform,
      }}
    >
      <div className="hero-character-face hero-character-face-black" style={blackFace}>
        <EyeBall size={16} pupilSize={6} maxDistance={4} cursor={cursor} pupilColor="#2D2D2D" isBlinking={isBlackBlinking} x={isPasswordRevealed ? -4 : isLookingAtEachOtherNow ? 0 : undefined} y={isPasswordRevealed ? -4 : isLookingAtEachOtherNow ? -4 : undefined} />
        <EyeBall size={16} pupilSize={6} maxDistance={4} cursor={cursor} pupilColor="#2D2D2D" isBlinking={isBlackBlinking} x={isPasswordRevealed ? -4 : isLookingAtEachOtherNow ? 0 : undefined} y={isPasswordRevealed ? -4 : isLookingAtEachOtherNow ? -4 : undefined} />
      </div>
    </div>

    <div
      ref={paleYellowRef}
      className="hero-character hero-character-pale-yellow"
      style={{
        left: '0px',
        width: '240px',
        height: '200px',
        backgroundColor: '#fae792',
        zIndex: 3,
        transform: isPasswordRevealed ? 'skewX(0deg)' : `skewX(${paleYellowPosition.bodySkew}deg)`,
      }}
    >
      <div className="hero-character-face hero-character-face-pale-yellow" style={getFaceStyle(isPasswordRevealed ? 50 : 82 + paleYellowPosition.faceX, isPasswordRevealed ? 85 : 90 + paleYellowPosition.faceY)}>
        <Pupil size={12} maxDistance={5} cursor={cursor} x={isPasswordRevealed ? -5 : undefined} y={isPasswordRevealed ? -4 : undefined} />
        <Pupil size={12} maxDistance={5} cursor={cursor} x={isPasswordRevealed ? -5 : undefined} y={isPasswordRevealed ? -4 : undefined} />
      </div>
    </div>

    <div
      ref={yellowRef}
      className="hero-character hero-character-yellow"
      style={{
        left: '310px',
        width: '140px',
        height: '230px',
        backgroundColor: '#E8D754',
        zIndex: 4,
        transform: isPasswordRevealed ? 'skewX(0deg)' : `skewX(${yellowPosition.bodySkew}deg)`,
      }}
    >
      <div className="hero-character-face hero-character-face-yellow" style={getFaceStyle(isPasswordRevealed ? 20 : 52 + yellowPosition.faceX, isPasswordRevealed ? 35 : 40 + yellowPosition.faceY)}>
        <Pupil size={12} maxDistance={5} cursor={cursor} x={isPasswordRevealed ? -5 : undefined} y={isPasswordRevealed ? -4 : undefined} />
        <Pupil size={12} maxDistance={5} cursor={cursor} x={isPasswordRevealed ? -5 : undefined} y={isPasswordRevealed ? -4 : undefined} />
      </div>
    </div>
  </div>
}
