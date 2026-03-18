"use client";

import { useState, useEffect, useRef } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

declare global {
  interface Window {
    YT: { Player: new (id: string, opts: object) => YTPlayer };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  destroy(): void;
}

const VIDEO_ID = "NwOvu-j_WjY";
const PLAYER_DIV_ID = "yt-bg-music-player";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);

  useEffect(() => {
    const initPlayer = () => {
      if (!document.getElementById(PLAYER_DIV_ID)) return;
      playerRef.current = new window.YT.Player(PLAYER_DIV_ID, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.setVolume(22);
            setReady(true);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(s);
      }
    }

    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, []);

  const toggle = () => {
    if (!ready || !playerRef.current) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setPlaying((p) => !p);
  };

  return (
    <>
      {/* Hidden YouTube iframe container */}
      <div
        id={PLAYER_DIV_ID}
        style={{
          position: "fixed",
          bottom: "-10px",
          left: "-10px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      />

      {/* Toggle button */}
      <button
        onClick={toggle}
        aria-label={playing ? "หยุดเพลง" : "เปิดเพลง"}
        title={playing ? "หยุดเพลง" : "เปิดเพลงพื้นหลัง"}
        className={`relative w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300
          ${!ready
            ? "border-muted-lilac/10 bg-vinyl-dark/40 text-soft-white/25 cursor-wait"
            : playing
              ? "border-sky-cyan/50 bg-sky-cyan/10 text-sky-cyan hover:border-sky-cyan/80 hover:shadow-[0_0_12px_rgba(0,200,255,0.35)] cursor-pointer"
              : "border-muted-lilac/30 bg-vinyl-dark/80 text-soft-white/60 hover:border-neon-magenta/60 hover:text-soft-white hover:shadow-[0_0_12px_rgba(255,45,120,0.3)] cursor-pointer"
          }`}
      >
        {playing ? <FiVolume2 size={15} /> : <FiVolumeX size={15} />}

        {/* Pulse ring when playing */}
        {playing && (
          <span className="absolute inset-0 rounded-full border border-sky-cyan/40 animate-ping opacity-60" />
        )}
      </button>
    </>
  );
}
