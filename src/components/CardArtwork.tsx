"use client";

/**
 * SVG Tarot Card Artwork — Japan City Pop Style
 * 4 cards: The Sun, The Moon, The Star, The World
 * ViewBox: 270 × 360 (3:4 ratio)
 */

/* ═══════════════════════════════════════════════════════════
   ☀️  THE SUN — 太陽
   Warm sunset, anime sun face, beach scene, couple silhouette
   ═══════════════════════════════════════════════════════════ */
export function SunCardArt() {
  const cx = 135, cy = 148;
  const primaryRays   = [0, 45, 90, 135, 180, 225, 270, 315];
  const secondaryRays = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

  return (
    <svg viewBox="0 0 270 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="sg_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#B03000" />
          <stop offset="38%"  stopColor="#FF2D78" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#F5C200" />
        </linearGradient>
        <radialGradient id="sg_sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFE566" />
          <stop offset="100%" stopColor="#FFA500" />
        </radialGradient>
        <clipPath id="sg_clip">
          <rect width="270" height="360" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#sg_clip)">
        {/* Sky gradient */}
        <rect width="270" height="360" fill="url(#sg_bg)" />

        {/* Halftone dot grid */}
        {[0,1,2,3,4,5].flatMap(row => [0,1,2,3,4].map(col => (
          <circle key={`hd${row}-${col}`}
            cx={28 + col * 54} cy={22 + row * 56}
            r="2.8" fill="#FFE200" opacity="0.22" />
        )))}

        {/* Memphis corner triangles */}
        <polygon points="0,0 55,0 0,55"      fill="#1C1C2E" opacity="0.5" />
        <polygon points="270,0 215,0 270,55"  fill="#1C1C2E" opacity="0.5" />
        <polygon points="0,360 55,360 0,305"  fill="#1C1C2E" opacity="0.3" />
        <polygon points="270,360 215,360 270,305" fill="#1C1C2E" opacity="0.3" />

        {/* Sun halos */}
        <circle cx={cx} cy={cy} r="118" fill="#FFD700" opacity="0.07" />
        <circle cx={cx} cy={cy} r="96"  fill="#FFD700" opacity="0.12" />

        {/* Primary rays */}
        {primaryRays.map((angle, i) => (
          <rect key={`pr${i}`}
            x={cx - 4} y={cy - 118} width="8" height="46"
            fill="#FFE566" rx="4"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            opacity="0.95" />
        ))}
        {/* Secondary rays */}
        {secondaryRays.map((angle, i) => (
          <rect key={`sr${i}`}
            x={cx - 2.5} y={cy - 106} width="5" height="30"
            fill="#FFC107" rx="2.5"
            transform={`rotate(${angle}, ${cx}, ${cy})`}
            opacity="0.7" />
        ))}

        {/* Sun circle */}
        <circle cx={cx} cy={cy} r="72" fill="url(#sg_sun)" stroke="#1C1C2E" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="64" fill="none" stroke="#FF9500" strokeWidth="1.5" strokeDasharray="7 4" />

        {/* Anime face — eyes */}
        <ellipse cx={cx - 21} cy={cy - 7} rx="8"   ry="9.5" fill="#1C1C2E" />
        <ellipse cx={cx + 21} cy={cy - 7} rx="8"   ry="9.5" fill="#1C1C2E" />
        {/* Eye shine */}
        <circle cx={cx - 17} cy={cy - 11} r="2.8" fill="white" />
        <circle cx={cx + 25} cy={cy - 11} r="2.8" fill="white" />
        {/* Blush */}
        <ellipse cx={cx - 37} cy={cy + 11} rx="12" ry="7.5" fill="#FF6B9D" opacity="0.55" />
        <ellipse cx={cx + 37} cy={cy + 11} rx="12" ry="7.5" fill="#FF6B9D" opacity="0.55" />
        {/* Smile */}
        <path d={`M ${cx-23} ${cy+17} Q ${cx} ${cy+40} ${cx+23} ${cy+17}`}
          fill="none" stroke="#1C1C2E" strokeWidth="4" strokeLinecap="round" />
        {/* Nose dot */}
        <circle cx={cx} cy={cy + 6} r="2" fill="#CC6600" opacity="0.5" />

        {/* Beach sand */}
        <rect y="265" width="270" height="95" fill="#D4994A" />
        <rect y="265" width="270" height="7"  fill="#B07830" />
        {/* Wave line */}
        <path d="M 0 278 Q 68 271 135 278 Q 202 285 270 278"
          fill="none" stroke="#B07830" strokeWidth="2" opacity="0.5" />

        {/* Palm tree */}
        <rect x="38" y="200" width="10" height="72" fill="#2A1A0A" rx="4" />
        <ellipse cx="41" cy="198" rx="35" ry="10" fill="#1A3A12" transform="rotate(-30 41 198)" />
        <ellipse cx="41" cy="198" rx="30" ry="9"  fill="#1A3A12" transform="rotate(10 41 198)" />
        <ellipse cx="41" cy="198" rx="26" ry="8"  fill="#1A3A12" transform="rotate(48 41 198)" />
        <ellipse cx="41" cy="198" rx="22" ry="7"  fill="#1A3A12" transform="rotate(-65 41 198)" />
        {/* Coconuts */}
        <circle cx="48" cy="207" r="4" fill="#4A2800" />
        <circle cx="42" cy="210" r="3.5" fill="#4A2800" />

        {/* Person 1 — tall (sunglasses guy) */}
        <circle cx="178" cy="230" r="14" fill="#1C1C2E" />
        {/* Hair sweep */}
        <path d="M 164 224 Q 167 212 178 215 Q 189 212 192 224" fill="#0A0A0A" />
        {/* Sunglasses */}
        <rect x="168" y="226" width="10" height="7" rx="3" fill="#224466" />
        <rect x="180" y="226" width="10" height="7" rx="3" fill="#224466" />
        <line x1="178" y1="229" x2="180" y2="229" stroke="#1C1C2E" strokeWidth="1.5" />
        <rect x="170" y="244" width="17" height="32" fill="#1C1C2E" rx="4" />
        {/* Shirt detail */}
        <line x1="178" y1="248" x2="178" y2="274" stroke="#333366" strokeWidth="1.5" opacity="0.4" />

        {/* Person 2 — shorter girl */}
        <circle cx="202" cy="233" r="12" fill="#1C1C2E" />
        {/* Long hair */}
        <path d="M 190 230 Q 188 248 192 265" fill="none" stroke="#0A0A0A" strokeWidth="5" strokeLinecap="round" />
        <path d="M 214 230 Q 216 248 212 265" fill="none" stroke="#0A0A0A" strokeWidth="4" strokeLinecap="round" />
        <rect x="195" y="245" width="14" height="28" fill="#1C1C2E" rx="4" />
        {/* Dress flare */}
        <path d="M 195 268 Q 188 278 190 282 Q 202 275 214 282 Q 216 278 209 268 Z" fill="#1C1C2E" />
        {/* Joined hands */}
        <path d="M 187 265 L 195 262" stroke="#1C1C2E" strokeWidth="4.5" strokeLinecap="round" />

        {/* Title bar */}
        <rect x="16" y="12"  width="238" height="30" fill="#1C1C2E" rx="5" />
        <text x="135" y="33" textAnchor="middle" fill="#FFD700"
          fontSize="12" fontWeight="bold" letterSpacing="6" fontFamily="Georgia, serif">THE SUN</text>

        {/* Bottom info */}
        <rect x="16" y="285" width="238" height="60" fill="#1C1C2E" opacity="0.82" rx="5" />
        <text x="135" y="312" textAnchor="middle" fill="#FFD700"
          fontSize="22" fontFamily="Georgia, serif" fontWeight="bold">太陽</text>
        <text x="135" y="333" textAnchor="middle" fill="#F4ECE4"
          fontSize="9" letterSpacing="3" fontFamily="sans-serif">VITALITY · JOY · SUCCESS</text>

        {/* Manga double border */}
        <rect x="5"  y="5"  width="260" height="350" rx="13" fill="none" stroke="#1C1C2E" strokeWidth="4" />
        <rect x="10" y="10" width="250" height="340" rx="10" fill="none" stroke="#FFD700"  strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/** Pre-compute building windows data (avoids block arrow fn + filter inside JSX) */
function getBuildingWindows(bx: number, bh: number, bw: number, bi: number) {
  const result: { key: string; x: number; y: number; lit: boolean }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 2; col++) {
      const wx = bx + 4 + col * (Math.floor(bw / 2) - 2);
      const wy = 265 - bh + 5 + row * 14;
      if (wy > 260) continue;
      result.push({ key: `w${bi}-${row}-${col}`, x: wx, y: wy, lit: (bi + row + col) % 3 !== 0 });
    }
  }
  return result;
}

