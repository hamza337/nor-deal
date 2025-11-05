import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'

// Constants
import { DEFAULT_SEGMENTS, COLORS } from '../../../utils/constants'

function getColorByIndex(index) {
  return COLORS[index % COLORS.length]
}

// Returns the index that lands under the fixed top pointer for a given rotation
function getIndexFromRotation(rotationDeg, segmentsCount) {
  const normalized = ((-rotationDeg % 360) + 360) % 360
  const anglePer = 360 / segmentsCount
  return Math.floor(normalized / anglePer)
}

const SpinWheel = ({
  segments = DEFAULT_SEGMENTS,
  durationMs = 4500,
  onFinish,
  setShowSpinModal,
}) => {
  const [rotationDeg, setRotationDeg] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const wheelRef = useRef(null)
  const targetIndexRef = useRef(null)
  const [wheelSize, setWheelSize] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const handleCloseModal = useCallback(() => {
    setShowModal(false)
    setIsSpinning(false)
  }, [])

  const anglePer = useMemo(() => 360 / Math.max(1, segments.length), [segments.length])

  useEffect(() => {
    if (!wheelRef.current) return
    const node = wheelRef.current
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setWheelSize(Math.min(width, height))
      }
    })
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  const gradientStyle = useMemo(() => {
    if (!segments.length) return {}
    let start = 0
    const parts = segments.map((seg, i) => {
      const end = start + anglePer
      const color = getColorByIndex(i)
      const piece = `${color} ${start}deg ${end}deg`
      start = end
      return piece
    })
    const background = `conic-gradient(${parts.join(', ')})`
    return { background }
  }, [segments, anglePer])

  const handleSpin = useCallback(() => {
    if (isSpinning || segments.length === 0) return
    const randomIndex = Math.floor(Math.random() * segments.length)
    targetIndexRef.current = randomIndex

    // Mid-angle of the target slice (0deg is at the top, increasing clockwise)
    const thetaMid = randomIndex * anglePer + anglePer / 2

    // Preserve continuity from current rotation while landing at target
    const base = ((rotationDeg % 360) + 360) % 360
    const deltaToTarget = (360 - thetaMid - base + 360) % 360
    const extraSpins = 4 + Math.floor(Math.random() * 4) // 4–7 full spins
    const nextRotation = rotationDeg + extraSpins * 360 + deltaToTarget

    setIsSpinning(true)
    setRotationDeg(nextRotation)
  }, [anglePer, isSpinning, rotationDeg, segments.length])

  const onTransitionEnd = useCallback(() => {
    if (!isSpinning) return
    setIsSpinning(false)
    const finalIndex = targetIndexRef.current ?? getIndexFromRotation(rotationDeg, segments.length)
    setSelectedIndex(finalIndex)
    if (typeof onFinish === 'function') {
      onFinish(segments[finalIndex], finalIndex)
    }
    setShowModal(true)
  }, [isSpinning, rotationDeg, segments, onFinish])

  const labelDistancePx = Math.max(24, Math.round(wheelSize * 0.36))

  return (
    <div className="w-full flex flex-col items-center gap-4 sm:gap-6">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
        {/* Pointer */}
        <div className="absolute top-3 sm:top-0 left-1/2 -translate-x-1/2 z-20 rotate-180">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '10px solid transparent',
              borderRight: '10px solid transparent',
              borderBottom: '14px solid #111827',
            }}
          />
        </div>

        {/* Wheel */}
        <div
          ref={wheelRef}
          className="absolute inset-0 rounded-full shadow-lg overflow-hidden border border-gray-200/60 dark:border-gray-700/60"
          style={{
            ...gradientStyle,
            transform: `rotate(${rotationDeg}deg)`,
            transition: isSpinning ? `transform ${durationMs}ms cubic-bezier(0.15, 0.85, 0.3, 1)` : 'none',
          }}
          onTransitionEnd={onTransitionEnd}
        >
          {/* Labels */}
          {segments.map((seg, i) => {
            const start = i * anglePer
            const mid = start + anglePer / 2
            return (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 z-10 select-none"
                style={{
                  transform: `translate(-50%, -50%) rotate(${mid}deg) translateY(-${labelDistancePx}px) rotate(${-mid}deg)`,
                  transformOrigin: 'center center',
                  textAlign: 'center',
                }}
              >
                <span className="block px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-xs md:text-sm font-medium bg-white/80 text-gray-900 shadow-md">
                  {seg.label}
                </span>
              </div>
            )
          })}
        </div>

        {/* Center spin button */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className={[
              'rounded-full! text-white font-semibold shadow-lg flex items-center justify-center leading-none overflow-hidden',
              'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28',
              isSpinning ? 'bg-[#f97316] cursor-not-allowed' : 'bg-[#fb923c] hover:bg-[#f97316]',
              'transition-colors',
            ].join(' ')}
            aria-label="Spin the wheel"
          >
            <span className="text-sm sm:text-base md:text-lg">{isSpinning ? 'Spinning…' : 'Spin'}</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {selectedIndex != null && (
          <div className="text-sm sm:text-base text-white">
            Result: <span className="font-semibold">{segments[selectedIndex]?.label}</span>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleCloseModal}
            aria-label="Close modal overlay"
          />
          <div className="relative z-10 w-11/12 max-w-md rounded-lg bg-white p-5 shadow-xl">
            <button
              type="button"
              className="absolute right-3 top-3 rounded-md p-1 text-gray-500 hover:bg-gray-100"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Get your coupon</h3>

            <div className="space-y-3">
              <div>
                <label htmlFor="coupon-name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="coupon-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-black pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 px-3"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="coupon-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="coupon-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-black pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 px-3"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <button
              onClick={() => {
                toast.success('The code has been sent to your email')
                handleCloseModal()
                setName('')
                setEmail('')
                setTimeout(() => {
                  setShowSpinModal(false)
                }, 2000)
              }}
              className="mt-4 w-full rounded-md bg-orange-500 px-4 py-2 text-white font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Get a coupon code
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default SpinWheel