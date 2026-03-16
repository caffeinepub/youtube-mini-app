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
        aria-label="Neon alien giraffe smoking a joint with boombox and TV background scene"
        viewBox="0 0 420 800"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          bottom: 0,
          left: "-10px",
          width: "min(440px, 100vw)",
          height: "auto",
          opacity: 0.46,
        }}
      >
        <defs>
          <radialGradient id="tvGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#aaff00" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#cc00ff" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#003300" stopOpacity="0.04" />
          </radialGradient>
          <radialGradient id="bodyAura" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#cc00ff" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#9900cc" stopOpacity="0" />
          </radialGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <style>{`
          .giraffe-body { animation: giraffeSway 2.8s ease-in-out infinite alternate; transform-origin: 160px 600px; }
          @keyframes giraffeSway {
            0%   { transform: translateY(0) rotate(-0.7deg); }
            100% { transform: translateY(-7px) rotate(0.7deg); }
          }
          /* alien eye glow */
          .eye-l { animation: eyeL 2s ease-in-out infinite alternate; }
          .eye-r { animation: eyeR 2.4s ease-in-out infinite alternate; }
          @keyframes eyeL {
            0%   { opacity:0.7; }
            100% { opacity:1; filter: drop-shadow(0 0 8px #00ffcc); }
          }
          @keyframes eyeR {
            0%   { opacity:0.65; }
            100% { opacity:1; filter: drop-shadow(0 0 8px #cc00ff); }
          }
          /* neon outline pulse */
          .neon-outline { animation: neonPulse 2.6s ease-in-out infinite alternate; }
          @keyframes neonPulse {
            0%   { filter: drop-shadow(0 0 3px #cc00ff); }
            100% { filter: drop-shadow(0 0 12px #cc00ff) drop-shadow(0 0 22px #9900ff); }
          }
          /* smoke */
          .smoke1 { animation: sp1 2.3s ease-in-out infinite; }
          .smoke2 { animation: sp2 2.3s ease-in-out infinite 0.75s; }
          .smoke3 { animation: sp3 2.3s ease-in-out infinite 1.5s; }
          .smoke4 { animation: sp4 2.9s ease-in-out infinite 0.35s; }
          .smoke5 { animation: sp5 3.3s ease-in-out infinite 1.15s; }
          @keyframes sp1 { 0%{transform:translateY(0) scale(1);opacity:.9} 60%{transform:translateY(-32px) translateX(5px) scale(1.9);opacity:.5} 100%{transform:translateY(-62px) translateX(9px) scale(2.8);opacity:0} }
          @keyframes sp2 { 0%{transform:translateY(0) scale(.85);opacity:.8} 60%{transform:translateY(-30px) translateX(-4px) scale(1.7);opacity:.4} 100%{transform:translateY(-58px) translateX(-8px) scale(2.5);opacity:0} }
          @keyframes sp3 { 0%{transform:translateY(0) scale(.75);opacity:.75} 60%{transform:translateY(-28px) translateX(6px) scale(1.6);opacity:.35} 100%{transform:translateY(-54px) translateX(11px) scale(2.3);opacity:0} }
          @keyframes sp4 { 0%{transform:translateY(0) scale(1);opacity:.65} 60%{transform:translateY(-36px) translateX(-5px) scale(2.1);opacity:.28} 100%{transform:translateY(-66px) translateX(-9px) scale(3);opacity:0} }
          @keyframes sp5 { 0%{transform:translateY(0) scale(1.1);opacity:.55} 60%{transform:translateY(-40px) translateX(5px) scale(2.3);opacity:.2} 100%{transform:translateY(-74px) translateX(9px) scale(3.2);opacity:0} }
          /* boombox */
          .boom { animation: boomPulse .55s ease-in-out infinite alternate; transform-origin: 220px 720px; }
          @keyframes boomPulse { 0%{transform:scale(0.97)} 100%{transform:scale(1.03)} }
          /* tv */
          .tv-s { animation: tvFlicker 2.1s steps(1) infinite; }
          @keyframes tvFlicker { 0%{opacity:.88} 15%{opacity:1} 30%{opacity:.82} 45%{opacity:.96} 60%{opacity:.78} 75%{opacity:1} 90%{opacity:.9} 100%{opacity:.85} }
          /* coins */
          .btc { animation: cf1 6s ease-in-out infinite; }
          .eth { animation: cf2 7.2s ease-in-out infinite 1.1s; }
          .sol { animation: cf3 5.8s ease-in-out infinite 2.2s; }
          .moon { animation: mf 4.5s ease-in-out infinite alternate; }
          @keyframes cf1 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-20px) rotate(9deg)} }
          @keyframes cf2 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-24px) rotate(-7deg)} }
          @keyframes cf3 { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-16px) rotate(13deg)} }
          @keyframes mf  { 0%{transform:translateY(0)} 100%{transform:translateY(-12px)} }
          /* charts */
          .cb  { animation: cp 1.9s ease-in-out infinite alternate; }
          .cb2 { animation: cp 1.9s ease-in-out infinite alternate .35s; }
          .cb3 { animation: cp 1.9s ease-in-out infinite alternate .7s; }
          @keyframes cp { 0%{opacity:.65} 100%{opacity:1} }
          /* hodl */
          .hodl { animation: hp 2.2s ease-in-out infinite alternate; }
          @keyframes hp { 0%{opacity:.75;filter:drop-shadow(0 0 4px #aaff00)} 100%{opacity:1;filter:drop-shadow(0 0 14px #aaff00) drop-shadow(0 0 24px #aaff0055)} }
          /* hash rain */
          .hr1 { animation: hd1 8s linear infinite; }
          .hr2 { animation: hd2 10s linear infinite 2.5s; }
          .hr3 { animation: hd3 7s linear infinite 4.5s; }
          @keyframes hd1 { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:.6} 90%{opacity:.4} 100%{transform:translateY(60px);opacity:0} }
          @keyframes hd2 { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:.5} 90%{opacity:.3} 100%{transform:translateY(50px);opacity:0} }
          @keyframes hd3 { 0%{transform:translateY(-20px);opacity:0} 10%{opacity:.4} 90%{opacity:.2} 100%{transform:translateY(55px);opacity:0} }
          /* antenna */
          .ant { animation: ab 1.5s ease-in-out infinite alternate; }
          @keyframes ab { 0%{opacity:.5} 100%{opacity:1;filter:drop-shadow(0 0 7px #cc00ff)} }
          /* spot pattern neon */
          .spot { animation: spotGlow 3s ease-in-out infinite alternate; }
          @keyframes spotGlow { 0%{opacity:.45} 100%{opacity:.75} }
        `}</style>

        {/* === HASH RAIN === */}
        <g
          className="hr1"
          style={{ fontSize: "7px", fontFamily: "monospace", fill: "#aaff00" }}
        >
          <text x="310" y="130">
            0x4f2a9c
          </text>
          <text x="310" y="143">
            b7e3d1f
          </text>
        </g>
        <g
          className="hr2"
          style={{ fontSize: "7px", fontFamily: "monospace", fill: "#aaff00" }}
        >
          <text x="340" y="200">
            3f9b7c1
          </text>
          <text x="340" y="213">
            a4d8e06
          </text>
        </g>
        <g
          className="hr3"
          style={{ fontSize: "6px", fontFamily: "monospace", fill: "#cc00ff" }}
        >
          <text x="320" y="270">
            0xDEAD
          </text>
          <text x="320" y="281">
            BEEF42
          </text>
        </g>

        {/* === FLOATING COINS === */}
        <g className="btc" transform="translate(368,55)">
          <circle
            cx="0"
            cy="0"
            r="17"
            fill="#1a1200"
            stroke="#f7931a"
            strokeWidth="2.5"
          />
          <text
            x="0"
            y="6"
            textAnchor="middle"
            style={{
              fontSize: "15px",
              fill: "#f7931a",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            ₿
          </text>
        </g>
        <g className="eth" transform="translate(395,130)">
          <circle
            cx="0"
            cy="0"
            r="14"
            fill="#0a0a1f"
            stroke="#627eea"
            strokeWidth="2.5"
          />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            style={{
              fontSize: "12px",
              fill: "#627eea",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            Ξ
          </text>
        </g>
        <g className="sol" transform="translate(378,215)">
          <circle
            cx="0"
            cy="0"
            r="12"
            fill="#0f0a1a"
            stroke="#9945ff"
            strokeWidth="2"
          />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            style={{
              fontSize: "8px",
              fill: "#9945ff",
              fontWeight: "bold",
              fontFamily: "sans-serif",
            }}
          >
            SOL
          </text>
        </g>
        <g className="moon" transform="translate(358,38)">
          <circle
            cx="0"
            cy="0"
            r="17"
            fill="#0a0a1a"
            stroke="#aaff00"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />
          <text
            x="0"
            y="-4"
            textAnchor="middle"
            style={{ fontSize: "12px", fill: "#aaff00" }}
          >
            🌙
          </text>
          <text
            x="0"
            y="9"
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

        {/* === CRYPTO MONITOR (top center) === */}
        <g transform="translate(120,18)">
          <rect
            x="0"
            y="0"
            width="165"
            height="108"
            rx="8"
            fill="#111"
            stroke="#cc00ff"
            strokeWidth="2"
            filter="url(#softGlow)"
          />
          <rect x="8" y="8" width="149" height="78" rx="4" fill="#060d06" />
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
          <rect
            className="cb"
            x="14"
            y="44"
            width="6"
            height="24"
            rx="1"
            fill="#aaff00"
          />
          <rect
            className="cb2"
            x="24"
            y="37"
            width="6"
            height="30"
            rx="1"
            fill="#aaff00"
          />
          <rect x="34" y="49" width="6" height="18" rx="1" fill="#ff4444" />
          <rect
            className="cb3"
            x="44"
            y="31"
            width="6"
            height="34"
            rx="1"
            fill="#aaff00"
          />
          <rect
            className="cb"
            x="54"
            y="27"
            width="6"
            height="38"
            rx="1"
            fill="#aaff00"
          />
          <rect x="64" y="43" width="6" height="20" rx="1" fill="#ff4444" />
          <rect
            className="cb2"
            x="74"
            y="21"
            width="6"
            height="42"
            rx="1"
            fill="#aaff00"
          />
          <rect
            className="cb3"
            x="84"
            y="17"
            width="6"
            height="46"
            rx="1"
            fill="#aaff00"
          />
          <polyline
            points="17,57 27,51 37,59 47,45 57,39 67,49 77,35 87,29 115,23 138,17"
            stroke="#cc00ff"
            strokeWidth="1.5"
            fill="none"
            strokeDasharray="3 2"
          />
          <text
            x="10"
            y="93"
            style={{ fontSize: "6px", fill: "#555", fontFamily: "monospace" }}
          >
            1D 1W 1M 1Y
          </text>
          <text
            x="108"
            y="93"
            style={{
              fontSize: "6px",
              fill: "#aaff00",
              fontFamily: "monospace",
            }}
          >
            $69,420
          </text>
          <rect x="72" y="108" width="20" height="10" rx="2" fill="#888" />
          <rect x="57" y="116" width="50" height="5" rx="2" fill="#666" />
        </g>

        {/* === HODL === */}
        <g className="hodl">
          <text
            x="240"
            y="305"
            style={{
              fontSize: "12px",
              fill: "#aaff00",
              fontWeight: "bold",
              fontFamily: "monospace",
              letterSpacing: "2px",
            }}
          >
            HODL 💎🙌
          </text>
          <text
            x="238"
            y="321"
            style={{
              fontSize: "9px",
              fill: "#cc00ff",
              fontFamily: "monospace",
            }}
          >
            TO THE MOON 🌙
          </text>
        </g>

        {/* === TV SET (right mid) === */}
        <g transform="translate(272,430)">
          <rect
            x="0"
            y="0"
            width="134"
            height="92"
            rx="8"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="2.5"
            filter="url(#neonGlow)"
          />
          <rect
            x="8"
            y="8"
            width="118"
            height="66"
            rx="4"
            fill="#0a0a0a"
            className="tv-s"
          />
          <rect
            x="8"
            y="8"
            width="118"
            height="66"
            rx="4"
            fill="url(#tvGlow)"
            className="tv-s"
            opacity="0.9"
          />
          <text
            x="12"
            y="26"
            className="tv-s"
            style={{
              fontSize: "7px",
              fill: "#aaff00",
              fontFamily: "monospace",
            }}
          >
            ₿ $69,420 ▲
          </text>
          <text
            x="12"
            y="39"
            className="tv-s"
            style={{
              fontSize: "7px",
              fill: "#00ffcc",
              fontFamily: "monospace",
            }}
          >
            Ξ $4,200 ▲
          </text>
          <text
            x="12"
            y="52"
            className="tv-s"
            style={{
              fontSize: "6px",
              fill: "#f7931a",
              fontFamily: "monospace",
            }}
          >
            DOGE 🚀 +420%
          </text>
          <text
            x="12"
            y="64"
            className="tv-s"
            style={{
              fontSize: "6px",
              fill: "#cc00ff",
              fontFamily: "monospace",
            }}
          >
            SOL ▲▲ PUMP
          </text>
          <rect x="26" y="92" width="10" height="16" rx="2" fill="#888" />
          <rect x="98" y="92" width="10" height="16" rx="2" fill="#888" />
          {/* Neon antennas */}
          <line
            x1="42"
            y1="0"
            x2="24"
            y2="-26"
            stroke="#cc00ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle className="ant" cx="23" cy="-29" r="4" fill="#cc00ff" />
          <line
            x1="92"
            y1="0"
            x2="112"
            y2="-28"
            stroke="#cc00ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle
            className="ant"
            cx="113"
            cy="-31"
            r="4"
            fill="#00ffcc"
            style={{ animationDelay: "0.7s" }}
          />
          <circle
            cx="130"
            cy="28"
            r="5"
            fill="#888"
            stroke="#cc00ff"
            strokeWidth="1"
          />
          <circle
            cx="130"
            cy="48"
            r="5"
            fill="#666"
            stroke="#cc00ff"
            strokeWidth="1"
          />
        </g>

        {/* === BOOMBOX (center bottom) === */}
        <g className="boom" transform="translate(130,666)">
          <rect
            x="0"
            y="0"
            width="185"
            height="76"
            rx="10"
            fill="#110011"
            stroke="#cc00ff"
            strokeWidth="2.5"
            filter="url(#neonGlow)"
          />
          {/* Left speaker */}
          <circle
            cx="30"
            cy="38"
            r="22"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <circle
            cx="30"
            cy="38"
            r="14"
            fill="#111"
            stroke="#9900cc"
            strokeWidth="1"
          />
          <circle
            cx="30"
            cy="38"
            r="7"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1"
          />
          <circle cx="30" cy="38" r="3" fill="#cc00ff" />
          {/* Right speaker */}
          <circle
            cx="155"
            cy="38"
            r="22"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <circle
            cx="155"
            cy="38"
            r="14"
            fill="#111"
            stroke="#9900cc"
            strokeWidth="1"
          />
          <circle
            cx="155"
            cy="38"
            r="7"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1"
          />
          <circle cx="155" cy="38" r="3" fill="#cc00ff" />
          {/* Cassette */}
          <rect
            x="62"
            y="8"
            width="61"
            height="34"
            rx="4"
            fill="#0a0a0a"
            stroke="#9900cc"
            strokeWidth="1"
          />
          <circle
            cx="77"
            cy="25"
            r="8"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1"
          />
          <circle cx="77" cy="25" r="3.5" fill="#cc00ff" opacity="0.9" />
          <circle
            cx="108"
            cy="25"
            r="8"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1"
          />
          <circle cx="108" cy="25" r="3.5" fill="#cc00ff" opacity="0.9" />
          <rect x="65" y="34" width="55" height="3" rx="1" fill="#222" />
          {/* Buttons */}
          <rect
            x="65"
            y="46"
            width="9"
            height="7"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
          <rect
            x="76"
            y="46"
            width="9"
            height="7"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
          <rect
            x="87"
            y="46"
            width="9"
            height="7"
            rx="1"
            fill="#cc00ff"
            opacity="0.85"
          />
          <rect
            x="98"
            y="46"
            width="9"
            height="7"
            rx="1"
            fill="#333"
            stroke="#555"
            strokeWidth="0.5"
          />
          {/* Neon base strip */}
          <rect
            x="10"
            y="68"
            width="165"
            height="3"
            rx="1.5"
            fill="#cc00ff"
            opacity="0.7"
            filter="url(#neonGlow)"
          />
        </g>

        {/* ===== NEON ALIEN GIRAFFE ===== */}
        <g className="giraffe-body">
          {/* Body aura */}
          <ellipse
            cx="160"
            cy="520"
            rx="80"
            ry="200"
            fill="url(#bodyAura)"
            opacity="0.5"
          />

          {/* === LEGS === */}
          {/* Back-left leg */}
          <rect x="118" y="590" width="18" height="70" rx="8" fill="#b8903c" />
          <rect
            x="116"
            y="622"
            width="22"
            height="38"
            rx="5"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <line
            x1="120"
            y1="633"
            x2="134"
            y2="633"
            stroke="#cc00ff"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="120"
            y1="641"
            x2="134"
            y2="641"
            stroke="#cc00ff"
            strokeWidth="1"
            opacity="0.5"
          />
          <ellipse
            cx="127"
            cy="660"
            rx="13"
            ry="5"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1"
          />

          {/* Back-right leg */}
          <rect x="196" y="590" width="18" height="70" rx="8" fill="#b8903c" />
          <circle
            cx="205"
            cy="626"
            r="10"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <circle cx="205" cy="626" r="5" fill="#cc00ff" opacity="0.7" />
          <ellipse
            cx="205"
            cy="660"
            rx="13"
            ry="5"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1"
          />

          {/* Body */}
          <ellipse cx="165" cy="545" rx="62" ry="56" fill="#d4a855" />
          {/* Neon alien spots on body */}
          <ellipse
            className="spot"
            cx="148"
            cy="530"
            rx="13"
            ry="17"
            fill="#cc00ff"
            opacity="0.5"
            transform="rotate(-15 148 530)"
          />
          <ellipse
            className="spot"
            cx="178"
            cy="562"
            rx="11"
            ry="15"
            fill="#9900cc"
            opacity="0.5"
            transform="rotate(10 178 562)"
          />
          <ellipse
            className="spot"
            cx="192"
            cy="535"
            rx="9"
            ry="12"
            fill="#cc00ff"
            opacity="0.45"
            transform="rotate(-5 192 535)"
          />
          <ellipse
            className="spot"
            cx="152"
            cy="560"
            rx="10"
            ry="13"
            fill="#7700aa"
            opacity="0.4"
          />
          {/* Chest panel */}
          <rect
            x="138"
            y="523"
            width="56"
            height="42"
            rx="8"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="2"
            opacity="0.9"
            className="neon-outline"
          />
          <line
            x1="145"
            y1="536"
            x2="187"
            y2="536"
            stroke="#cc00ff"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <line
            x1="145"
            y1="544"
            x2="187"
            y2="544"
            stroke="#00ffcc"
            strokeWidth="1"
            opacity="0.5"
          />
          <text
            x="163"
            y="558"
            style={{
              fontSize: "11px",
              fill: "#cc00ff",
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            👽
          </text>

          {/* Front-left leg */}
          <rect x="145" y="590" width="18" height="70" rx="8" fill="#d4a855" />
          <rect
            x="143"
            y="622"
            width="22"
            height="38"
            rx="5"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <line
            x1="147"
            y1="633"
            x2="161"
            y2="633"
            stroke="#cc00ff"
            strokeWidth="1"
            opacity="0.7"
          />
          <line
            x1="147"
            y1="641"
            x2="161"
            y2="641"
            stroke="#cc00ff"
            strokeWidth="1"
            opacity="0.5"
          />
          <ellipse
            cx="154"
            cy="660"
            rx="13"
            ry="5"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1"
          />

          {/* Front-right leg */}
          <rect x="174" y="590" width="18" height="70" rx="8" fill="#c49a45" />
          <circle
            cx="183"
            cy="626"
            r="10"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <circle cx="183" cy="626" r="5" fill="#cc00ff" opacity="0.7" />
          <ellipse
            cx="183"
            cy="660"
            rx="13"
            ry="5"
            fill="#0a0a0a"
            stroke="#cc00ff"
            strokeWidth="1"
          />

          {/* === NECK === */}
          <path
            d="M 158 482 Q 162 428 172 365 Q 178 335 185 315"
            stroke="#d4a855"
            strokeWidth="34"
            fill="none"
            strokeLinecap="round"
          />
          {/* Neon neck spots */}
          <ellipse
            className="spot"
            cx="163"
            cy="456"
            rx="9"
            ry="13"
            fill="#cc00ff"
            opacity="0.55"
            transform="rotate(-10 163 456)"
          />
          <ellipse
            className="spot"
            cx="168"
            cy="412"
            rx="8"
            ry="11"
            fill="#9900cc"
            opacity="0.55"
            transform="rotate(-15 168 412)"
          />
          <ellipse
            className="spot"
            cx="174"
            cy="372"
            rx="7"
            ry="9"
            fill="#cc00ff"
            opacity="0.5"
            transform="rotate(-20 174 372)"
          />
          {/* Neck cyber brace */}
          <rect
            x="157"
            y="393"
            width="33"
            height="20"
            rx="5"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
            opacity="0.9"
          />
          <line
            x1="162"
            y1="403"
            x2="185"
            y2="403"
            stroke="#cc00ff"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* === CYBER ARM holding joint === */}
          <path
            d="M 192 518 Q 212 488 220 455 Q 226 428 212 408 Q 208 398 210 382"
            stroke="#1a001a"
            strokeWidth="13"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 192 518 Q 212 488 220 455 Q 226 428 212 408 Q 208 398 210 382"
            stroke="#cc00ff"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="6 4"
          />
          <circle
            cx="220"
            cy="455"
            r="8"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <circle cx="220" cy="455" r="4" fill="#cc00ff" opacity="0.75" />
          {/* Claw fingers */}
          <path
            d="M 208 377 L 202 366 L 198 361"
            stroke="#cc00ff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 211 376 L 208 364 L 205 359"
            stroke="#cc00ff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 214 377 L 214 365 L 213 360"
            stroke="#cc00ff"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* === JOINT === */}
          <rect
            x="207"
            y="346"
            width="30"
            height="7"
            rx="3.5"
            fill="#f5e6c0"
            transform="rotate(-25 207 346)"
          />
          <rect
            x="207"
            y="346"
            width="10"
            height="7"
            rx="3"
            fill="#a0522d"
            transform="rotate(-25 207 346)"
          />
          {/* Ember */}
          <circle cx="208" cy="344" r="5" fill="#ff6600" opacity="0.95" />
          <circle cx="208" cy="344" r="8" fill="#ff4400" opacity="0.4" />
          <circle cx="208" cy="344" r="12" fill="#ff2200" opacity="0.15" />

          {/* === SMOKE (neon purple tinted) === */}
          <circle
            className="smoke1"
            cx="210"
            cy="340"
            r="7"
            fill="#cc88ff"
            opacity="0.88"
          />
          <circle
            className="smoke2"
            cx="205"
            cy="324"
            r="9"
            fill="#bb77ee"
            opacity="0.75"
          />
          <circle
            className="smoke3"
            cx="212"
            cy="308"
            r="11"
            fill="#aa66dd"
            opacity="0.65"
          />
          <circle
            className="smoke4"
            cx="206"
            cy="290"
            r="13"
            fill="#9955cc"
            opacity="0.55"
          />
          <circle
            className="smoke5"
            cx="214"
            cy="272"
            r="15"
            fill="#8844bb"
            opacity="0.45"
          />

          {/* === HEAD (giraffe shape + alien features) === */}
          <ellipse cx="192" cy="298" rx="30" ry="24" fill="#d4a855" />
          {/* Neon alien spots on head */}
          <ellipse
            className="spot"
            cx="182"
            cy="291"
            rx="8"
            ry="6"
            fill="#cc00ff"
            opacity="0.55"
          />
          <ellipse
            className="spot"
            cx="202"
            cy="302"
            rx="7"
            ry="5"
            fill="#9900cc"
            opacity="0.55"
          />

          {/* Ossicones (horns) with neon tips */}
          <line
            x1="180"
            y1="277"
            x2="173"
            y2="250"
            stroke="#c49a45"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="172" cy="247" r="5" fill="#c49a45" />
          <circle
            className="ant"
            cx="172"
            cy="247"
            r="4"
            fill="#cc00ff"
            opacity="0.9"
          />
          <line
            x1="196"
            y1="276"
            x2="196"
            y2="248"
            stroke="#c49a45"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="196" cy="245" r="5" fill="#c49a45" />
          <circle
            className="ant"
            cx="196"
            cy="245"
            r="4"
            fill="#00ffcc"
            opacity="0.9"
            style={{ animationDelay: "0.8s" }}
          />

          {/* === ALIEN EYES on giraffe head === */}
          {/* Left big alien eye */}
          <ellipse
            cx="176"
            cy="302"
            rx="14"
            ry="12"
            fill="#0a001a"
            stroke="#00ffcc"
            strokeWidth="2.5"
            className="eye-l"
          />
          <ellipse cx="176" cy="302" rx="9" ry="8" fill="#003322" />
          <ellipse cx="176" cy="302" rx="5" ry="4.5" fill="#006644" />
          <ellipse cx="176" cy="302" rx="2.5" ry="4" fill="#000" />
          <ellipse
            cx="176"
            cy="302"
            rx="2"
            ry="3"
            fill="#00ffcc"
            opacity="0.9"
          />
          <circle cx="171" cy="297" r="2" fill="#fff" opacity="0.5" />

          {/* Right alien eye */}
          <ellipse
            cx="204"
            cy="300"
            rx="13"
            ry="11"
            fill="#0a001a"
            stroke="#cc00ff"
            strokeWidth="2.5"
            className="eye-r"
          />
          <ellipse cx="204" cy="300" rx="8" ry="7" fill="#1a0030" />
          <ellipse cx="204" cy="300" rx="4.5" ry="4" fill="#440066" />
          <ellipse cx="204" cy="300" rx="2" ry="3.5" fill="#000" />
          <ellipse
            cx="204"
            cy="300"
            rx="1.8"
            ry="2.8"
            fill="#cc00ff"
            opacity="0.9"
          />
          <circle cx="199" cy="295" r="2" fill="#fff" opacity="0.5" />

          {/* Cybernetic skull plate */}
          <path
            d="M 168 286 Q 178 274 192 274 Q 205 274 212 281"
            stroke="#cc00ff"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
            className="neon-outline"
          />
          <circle
            cx="172"
            cy="288"
            r="2.5"
            fill="#888"
            stroke="#cc00ff"
            strokeWidth="0.8"
          />
          <circle
            cx="210"
            cy="284"
            r="2.5"
            fill="#888"
            stroke="#cc00ff"
            strokeWidth="0.8"
          />
          <line
            x1="174"
            y1="284"
            x2="208"
            y2="280"
            stroke="#cc00ff"
            strokeWidth="0.8"
            opacity="0.6"
          />

          {/* Nose slits (alien style) */}
          <ellipse
            cx="213"
            cy="308"
            rx="3"
            ry="3.5"
            fill="#cc00ff"
            opacity="0.7"
          />
          <ellipse
            cx="219"
            cy="310"
            rx="3"
            ry="3.5"
            fill="#cc00ff"
            opacity="0.7"
          />

          {/* Smirk */}
          <path
            d="M 206 318 Q 214 325 220 319"
            stroke="#cc00ff"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 206 318 Q 214 325 220 319"
            stroke="#ff88ff"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Ear */}
          <ellipse cx="218" cy="298" rx="7" ry="9" fill="#c49a45" />
          <ellipse
            cx="218"
            cy="298"
            rx="4"
            ry="5"
            fill="#cc00ff"
            opacity="0.3"
          />

          {/* Side antenna ears */}
          <ellipse
            cx="162"
            cy="300"
            rx="6"
            ry="10"
            fill="#1a001a"
            stroke="#cc00ff"
            strokeWidth="1.5"
          />
          <ellipse
            cx="162"
            cy="300"
            rx="3"
            ry="5"
            fill="#cc00ff"
            opacity="0.35"
          />
        </g>
      </svg>
    </div>
  );
}