/* ═══════════════════════════════════════════════════════════
   🌙  THE MOON — 月
   Deep night sky, crescent moon, city skyline, reflection
   ═══════════════════════════════════════════════════════════ */
export function MoonCardArt() {
  // Crescent: Moon circle (cx=132, cy=145, r=84), Hole (cx=172, cy=124, r=76)
  const starPositions = [
    [32,42],[222,28],[65,95],[245,78],[92,52],[198,118],
    [42,175],[252,162],[75,198],[235,208],[158,38],[105,176],
    [205,52],[140,92],[52,128],[240,135],[88,145],
  ];

  return (
    <svg viewBox="0 0 270 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="mg_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#05051E" />
          <stop offset="55%"  stopColor="#0F1040" />
          <stop offset="100%" stopColor="#0A1828" />
        </linearGradient>
        <radialGradient id="mg_glow" cx="48%" cy="40%" r="50%">
          <stop offset="0%"   stopColor="#8B5CF6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="mg_moon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFFDE8" />
          <stop offset="100%" stopColor="#E8D5A0" />
        </linearGradient>
        {/* Crescent clip: full rect minus hole circle (evenodd) */}
        <clipPath id="mg_crescent">
          <path fillRule="evenodd"
            d="M 0 0 H 270 V 360 H 0 Z M 172 124 m -76 0 a 76,76 0 1,0 152,0 a 76,76 0 1,0 -152,0" />
        </clipPath>
        <clipPath id="mg_card">
          <rect width="270" height="360" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#mg_card)">
        {/* Background */}
        <rect width="270" height="360" fill="url(#mg_bg)" />
        {/* Purple glow aura */}
        <ellipse cx="132" cy="145" rx="110" ry="100" fill="url(#mg_glow)" />

        {/* Scattered stars */}
        {starPositions.map(([x, y], i) => {
          const s = i % 3 === 0 ? 6 : i % 3 === 1 ? 4.5 : 3.5;
          const color = i % 4 === 0 ? "#00C8FF" : i % 4 === 1 ? "#C084FC" : "#F4ECE4";
          const op = i % 3 === 0 ? 1 : 0.65;
          return (
            <polygon key={i}
              points={`${x},${y-s} ${x+s*0.38},${y-s*0.38} ${x+s},${y} ${x+s*0.38},${y+s*0.38} ${x},${y+s} ${x-s*0.38},${y+s*0.38} ${x-s},${y} ${x-s*0.38},${y-s*0.38}`}
              fill={color} opacity={op} />
          );
        })}

        {/* Moon ring glow */}
        <circle cx="132" cy="145" r="96" fill="none" stroke="#C084FC" strokeWidth="1" opacity="0.2" />
        <circle cx="132" cy="145" r="88" fill="none" stroke="#00C8FF" strokeWidth="0.8" opacity="0.15" />

        {/* Crescent moon — clipped */}
        <circle cx="132" cy="145" r="84" fill="url(#mg_moon)" clipPath="url(#mg_crescent)" />
        {/* Moon surface detail */}
        <circle cx="108" cy="130" r="8"  fill="none" stroke="#C8B870" strokeWidth="1" opacity="0.4" clipPath="url(#mg_crescent)" />
        <circle cx="118" cy="158" r="5"  fill="none" stroke="#C8B870" strokeWidth="1" opacity="0.3" clipPath="url(#mg_crescent)" />
        <circle cx="96"  cy="152" r="12" fill="none" stroke="#C8B870" strokeWidth="1" opacity="0.3" clipPath="url(#mg_crescent)" />
        {/* Moon outline */}
        <circle cx="132" cy="145" r="84" fill="none" stroke="#E8D5A0" strokeWidth="2" clipPath="url(#mg_crescent)" />

        {/* Neon accent rings */}
        <circle cx="132" cy="145" r="108" fill="none" stroke="#C084FC" strokeWidth="1.5" opacity="0.25" strokeDasharray="6 8" />

        {/* City skyline */}
        {[
          [10,50,35],[50,32,22],[76,62,18],[98,38,25],[127,55,16],
          [147,42,40],[191,58,22],[216,33,30],[248,48,22],
        ].map(([bx, bh, bw], i) => (
          <g key={i}>
            <rect x={bx} y={265 - bh} width={bw} height={bh + 45}
              fill="#0A0A2E" stroke="#1A1A50" strokeWidth="0.5" />
            {/* Windows */}
            {getBuildingWindows(bx, bh, bw, i).map(w => (
              <rect key={w.key} x={w.x} y={w.y} width="5" height="4"
                fill={w.lit ? "#FFE566" : "#1A2A4A"} opacity={w.lit ? 0.85 : 0.4} />
            ))}
          </g>
        ))}

        {/* Ground */}
        <rect y="310" width="270" height="50" fill="#060618" />

        {/* Water reflection — horizontal shimmer lines */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={i}
            x1="0" y1={318 + i * 6} x2="270" y2={318 + i * 6}
            stroke={i % 2 === 0 ? "#00C8FF" : "#C084FC"}
            strokeWidth={i === 0 ? 1.5 : 0.8}
            opacity={0.15 - i * 0.015} />
        ))}
        {/* Reflection shimmer dots */}
        {[20,60,100,145,185,225,255].map((rx, i) => (
          <ellipse key={i} cx={rx} cy={322 + (i % 3) * 5}
            rx="8" ry="1.5" fill="#00C8FF" opacity="0.2" />
        ))}

        {/* Title */}
        <rect x="16" y="12" width="238" height="30" fill="#0A0A2E" opacity="0.9" rx="5" />
        <text x="135" y="33" textAnchor="middle" fill="#C084FC"
          fontSize="12" fontWeight="bold" letterSpacing="6" fontFamily="Georgia, serif">THE MOON</text>

        {/* Bottom info */}
        <rect x="16" y="285" width="238" height="60" fill="#0A0A2E" opacity="0.9" rx="5" />
        <text x="135" y="312" textAnchor="middle" fill="#C084FC"
          fontSize="22" fontFamily="Georgia, serif" fontWeight="bold">月</text>
        <text x="135" y="333" textAnchor="middle" fill="#C8B8E8"
          fontSize="9" letterSpacing="3" fontFamily="sans-serif">DREAMS · INTUITION · MYSTERY</text>

        {/* Border */}
        <rect x="5"  y="5"  width="260" height="350" rx="13" fill="none" stroke="#0A0A2E" strokeWidth="4" />
        <rect x="10" y="10" width="250" height="340" rx="10" fill="none" stroke="#C084FC"  strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   ⭐  THE STAR — 星
   Deep cosmos, 8-point gold star, constellation, girl silhouette,
   city pop rainbow stripes
   ═══════════════════════════════════════════════════════════ */
