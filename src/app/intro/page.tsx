'use client'

import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function IntroPage() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const handleSkip = () => {
    router.push('/')
  }

  const handleVideoEnd = () => {
    router.push('/')
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.play()
          setIsLoading(false)
        } catch (error) {
          console.log("Autoplay with sound prevented, falling back to muted:", error)
          if (videoRef.current) {
            videoRef.current.muted = true
            setIsMuted(true)
            try {
              await videoRef.current.play()
              setIsLoading(false)
            } catch (err) {
              console.log("Muted autoplay also prevented:", err)
              setIsLoading(false)
            }
          }
        }
      }
    }

    // Add 2 second delay before starting
    const delayTimer = setTimeout(() => {
      playVideo()
    }, 2000)

    // Safety timeout (increased to account for delay)
    const timer = setTimeout(() => setIsLoading(false), 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(delayTimer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Video */}
      <video
        ref={videoRef}
        className="max-w-full max-h-full w-auto h-auto object-contain shadow-2xl"
        playsInline
        muted={isMuted}
        preload="auto"
        onLoadedData={() => {
          // Video loaded, but we wait for the delay to play and hide loader
          console.log("Video loaded, waiting for delay...")
        }}
        onEnded={handleVideoEnd}
      >
        <source src="/apre-video-hd4.mp4" type="video/mp4" />
      </video>

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      )}

      {/* Mute toggle if muted */}
      {isMuted && !isLoading && (
        <button
          onClick={toggleMute}
          className="absolute top-8 right-8 z-30 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full text-white transition-all"
        >
          {/* Speaker icon with x */}
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        </button>
      )}

      {/* Skip button - always visible at bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 gap-4">
        <button
          onClick={handleSkip}
          className="px-8 py-3 bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/30 rounded-full text-white font-montserrat text-sm tracking-widest uppercase transition-all duration-300"
        >
          Pular Vídeo
        </button>
      </div>
    </div>
  )
}
