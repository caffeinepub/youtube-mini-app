export default function CyborgGiraffeScene() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        role="img"
        aria-label="Cyborg giraffe crypto background scene"
        viewBox="0 0 400 700"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          right: "-20px",
          width: "min(420px, 100vw)",
          height: "auto",
          opacity: 0.38,
        }}
      >
        <style>{`
          .giraffe-body { animation: giraffeBody 2.4s ease-in-out infinite alternate; transform-origin: 200px 500px; }
          @keyframes giraffeBody {
            0%   { transform: translateY(0px) rotate(-0.8deg); }
            100% { transform: translateY(-8px) rotate(0.8deg); }
          }
          .smoke1 { animation: smokePuff1 2.2s ease-in-out infinite; transform-origin: 258px 295px; }
          .smoke2 { animation: smokePuff2 2.2s ease-in-out infinite 0.7s; transform-origin: 253px 280px; }
          .smoke3 { animation: smokePuff3 2.2s ease-in-out infinite 1.4s; transform-origin: 248px 265px; }
          .smoke4 { animation: smokePuff4 2.8s ease-in-out infinite 0.3s; transform-origin: 244px 252px; }
          .smoke5 { animation: smokePuff5 3.2s ease-in-out infinite 1.1s; transform-origin: 240px 238px; }
          @keyframes smokePuff1 {
            0%   { transform: translateY(0) scale(1); opacity: 0.9; }
            60%  { transform: translateY(-32px) translateX(4px) scale(1.8); opacity: 0.5; }
            100% { transform: translateY(-60px) translateX(8px) scale(2.6); opacity: 0; }
          }
          @keyframes smokePuff2 {
            0%   { transform: translateY(0) scale(0.9); opacity: 0.8; }
            60%  { transform: translateY(-30px) translateX(-3px) scale(1.6); opacity: 0.4; }
            100% { transform: translateY(-56px) translateX(-6px) scale(2.3); opacity: 0; }
          }
          @keyframes smokePuff3 {
            0%   { transform: translateY(0) scale(0.8); opacity: 0.75; }
            60%  { transform: translateY(-28px) translateX(5px) scale(1.5); opacity: 0.35; }
            100% { transform: translateY(-52px) translateX(10px) scale(2.1); opacity: 0; }
          }
          @keyframes smokePuff4 {
            0%   { transform: translateY(0) scale(1.1); opacity: 0.65; }
            60%  { transform: translateY(-35px) translateX(-4px) scale(2); opacity: 0.28; }
            100% { transform: translateY(-65px) translateX(-8px) scale(2.8); opacity: 0; }
          }
          @keyframes smokePuff5 {
            0%   { transform: translateY(0) scale(1.2); opacity: 0.55; }
            60%  { transform: translateY(-40px) translateX(6px) scale(2.2); opacity: 0.2; }
            100% { transform: translateY(-75px) translateX(12px) scale(3); opacity: 0; }
          }
          .boombox-speaker { animation: speakerPulse 0.6s ease-in-out infinite alternate; transform-origin: 90px 600px; }
          @keyframes speakerPulse {
            0%   { transform: scale(0.97); }
            100% { transform: scale(1.03); }
          }
          .tv-screen { animation: tvFlicker 2.1s steps(1) infinite; }
          @keyframes tvFlicker {
            0%   { opacity: 0.88; }
            14%  { opacity: 1; }
            28%  { opacity: 0.82; }
            42%  { opacity: 0.96; }
            57%  { opacity: 0.78; }
            71%  { opacity: 1; }
            85%  { opacity: 0.9; }
            100% { opacity: 0.85; }
          }
          .robotic-eye-glow { animation: eyeGlow 1.8s ease-in-out infinite alternate; }
          @keyframes eyeGlow {
            0%   { opacity: 0.7; r: 4; }
            100% { opacity: 1; r: 5.5; }
          }
          .btc-float { animation: cryptoFloat1 6s ease-in-out infinite; }
          .eth-float { animation: cryptoFloat2 7s ease-in-out infinite 1s; }
          .doge-float { animation: cryptoFloat3 5.5s ease-in-out infinite 2s; }
          .sol-float { animation: cryptoFloat4 8s ease-in-out infinite 0.5s; }
          .moon-float { animation: moonFloat 4s ease-in-out infinite alternate; }
          @keyframes cryptoFloat1 {
            0%   { transform: translateY(0) rotate(0deg); opacity: 0.9; }
            50%  { transform: translateY(-18px) rotate(8deg); opacity: 1; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          }
          @keyframes cryptoFloat2 {
            0%   { transform: translateY(0) rotate(0deg); opacity: 0.85; }
            50%  { transform: translateY(-22px) rotate(-6deg); opacity: 1; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.85; }
          }
          @keyframes cryptoFloat3 {
            0%   { transform: translateY(0) rotate(0deg); opacity: 0.8; }
            50%  { transform: translateY(-14px) rotate(12deg); opacity: 0.95; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.8; }
          }
          @keyframes cryptoFloat4 {
            0%   { transform: translateY(0) rotate(0deg); opacity: 0.75; }
            50%  { transform: translateY(-20px) rotate(-10deg); opacity: 0.95; }
            100% { transform: translateY(0) rotate(0deg); opacity: 0.75; }
          }
          @keyframes moonFloat {
            0%   { transform: translateY(0); }
            100% { transform: translateY(-10px); }
          }
          .hash-rain { animation: hashDrift 8s linear infinite; }
          .hash-rain2 { animation: hashDrift2 10s linear infinite 2s; }
          .hash-rain3 { animation: hashDrift3 7s linear infinite 4s; }
          @keyframes hashDrift {
            0%   { transform: translateY(-20px); opacity: 0; }
            10%  { opacity: 0.7; }
            90%  { opacity: 0.5; }
            100% { transform: translateY(60px); opacity: 0; }
          }
          @keyframes hashDrift2 {
            0%   { transform: translateY(-20px); opacity: 0; }
            10%  { opacity: 0.6; }
            90%  { opacity: 0.4; }
            100% { transform: translateY(50px); opacity: 0; }
          }
          @keyframes hashDrift3 {
            0%   { transform: translateY(-20px); opacity: 0; }
            10%  { opacity: 0.5; }
            90%  { opacity: 0.3; }
            100% { transform: translateY(55px); opacity: 0; }
          }
          .chart-bar { animation: chartPulse 1.8s ease-in-out infinite alternate; }
          .chart-bar2 { animation: chartPulse 1.8s ease-in-out infinite alternate 0.3s; }
          .chart-bar3 { animation: chartPulse 1.8s ease-in-out infinite alternate 0.6s; }
          @keyframes chartPulse {
            0%   { opacity: 0.7; }
            100% { opacity: 1; }
          }
          .hodl-text { animation: hodlPulse 2s ease-in-out infinite alternate; }
          @keyframes hodlPulse {
            0%   { opacity: 0.8; filter: drop-shadow(0 0 4px #aaff00); }
            100% { opacity: 1; filter: drop-shadow(0 0 12px #aaff00) drop-shadow(0 0 20px #aaff0066); }
          }
        `}</style>

        {/* ===== CRYPTO HASH RAIN (background layer) ===== */}
        <g
          className="hash-rain"
          style={{ fontSize: "7px", fontFamily: "monospace", fill: "#aaff00" }}
        >
          <text x="20" y="80">
            0x4f2a9c
          </text>
          <text x="20" y="92">
            b7e3d1f
          </text>
          <text x="20" y="104">
            8a0c5e2
          </text>
        </g>
        <g
          className="hash-rain2"
          style={{ fontSize: "7px", fontFamily: "monospace", fill: "#aaff00" }}
        >
          <text x="50" y="120">
            3f9b7c1
          </text>
          <text x="50" y="132">
            a4d8e06
          </text>
          <text x="50" y="144">
            1c5f2b9
          </text>
        </g>
        <g
          className="hash-rain3"
          style={{ fontSize: "6px", fontFamily: "monospace", fill: "#00ffcc" }}
        >
          <text x="30" y="160">
            0xDEAD
          </text>
          <text x="30" y="171">
            BEEF42
          </text>
        </g>

        {/* ===== FLOATING CRYPTO COINS ===== */}
        {/* Bitcoin */}
        <g className="btc-float" transform="translate(30, 50)">
          <circle
            cx="0"
            cy="0"
            r="18"
            fill="#1a1200"
            stroke="#f7931a"
            strokeWidth="2.5"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            style={{
              fontSize: "16px",
              fill: "#f7931a",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            ₿
          </text>
        </g>
        {/* Ethereum */}
        <g className="eth-float" transform="translate(340, 80)">
          <circle
            cx="0"
            cy="0"
            r="16"
            fill="#0a0a1f"
            stroke="#627eea"
            strokeWidth="2.5"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            style={{
              fontSize: "14px",
              fill: "#627eea",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            Ξ
          </text>
        </g>
        {/* Doge */}
        <g className="doge-float" transform="translate(15, 200)">
          <circle
            cx="0"
            cy="0"
            r="13"
            fill="#1a1200"
            stroke="#c2a633"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            style={{
              fontSize: "11px",
              fill: "#c2a633",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            Ð
          </text>
        </g>
        {/* SOL */}
        <g className="sol-float" transform="translate(355, 180)">
          <circle
            cx="0"
            cy="0"
            r="13"
            fill="#0f0a1a"
            stroke="#9945ff"
            strokeWidth="2"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            style={{
              fontSize: "9px",
              fill: "#9945ff",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            SOL
          </text>
        </g>

        {/* ===== CRYPTO MONITOR (top center, above giraffe) ===== */}
        <g transform="translate(110, 30)">
          {/* Monitor body */}
          <rect
            x="0"
            y="0"
            width="170"
            height="110"
            rx="8"
            fill="#111"
            stroke="#c0c0c0"
            strokeWidth="2"
          />
          {/* Screen */}
          <rect x="8" y="8" width="154" height="80" rx="4" fill="#060d06" />
          {/* Screen label */}
          <text
            x="10"
            y="20"
            style={{
              fontSize: "7px",
              fill: "#aaff00",
              fontFamily: "monospace",
            }}
          >
            BTC/USD ▲ +6.9%
          </text>
          {/* Candlestick chart */}
          {/* Green candles */}
          <rect
            className="chart-bar"
            x="14"
            y="45"
            width="6"
            height="24"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="17"
            y1="40"
            x2="17"
            y2="45"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="17"
            y1="69"
            x2="17"
            y2="74"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          <rect
            className="chart-bar2"
            x="24"
            y="38"
            width="6"
            height="30"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="27"
            y1="33"
            x2="27"
            y2="38"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="27"
            y1="68"
            x2="27"
            y2="73"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          {/* Red candle dip */}
          <rect x="34" y="50" width="6" height="18" rx="1" fill="#ff4444" />
          <line
            x1="37"
            y1="46"
            x2="37"
            y2="50"
            stroke="#ff4444"
            strokeWidth="1.5"
          />
          <line
            x1="37"
            y1="68"
            x2="37"
            y2="72"
            stroke="#ff4444"
            strokeWidth="1.5"
          />

          <rect
            className="chart-bar3"
            x="44"
            y="32"
            width="6"
            height="34"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="47"
            y1="27"
            x2="47"
            y2="32"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="47"
            y1="66"
            x2="47"
            y2="71"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          <rect
            className="chart-bar"
            x="54"
            y="28"
            width="6"
            height="38"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="57"
            y1="23"
            x2="57"
            y2="28"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="57"
            y1="66"
            x2="57"
            y2="71"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          {/* Red dip */}
          <rect x="64" y="44" width="6" height="20" rx="1" fill="#ff4444" />
          <line
            x1="67"
            y1="40"
            x2="67"
            y2="44"
            stroke="#ff4444"
            strokeWidth="1.5"
          />
          <line
            x1="67"
            y1="64"
            x2="67"
            y2="68"
            stroke="#ff4444"
            strokeWidth="1.5"
          />

          <rect
            className="chart-bar2"
            x="74"
            y="22"
            width="6"
            height="42"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="77"
            y1="17"
            x2="77"
            y2="22"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="77"
            y1="64"
            x2="77"
            y2="69"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          <rect
            className="chart-bar3"
            x="84"
            y="18"
            width="6"
            height="46"
            rx="1"
            fill="#aaff00"
          />
          <line
            x1="87"
            y1="13"
            x2="87"
            y2="18"
            stroke="#aaff00"
            strokeWidth="1.5"
          />
          <line
            x1="87"
            y1="64"
            x2="87"
            y2="69"
            stroke="#aaff00"
            strokeWidth="1.5"
          />

          {/* Trending line */}
          <polyline
            points="17,58 27,52 37,60 47,46 57,40 67,50 77,36 87,30 120,24 140,18"
            stroke="#00ffcc"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 2"
          />

          {/* Bottom labels */}
          <text
            x="10"
            y="95"
            style={{ fontSize: "6px", fill: "#555", fontFamily: "monospace" }}
          >
            1D 1W 1M 1Y
          </text>
          <text
            x="110"
            y="95"
            style={{
              fontSize: "6px",
              fill: "#aaff00",
              fontFamily: "monospace",
            }}
          >
            $69,420
          </text>

          {/* Monitor stand */}
          <rect x="75" y="110" width="20" height="10" rx="2" fill="#888" />
          <rect x="60" y="118" width="50" height="5" rx="2" fill="#666" />
        </g>

        {/* ===== HODL / TO THE MOON text ===== */}
        <g className="hodl-text">
          <text
            x="28"
            y="290"
            style={{
              fontSize: "13px",
              fill: "#aaff00",
              fontWeight: "bold",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            HODL 💎🙌
          </text>
          <text
            x="22"
            y="310"
            style={{
              fontSize: "10px",
              fill: "#00ffcc",
              fontFamily: "monospace",
            }}
          >
            TO THE MOON 🌙
          </text>
        </g>

        {/* ===== TV SET (left side) ===== */}
        <g transform="translate(10, 440)">
          {/* TV body */}
          <rect
            x="10"
            y="0"
            width="110"
            height="80"
            rx="8"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="2.5"
          />
          {/* TV screen */}
          <rect
            x="18"
            y="8"
            width="94"
            height="58"
            rx="4"
            fill="#0a0a0a"
            className="tv-screen"
          />
          {/* Screen glow content */}
          <rect
            x="18"
            y="8"
            width="94"
            height="58"
            rx="4"
            fill="url(#tvGlow)"
            className="tv-screen"
            opacity="0.9"
          />
          {/* Crypto price on TV */}
          <text
            x="22"
            y="26"
            className="tv-screen"
            style={{
              fontSize: "7px",
              fill: "#aaff00",
              fontFamily: "monospace",
            }}
          >
            ₿ $69,420 ▲
          </text>
          <text
            x="22"
            y="38"
            className="tv-screen"
            style={{
              fontSize: "7px",
              fill: "#00ffcc",
              fontFamily: "monospace",
            }}
          >
            Ξ $4,200 ▲
          </text>
          <text
            x="22"
            y="50"
            className="tv-screen"
            style={{
              fontSize: "6px",
              fill: "#f7931a",
              fontFamily: "monospace",
            }}
          >
            DOGE 🚀 +420%
          </text>
          {/* TV legs */}
          <rect x="30" y="80" width="10" height="18" rx="2" fill="#888" />
          <rect x="90" y="80" width="10" height="18" rx="2" fill="#888" />
          {/* Antenna left */}
          <line
            x1="45"
            y1="0"
            x2="28"
            y2="-28"
            stroke="#c0c0c0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="-30" r="3" fill="#aaff00" />
          {/* Antenna right */}
          <line
            x1="75"
            y1="0"
            x2="95"
            y2="-30"
            stroke="#c0c0c0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="95" cy="-32" r="3" fill="#aaff00" />
          {/* Channel knob */}
          <circle
            cx="112"
            cy="25"
            r="5"
            fill="#888"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <circle
            cx="112"
            cy="45"
            r="5"
            fill="#666"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
        </g>

        {/* ===== BOOMBOX (center-right bottom) ===== */}
        <g className="boombox-speaker" transform="translate(150, 560)">
          <rect
            x="0"
            y="0"
            width="160"
            height="70"
            rx="10"
            fill="#111"
            stroke="#c0c0c0"
            strokeWidth="2"
          />
          {/* Left speaker */}
          <circle
            cx="28"
            cy="35"
            r="20"
            fill="#0a0a0a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <circle
            cx="28"
            cy="35"
            r="13"
            fill="#111"
            stroke="#888"
            strokeWidth="1"
          />
          <circle
            cx="28"
            cy="35"
            r="6"
            fill="#1a1a1a"
            stroke="#aaff00"
            strokeWidth="1"
          />
          <circle cx="28" cy="35" r="2.5" fill="#aaff00" />
          {/* Right speaker */}
          <circle
            cx="132"
            cy="35"
            r="20"
            fill="#0a0a0a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <circle
            cx="132"
            cy="35"
            r="13"
            fill="#111"
            stroke="#888"
            strokeWidth="1"
          />
          <circle
            cx="132"
            cy="35"
            r="6"
            fill="#1a1a1a"
            stroke="#aaff00"
            strokeWidth="1"
          />
          <circle cx="132" cy="35" r="2.5" fill="#aaff00" />
          {/* Center cassette/display area */}
          <rect
            x="55"
            y="8"
            width="50"
            height="30"
            rx="4"
            fill="#0a0a0a"
            stroke="#888"
            strokeWidth="1"
          />
          {/* Cassette reels */}
          <circle
            cx="68"
            cy="23"
            r="7"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <circle cx="68" cy="23" r="3" fill="#aaff00" />
          <circle
            cx="92"
            cy="23"
            r="7"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <circle cx="92" cy="23" r="3" fill="#aaff00" />
          {/* Tape slot */}
          <rect x="58" y="32" width="44" height="3" rx="1" fill="#222" />
          {/* Buttons */}
          <rect
            x="58"
            y="42"
            width="8"
            height="6"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
          <rect
            x="68"
            y="42"
            width="8"
            height="6"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
          <rect
            x="78"
            y="42"
            width="8"
            height="6"
            rx="1"
            fill="#aaff00"
            opacity="0.8"
          />
          <rect
            x="88"
            y="42"
            width="8"
            height="6"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
        </g>

        {/* ===== CYBORG GIRAFFE ===== */}
        <g className="giraffe-body">
          {/* Back legs */}
          <rect x="163" y="538" width="16" height="65" rx="7" fill="#b8903c" />
          <rect
            x="161"
            y="570"
            width="20"
            height="33"
            rx="4"
            fill="#2a2a2a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <line
            x1="165"
            y1="580"
            x2="177"
            y2="580"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <line
            x1="165"
            y1="586"
            x2="177"
            y2="586"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <ellipse
            cx="171"
            cy="603"
            rx="12"
            ry="5"
            fill="#1a1a1a"
            stroke="#888"
            strokeWidth="1"
          />

          <rect x="250" y="538" width="16" height="65" rx="7" fill="#b8903c" />
          <circle
            cx="258"
            cy="570"
            r="9"
            fill="#333"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <circle cx="258" cy="570" r="4" fill="#aaff00" opacity="0.8" />
          <ellipse
            cx="258"
            cy="603"
            rx="12"
            ry="5"
            fill="#1a1a1a"
            stroke="#888"
            strokeWidth="1"
          />

          {/* Body */}
          <ellipse cx="213" cy="490" rx="60" ry="55" fill="#d4a855" />
          {/* Body spots */}
          <ellipse
            cx="195"
            cy="475"
            rx="12"
            ry="16"
            fill="#7a5c28"
            opacity="0.5"
            transform="rotate(-15 195 475)"
          />
          <ellipse
            cx="225"
            cy="510"
            rx="10"
            ry="14"
            fill="#7a5c28"
            opacity="0.5"
            transform="rotate(10 225 510)"
          />
          <ellipse
            cx="240"
            cy="480"
            rx="8"
            ry="11"
            fill="#7a5c28"
            opacity="0.5"
            transform="rotate(-5 240 480)"
          />
          <ellipse
            cx="200"
            cy="508"
            rx="9"
            ry="12"
            fill="#7a5c28"
            opacity="0.4"
          />
          {/* Cybernetic chest plate */}
          <rect
            x="185"
            y="465"
            width="55"
            height="40"
            rx="8"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
            opacity="0.85"
          />
          <line
            x1="192"
            y1="478"
            x2="232"
            y2="478"
            stroke="#aaff00"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <line
            x1="192"
            y1="485"
            x2="232"
            y2="485"
            stroke="#aaff00"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Crypto symbol on chest */}
          <text
            x="207"
            y="500"
            style={{
              fontSize: "10px",
              fill: "#aaff00",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            ₿
          </text>
          <circle
            cx="215"
            cy="478"
            r="4"
            fill="none"
            stroke="#aaff00"
            strokeWidth="1"
            opacity="0.9"
          />

          {/* Front left leg */}
          <rect x="193" y="538" width="16" height="65" rx="7" fill="#d4a855" />
          <rect
            x="191"
            y="570"
            width="20"
            height="33"
            rx="4"
            fill="#2a2a2a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <line
            x1="195"
            y1="580"
            x2="207"
            y2="580"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <line
            x1="195"
            y1="586"
            x2="207"
            y2="586"
            stroke="#c0c0c0"
            strokeWidth="1"
          />
          <ellipse
            cx="201"
            cy="603"
            rx="12"
            ry="5"
            fill="#1a1a1a"
            stroke="#888"
            strokeWidth="1"
          />

          {/* Front right leg */}
          <rect x="222" y="538" width="16" height="65" rx="7" fill="#c49a45" />
          <circle
            cx="230"
            cy="570"
            r="9"
            fill="#333"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <circle cx="230" cy="570" r="4" fill="#aaff00" opacity="0.8" />
          <ellipse
            cx="230"
            cy="603"
            rx="12"
            ry="5"
            fill="#1a1a1a"
            stroke="#888"
            strokeWidth="1"
          />

          {/* Neck */}
          <path
            d="M 205 420 Q 208 370 220 310 Q 228 285 235 270"
            stroke="#d4a855"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          {/* Neck spots */}
          <ellipse
            cx="210"
            cy="400"
            rx="8"
            ry="11"
            fill="#7a5c28"
            opacity="0.6"
            transform="rotate(-10 210 400)"
          />
          <ellipse
            cx="216"
            cy="360"
            rx="7"
            ry="10"
            fill="#7a5c28"
            opacity="0.6"
            transform="rotate(-15 216 360)"
          />
          <ellipse
            cx="222"
            cy="320"
            rx="6"
            ry="8"
            fill="#7a5c28"
            opacity="0.6"
            transform="rotate(-20 222 320)"
          />
          {/* Cybernetic neck brace */}
          <rect
            x="204"
            y="340"
            width="30"
            height="18"
            rx="4"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <line
            x1="208"
            y1="349"
            x2="230"
            y2="349"
            stroke="#aaff00"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* Cybernetic arm (right, holding joint) */}
          <path
            d="M 240 460 Q 260 430 268 400 Q 274 375 260 355 Q 256 345 258 330"
            stroke="#2a2a2a"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 240 460 Q 260 430 268 400 Q 274 375 260 355 Q 256 345 258 330"
            stroke="#c0c0c0"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          {/* Arm joint sphere */}
          <circle
            cx="268"
            cy="400"
            r="8"
            fill="#333"
            stroke="#c0c0c0"
            strokeWidth="1.5"
          />
          <circle cx="268" cy="400" r="4" fill="#aaff00" opacity="0.7" />
          {/* Mechanical hand/claw */}
          <path
            d="M 256 325 L 260 315 L 256 310"
            stroke="#c0c0c0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 260 325 L 265 314 L 262 309"
            stroke="#c0c0c0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 264 327 L 270 316 L 268 311"
            stroke="#c0c0c0"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Joint (smoking) — bigger and more visible */}
          <rect
            x="259"
            y="296"
            width="28"
            height="6"
            rx="3"
            fill="#f5e6c0"
            transform="rotate(-25 259 296)"
          />
          <rect
            x="259"
            y="296"
            width="9"
            height="6"
            rx="2.5"
            fill="#a0522d"
            transform="rotate(-25 259 296)"
          />
          {/* Ember glow — enhanced */}
          <circle cx="258" cy="295" r="4" fill="#ff6600" opacity="0.95" />
          <circle cx="258" cy="295" r="7" fill="#ff4400" opacity="0.4" />
          <circle cx="258" cy="295" r="10" fill="#ff2200" opacity="0.15" />

          {/* Smoke puffs — more and bigger */}
          <circle
            className="smoke1"
            cx="258"
            cy="293"
            r="7"
            fill="#bbbbbb"
            opacity="0.9"
          />
          <circle
            className="smoke2"
            cx="253"
            cy="278"
            r="9"
            fill="#aaaaaa"
            opacity="0.8"
          />
          <circle
            className="smoke3"
            cx="248"
            cy="262"
            r="11"
            fill="#999999"
            opacity="0.7"
          />
          <circle
            className="smoke4"
            cx="244"
            cy="248"
            r="13"
            fill="#888888"
            opacity="0.6"
          />
          <circle
            className="smoke5"
            cx="240"
            cy="232"
            r="15"
            fill="#777777"
            opacity="0.5"
          />

          {/* HEAD */}
          <ellipse cx="240" cy="255" rx="28" ry="22" fill="#d4a855" />
          {/* Head spots */}
          <ellipse
            cx="230"
            cy="248"
            rx="7"
            ry="5"
            fill="#7a5c28"
            opacity="0.6"
          />
          <ellipse
            cx="250"
            cy="258"
            rx="6"
            ry="4"
            fill="#7a5c28"
            opacity="0.6"
          />

          {/* Ossicones (horns) */}
          <line
            x1="230"
            y1="235"
            x2="224"
            y2="210"
            stroke="#c49a45"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="223" cy="207" r="5" fill="#c49a45" />
          <line
            x1="245"
            y1="234"
            x2="245"
            y2="208"
            stroke="#c49a45"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="245" cy="205" r="5" fill="#c49a45" />

          {/* ROBOTIC EYE (left - cyborg side) */}
          <circle
            cx="225"
            cy="258"
            r="10"
            fill="#1a1a1a"
            stroke="#c0c0c0"
            strokeWidth="2"
          />
          <circle cx="225" cy="258" r="6" fill="#0a0a0a" />
          <circle
            cx="225"
            cy="258"
            r="4"
            fill="none"
            stroke="#aaff00"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <circle
            className="robotic-eye-glow"
            cx="225"
            cy="258"
            r="4"
            fill="#aaff00"
            opacity="0.6"
          />
          <line
            x1="218"
            y1="258"
            x2="232"
            y2="258"
            stroke="#aaff00"
            strokeWidth="1"
            opacity="0.7"
          />

          {/* Normal eye (right) */}
          <ellipse cx="252" cy="255" rx="7" ry="6" fill="#1a1a1a" />
          <circle cx="253" cy="254" r="3" fill="#3a2800" />
          <circle cx="254" cy="253" r="1.5" fill="#fff" opacity="0.7" />

          {/* Nostril */}
          <ellipse cx="262" cy="268" rx="4" ry="2.5" fill="#b08030" />

          {/* Mouth (smiling) */}
          <path
            d="M 255 272 Q 262 278 268 273"
            stroke="#8a6020"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Cybernetic skull plate */}
          <path
            d="M 218 240 Q 226 228 238 228 Q 248 228 254 235"
            stroke="#c0c0c0"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />
          <circle
            cx="222"
            cy="242"
            r="2.5"
            fill="#888"
            stroke="#c0c0c0"
            strokeWidth="0.8"
          />
          <circle
            cx="250"
            cy="238"
            r="2.5"
            fill="#888"
            stroke="#c0c0c0"
            strokeWidth="0.8"
          />
          <line
            x1="224"
            y1="238"
            x2="248"
            y2="234"
            stroke="#aaff00"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Ear */}
          <ellipse cx="265" cy="252" rx="7" ry="9" fill="#c49a45" />
          <ellipse cx="265" cy="252" rx="4" ry="5" fill="#e8b870" />
        </g>

        {/* ===== TO THE MOON floating symbol ===== */}
        <g className="moon-float" transform="translate(340, 40)">
          <circle
            cx="0"
            cy="0"
            r="20"
            fill="#0a0a1a"
            stroke="#aaff00"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text
            x="0"
            y="-5"
            textAnchor="middle"
            style={{ fontSize: "14px", fill: "#aaff00" }}
          >
            🌙
          </text>
          <text
            x="0"
            y="10"
            textAnchor="middle"
            style={{
              fontSize: "5px",
              fill: "#aaff00",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}
          >
            MOON
          </text>
        </g>

        {/* Gradient defs */}
        <defs>
          <radialGradient id="tvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#aaff00" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#00ffcc" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#003300" stopOpacity="0.05" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