export function StarCardArt() {
  // 8-point star polygon (cx=135, cy=152, outer=72, inner=28)
  const starPts = "207,152 161,163 186,203 146,178 135,224 124,178 84,203 109,163 63,152 109,141 84,101 124,126 135,80 146,126 186,101 161,141";

  const smallStars: [number, number, number][] = [
    [48,58,4],[215,42,5],[72,102,3.5],[242,88,4.5],[95,65,3],
    [195,130,3.5],[55,185,3],[250,170,4],[88,210,3],[232,215,3.5],
    [160,48,5],[108,185,3],[205,62,4],[145,100,3],
  ];

  return (
    <svg viewBox="0 0 270 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="stg_bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0E0520" />
          <stop offset="60%"  stopColor="#1A0A35" />
          <stop offset="100%" stopColor="#220A2A" />
        </linearGradient>
        <radialGradient id="stg_glow" cx="50%" cy="42%" r="45%">
          <stop offset="0%"   stopColor="#F0D040" stopOpacity="0.25" />
          <stop offset="60%"  stopColor="#FF2D78" stopOpacity="0.08" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="stg_star" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#FFE566" />
          <stop offset="100%" stopColor="#FFA500" />
        </linearGradient>
        <clipPath id="stg_card">
          <rect width="270" height="360" rx="14" />
        </clipPath>
      </defs>

      <g clipPath="url(#stg_card)">
        {/* Background */}
        <rect width="270" height="360" fill="url(#stg_bg)" />
        <ellipse cx="135" cy="152" rx="130" ry="110" fill="url(#stg_glow)" />

        {/* Memphis corner accents */}
        <polygon points="0,0 40,0 0,40"      fill="#2D1060" opacity="0.7" />
        <polygon points="270,0 230,0 270,40"  fill="#2D1060" opacity="0.7" />

        {/* Small constellation stars */}
        {smallStars.map(([x, y, s], i) => {
          const color = i % 4 === 0 ? "#F0D040" : i % 4 === 1 ? "#00C8FF" : i % 4 === 2 ? "#F472B6" : "#F4ECE4";
          return (
            <polygon key={i}
              points={`${x},${y-s} ${x+s*0.38},${y-s*0.38} ${x+s},${y} ${x+s*0.38},${y+s*0.38} ${x},${y+s} ${x-s*0.38},${y+s*0.38} ${x-s},${y} ${x-s*0.38},${y-s*0.38}`}
              fill={color} opacity="0.8" />
          );
        })}

        {/* Constellation lines */}
        <g stroke="#F0D040" strokeWidth="0.7" opacity="0.25">
          <line x1="48"  y1="58"  x2="72"  y2="102" />
          <line x1="72"  y1="102" x2="108" y2="185" />
          <line x1="215" y1="42"  x2="195" y2="130" />
          <line x1="195" y1="130" x2="232" y2="215" />
          <line x1="95"  y1="65"  x2="48"  y2="58" />
        </g>

        {/* Concentric rings around star */}
        <circle cx="135" cy="152" r="100" fill="none" stroke="#F0D040" strokeWidth="0.8" opacity="0.12" />
        <circle cx="135" cy="152" r="86"  fill="none" stroke="#F0D040" strokeWidth="0.8" opacity="0.15" strokeDasharray="5 7" />
        <circle cx="135" cy="152" r="78"  fill="none" stroke="#FF2D78" strokeWidth="1"   opacity="0.2" />

        {/* Star glow */}
        <circle cx="135" cy="152" r="60" fill="#F0D040" opacity="0.08" />
        <circle cx="135" cy="152" r="45" fill="#F0D040" opacity="0.12" />

        {/* 8-point star */}
        <polygon points={starPts}
          fill="url(#stg_star)" stroke="#1C1C2E" strokeWidth="2" />
        {/* Star shine lines */}
        <line x1="135" y1="80"  x2="135" y2="224" stroke="white" strokeWidth="1"   opacity="0.15" />
        <line x1="63"  y1="152" x2="207" y2="152" stroke="white" strokeWidth="1"   opacity="0.15" />
        <line x1="84"  y1="101" x2="186" y2="203" stroke="white" strokeWidth="0.8" opacity="0.1" />
        <line x1="186" y1="101" x2="84"  y2="203" stroke="white" strokeWidth="0.8" opacity="0.1" />
        {/* Center gem */}
        <circle cx="135" cy="152" r="12" fill="#FFE566" />
        <circle cx="135" cy="152" r="8"  fill="white" opacity="0.6" />
        <circle cx="131" cy="148" r="3"  fill="white" opacity="0.9" />

        {/* Girl silhouette — reaching toward star */}
        {/* Body */}
        <ellipse cx="55" cy="242" rx="10" ry="10" fill="#1C1C2E" />
        {/* Long hair */}
        <path d="M 45 242 Q 40 260 44 278" fill="none" stroke="#0A0A0A" strokeWidth="6" strokeLinecap="round" />
        {/* Torso */}
        <rect x="48" y="252" width="15" height="28" fill="#1C1C2E" rx="4" />
        {/* Dress flare */}
        <path d="M 47 275 Q 38 292 42 298 Q 55 290 68 298 Q 72 292 63 275 Z" fill="#1C1C2E" />
        {/* Arm reaching up */}
        <path d="M 55 258 Q 70 235 90 215" fill="none" stroke="#1C1C2E" strokeWidth="5" strokeLinecap="round" />
        {/* Hand sparkle */}
        <circle cx="91" cy="213" r="3.5" fill="#F0D040" opacity="0.8" />
        <polygon points="91,205 92.5,210 97,211 93.5,214 94.5,219 91,216 87.5,219 88.5,214 85,211 89.5,210"
          fill="#F0D040" opacity="0.6" />

        {/* City pop rainbow stripes at bottom */}
        {[
          ["#FF2D78", 268], ["#FF6B35", 283], ["#F0D040", 298],
          ["#00C8FF", 313], ["#818CF8", 328], ["#C084FC", 343],
        ].map(([color, y], i) => (
          <rect key={i} x="0" y={Number(y)} width="270" height="15"
            fill={String(color)} opacity="0.88" />
        ))}

        {/* Title */}
        <rect x="16" y="12" width="238" height="30" fill="#0E0520" opacity="0.9" rx="5" />
        <text x="135" y="33" textAnchor="middle" fill="#F0D040"
          fontSize="12" fontWeight="bold" letterSpacing="6" fontFamily="Georgia, serif">THE STAR</text>

        {/* Bottom label over stripes */}
        <rect x="55" y="270" width="160" height="24" fill="#0E0520" opacity="0.75" rx="4" />
        <text x="135" y="287" textAnchor="middle" fill="#F0D040"
          fontSize="16" fontFamily="Georgia, serif" fontWeight="bold">星</text>

        {/* Border */}
        <rect x="5"  y="5"  width="260" height="350" rx="13" fill="none" stroke="#0E0520" strokeWidth="4" />
        <rect x="10" y="10" width="250" height="340" rx="10" fill="none" stroke="#F0D040"  strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   🌍  THE WORLD — 世界
   4-color pinwheel bg, globe mandala, Memphis shapes, wreath
   ═══════════════════════════════════════════════════════════ */
export function WorldCardArt() {
  const cx = 135, cy = 178;

  return (
    <svg viewBox="0 0 270 360" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <clipPath id="wg_card">
          <rect width="270" height="360" rx="14" />
        </clipPath>
        <clipPath id="wg_globe">
          <circle cx={cx} cy={cy} r="88" />
        </clipPath>
        <radialGradient id="wg_globe_fill" cx="40%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#DDEEFF" />
          <stop offset="100%" stopColor="#A8C8E8" />
        </radialGradient>
      </defs>

      <g clipPath="url(#wg_card)">
        {/* 4-color pinwheel background */}
        {/* Top — hot pink */}
        <polygon points="0,0 270,0 135,180" fill="#FF2D78" />
        {/* Right — golden yellow */}
        <polygon points="270,0 270,360 135,180" fill="#F0D040" />
        {/* Bottom — sky cyan */}
        <polygon points="270,360 0,360 135,180" fill="#00C8FF" />
        {/* Left — lavender */}
        <polygon points="0,360 0,0 135,180" fill="#C084FC" />

        {/* White diagonal zigzag dividers */}
        <line x1="0" y1="0" x2="135" y2="180" stroke="white" strokeWidth="2" opacity="0.3" />
        <line x1="270" y1="0" x2="135" y2="180" stroke="white" strokeWidth="2" opacity="0.3" />
        <line x1="270" y1="360" x2="135" y2="180" stroke="white" strokeWidth="2" opacity="0.3" />
        <line x1="0" y1="360" x2="135" y2="180" stroke="white" strokeWidth="2" opacity="0.3" />

        {/* Memphis floating shapes */}
        {/* Triangles */}
        <polygon points="28,55 48,55 38,35"  fill="white" opacity="0.25" />
        <polygon points="235,65 255,65 245,45" fill="white" opacity="0.25" />
        <polygon points="18,290 38,290 28,310" fill="white" opacity="0.2" />
        <polygon points="240,280 260,280 250,300" fill="white" opacity="0.2" />
        {/* Dots */}
        {[
          [22,88],[248,82],[15,210],[255,215],[30,165],[248,155],
          [55,30],[218,30],[55,325],[215,325],
        ].map(([dx, dy], i) => (
          <circle key={i} cx={dx} cy={dy} r="5" fill="white" opacity="0.25" />
        ))}
        {/* Diamond accents */}
        <polygon points="42,130 52,145 42,160 32,145" fill="white" opacity="0.2" />
        <polygon points="228,130 238,145 228,160 218,145" fill="white" opacity="0.2" />
        {/* Zigzag line top */}
        <path d="M 20 22 L 35 15 L 50 22 L 65 15 L 80 22 L 95 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />
        <path d="M 175 22 L 190 15 L 205 22 L 220 15 L 235 22 L 250 15" fill="none" stroke="white" strokeWidth="1.5" opacity="0.3" />

        {/* Globe circle background */}
        <circle cx={cx} cy={cy} r="92" fill="white" opacity="0.15" />
        <circle cx={cx} cy={cy} r="90" fill="url(#wg_globe_fill)" stroke="white" strokeWidth="3" />

        {/* Globe: latitude lines */}
        {[-3, -2, -1, 0, 1, 2, 3].map((n, i) => {
          const yOff = n * 24;
          const halfW = Math.sqrt(Math.max(0, 86 * 86 - yOff * yOff));
          if (halfW < 5) return null;
          return (
            <ellipse key={i}
              cx={cx} cy={cy + yOff}
              rx={halfW} ry={Math.abs(yOff) < 1 ? 1 : 6}
              fill="none" stroke="#1A4A7A" strokeWidth={n === 0 ? 1.5 : 0.8}
              opacity={n === 0 ? 0.5 : 0.3} />
          );
        })}

        {/* Globe: longitude ellipses */}
        {[0, 28, 56, 84].map((rx, i) => (
          <ellipse key={i}
            cx={cx} cy={cy}
            rx={rx === 0 ? 1 : rx} ry="88"
            fill="none" stroke="#1A4A7A"
            strokeWidth={rx === 0 ? 1.5 : 0.8}
            opacity={rx === 0 ? 0.5 : 0.28}
            clipPath="url(#wg_globe)" />
        ))}

        {/* Continent blobs (simplified) */}
        {/* Large land mass */}
        <ellipse cx={cx - 18} cy={cy - 30} rx="32" ry="22"
          fill="#4A9A4A" opacity="0.55" clipPath="url(#wg_globe)" />
        <ellipse cx={cx + 30} cy={cy - 10} rx="22" ry="30"
          fill="#4A9A4A" opacity="0.5" clipPath="url(#wg_globe)" />
        <ellipse cx={cx - 10} cy={cy + 38} rx="28" ry="18"
          fill="#4A9A4A" opacity="0.45" clipPath="url(#wg_globe)" />
        <ellipse cx={cx + 10} cy={cy + 55} rx="18" ry="12"
          fill="#4A9A4A" opacity="0.4" clipPath="url(#wg_globe)" />
        {/* Small island */}
        <ellipse cx={cx - 52} cy={cy + 20} rx="10" ry="8"
          fill="#4A9A4A" opacity="0.4" clipPath="url(#wg_globe)" />

        {/* Globe shine */}
        <ellipse cx={cx - 28} cy={cy - 40} rx="22" ry="14"
          fill="white" opacity="0.25" clipPath="url(#wg_globe)" />

        {/* Globe outline */}
        <circle cx={cx} cy={cy} r="90" fill="none" stroke="#1C1C2E" strokeWidth="2.5" />

        {/* Decorative wreath — leaf arcs */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2 - Math.PI / 2;
          const r1 = 100, r2 = 112;
          const x1 = cx + r1 * Math.cos(angle);
          const y1 = cy + r1 * Math.sin(angle);
          const x2 = cx + r2 * Math.cos(angle + 0.2);
          const y2 = cy + r2 * Math.sin(angle + 0.2);
          const x3 = cx + r1 * Math.cos(angle + 0.4);
          const y3 = cy + r1 * Math.sin(angle + 0.4);
          const isTop = i < 8;
          return (
            <path key={i}
              d={`M ${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`}
              fill="none"
              stroke={isTop ? "#2D8A2D" : "#1A6A1A"}
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.75" />
          );
        })}
        {/* Wreath ribbon at bottom */}
        <path d={`M ${cx - 15} ${cy + 112} Q ${cx} ${cy + 118} ${cx + 15} ${cy + 112}`}
          fill="none" stroke="#FF2D78" strokeWidth="4" strokeLinecap="round" opacity="0.8" />

        {/* Title */}
        <rect x="16" y="12" width="238" height="30" fill="#1C1C2E" opacity="0.85" rx="5" />
        <text x="135" y="33" textAnchor="middle" fill="#F0D040"
          fontSize="12" fontWeight="bold" letterSpacing="5" fontFamily="Georgia, serif">THE WORLD</text>

        {/* Bottom info */}
        <rect x="16" y="298" width="238" height="52" fill="#1C1C2E" opacity="0.82" rx="5" />
        <text x="135" y="323" textAnchor="middle" fill="#F0D040"
          fontSize="22" fontFamily="Georgia, serif" fontWeight="bold">世界</text>
        <text x="135" y="342" textAnchor="middle" fill="#F4ECE4"
          fontSize="9" letterSpacing="3" fontFamily="sans-serif">COMPLETION · HARMONY · UNITY</text>

        {/* Border */}
        <rect x="5"  y="5"  width="260" height="350" rx="13" fill="none" stroke="#1C1C2E" strokeWidth="4" />
        <rect x="10" y="10" width="250" height="340" rx="10" fill="none" stroke="#F0D040"  strokeWidth="1.5" />
      </g>
    </svg>
  );
}

/* ── Artwork lookup map ─────────────────────────────────────── */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const artworkMap: Record<string, () => any> = {
  sun:   SunCardArt,
  moon:  MoonCardArt,
  star:  StarCardArt,
  world: WorldCardArt,
};
