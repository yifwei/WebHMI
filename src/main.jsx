import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const asset = (name) => `${import.meta.env.BASE_URL}${name}`;

function Symbol({ name, className = '', style, alt = '' }) {
  return <img className={`symbol ${className}`} style={style} src={asset(name)} alt={alt} />;
}

function BlueText({ children, className = '', style }) {
  return (
    <div className={`blue-text ${className}`} style={style}>
      {children}
    </div>
  );
}

function Button({ children, style }) {
  return (
    <button className="hmi-button" style={style}>
      {children}
    </button>
  );
}

function InfoPanel({ title, rows, style }) {
  return (
    <div className="info-panel" style={style}>
      <div className="panel-title">{title}</div>
      {rows.map((row) => (
        <div className="panel-row" key={`${row.label}-${row.value}`}>
          <span>{row.label}</span>
          <b>{row.value}</b>
        </div>
      ))}
    </div>
  );
}

function Pipe({ x, y, w, h = 5, color = '#f4f6f6', vertical = false, className = '' }) {
  return (
    <div
      className={`pipe ${vertical ? 'pipe-vertical' : 'pipe-horizontal'} ${className}`}
      style={{
        left: x,
        top: y,
        width: vertical ? h : w,
        height: vertical ? w : h,
        '--pipe-color': color
      }}
    />
  );
}

function AirDuct({ className = '', style }) {
  return <div className={`air-duct ${className}`} style={style} />;
}

function Marker({ style, className = '' }) {
  return <span className={`marker ${className}`} style={style} />;
}

function PipeTick({ style, vertical = false }) {
  return <span className={`pipe-tick ${vertical ? 'pipe-tick-vertical' : ''}`} style={style} />;
}

function Sensor({ label, style }) {
  return (
    <div className="sensor" style={style}>
      <span>{label}</span>
    </div>
  );
}

function VsdBox({ style }) {
  return (
    <div className="vsd-box" style={style}>
      <div className="vsd-display" />
      <span>VSD</span>
    </div>
  );
}

function ScaleBox({ style }) {
  return (
    <div className="scale-box" style={style}>
      <span />
    </div>
  );
}

function FanGlyph({ className = '', style }) {
  return (
    <div className={`fan-glyph ${className}`} style={style}>
      <img className="fan-rotor" src={asset('fan-blade.svg')} alt="" aria-hidden="true" />
    </div>
  );
}

function Flame() {
  return (
    <svg className="flame" viewBox="0 0 270 100" role="img" aria-label="blue burner flame">
      <defs>
        <filter id="blur-flame">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <path
        d="M1 56 C45 38 74 62 111 34 C146 8 165 33 193 27 C231 18 247 42 269 51 C225 65 196 78 159 62 C119 46 90 84 54 71 C30 62 14 68 1 56Z"
        fill="#067ed8"
        filter="url(#blur-flame)"
      />
      <path
        d="M14 64 C52 56 76 70 113 49 C144 32 169 42 194 39 C164 61 138 72 106 65 C73 58 51 78 14 64Z"
        fill="#f8ffff"
      />
      <path
        d="M68 35 C91 23 126 30 158 20 C144 35 123 47 94 47 C81 47 73 44 68 35Z"
        fill="#0059b9"
        opacity=".85"
      />
    </svg>
  );
}

function Furnace() {
  const holes = [];
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 10; col += 1) {
      holes.push(<span key={`${row}-${col}`} style={{ left: 115 + col * 39, top: 60 + row * 22 }} />);
    }
  }

  return (
    <div className="furnace">
      <div className="furnace-top">
        {holes}
        <div className="stack stack-a" />
        <div className="stack stack-b" />
        <div className="stack stack-c" />
        <div className="electrodes">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="tube tube-1" />
      <div className="tube tube-2" />
      <div className="tube tube-3" />
      <div className="combustion">
        <Flame />
      </div>
    </div>
  );
}

function ValveCluster({ style }) {
  return (
    <div className="valve-cluster" style={style}>
      <Symbol name="horizontal-valve-hp.svg" />
      <Symbol name="horizontal-valve-hp.svg" />
      <Symbol name="horizontal-valve-hp.svg" />
      <Symbol name="horizontal-valve-hp.svg" />
    </div>
  );
}

function App() {
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const fitScreen = () => {
      const nextScale = Math.min(1, (window.innerWidth - 18) / 1240, (window.innerHeight - 60) / 930);
      setScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    fitScreen();
    window.addEventListener('resize', fitScreen);
    return () => window.removeEventListener('resize', fitScreen);
  }, []);

  return (
    <main className="page" style={{ '--hmi-scale': scale, height: 930 * scale + 68 }}>
      <section className="hmi-screen" aria-label="Industrial burner SCADA home screen recreation">
        <Button style={{ left: 16, top: 17 }}>Configure</Button>
        <Button style={{ left: 160, top: 17 }}>Faults</Button>

        <div className="outside">
          <span className="info-dot">i</span>
          <BlueText>Outside: 25 &deg;C</BlueText>
        </div>

        <InfoPanel
          title="IBS"
          style={{ left: 1065, top: 20, width: 144, height: 100 }}
          rows={[
            { label: 'Id:', value: '1' },
            { label: 'On', value: '' }
          ]}
        />
        <InfoPanel
          title="EGA"
          style={{ left: 1065, top: 230, width: 150, height: 170 }}
          rows={[
            { label: 'O2', value: '2.5%' },
            { label: 'CO2', value: '10.4%' },
            { label: 'CO', value: '4ppm' },
            { label: 'Temp', value: '25°C' },
            { label: 'Elf', value: '0%' }
          ]}
        />

        <AirDuct className="supply-duct" style={{ left: 246, top: 198, width: 622, height: 36 }} />
        <AirDuct className="left-return-duct" style={{ left: 61, top: 531, width: 370, height: 64 }} />
        <AirDuct className="stack-duct" style={{ left: 914, top: 247, width: 150, height: 250 }} />

        <Pipe x={250} y={196} w={607} />
        <Pipe x={274} y={230} w={586} />
        <Pipe x={250} y={196} w={40} vertical />
        <Pipe x={274} y={230} w={305} vertical />
        <Pipe x={206} y={530} w={225} />
        <Pipe x={59} y={530} w={149} />
        <Pipe x={908} y={135} w={109} vertical />
        <Pipe x={908} y={242} w={171} />
        <Pipe x={908} y={250} w={158} vertical />
        <Pipe x={858} y={343} w={205} />
        <Pipe x={858} y={477} w={80} />
        <Pipe x={912} y={477} w={238} vertical />
        <Pipe x={842} y={641} w={325} />
        <Pipe x={841} y={477} w={164} vertical />
        <Pipe x={478} y={808} w={302} color="#eff967" />
        <Pipe x={477} y={550} w={263} vertical color="#eff967" />
        <Pipe x={453} y={550} w={306} vertical color="#d51916" className="hot-pipe" />
        <Pipe x={101} y={914} w={355} color="#d51916" className="hot-pipe" />
        <Pipe x={477} y={914} w={481} color="#eff967" />
        <PipeTick style={{ left: 640, top: 810 }} />
        <PipeTick style={{ left: 735, top: 810 }} />
        <PipeTick style={{ left: 549, top: 916 }} />
        <PipeTick style={{ left: 646, top: 916 }} />
        <PipeTick style={{ left: 827, top: 916 }} />
        <PipeTick style={{ left: 919, top: 916 }} />

        <FanGlyph style={{ left: 863, top: 65, width: 58, height: 58 }} />
        <FanGlyph style={{ left: 237, top: 240, width: 43, height: 43 }} />
        <FanGlyph className="large-fan" style={{ left: 65, top: 548, width: 118, height: 118 }} />

        <VsdBox style={{ left: 780, top: 68 }} />
        <VsdBox style={{ left: 154, top: 232 }} />
        <BlueText style={{ left: 161, top: 215 }}>5.9Hz</BlueText>
        <VsdBox style={{ left: 176, top: 620 }} />
        <BlueText style={{ left: 175, top: 690 }}>5.8mA</BlueText>
        <BlueText style={{ left: 158, top: 595 }}>28&deg;</BlueText>
        <VsdBox style={{ left: 1116, top: 568 }} />
        <BlueText style={{ left: 1116, top: 640 }}>5.0mA</BlueText>
        <BlueText style={{ left: 187, top: 394 }}>28&deg;</BlueText>

        <div className="damper" style={{ left: 186, top: 424 }} />
        <div className="damper" style={{ left: 928, top: 133 }} />
        <BlueText style={{ left: 943, top: 111 }}>16&deg;</BlueText>
        <BlueText style={{ left: 925, top: 178 }}>1.0 &quot; WG</BlueText>

        <Furnace />

        <Sensor label="L" style={{ left: 586, top: 306 }} />
        <Sensor label="P" style={{ left: 643, top: 305 }} />
        <BlueText style={{ left: 670, top: 310 }}>3.1 bar</BlueText>
        <BlueText style={{ left: 745, top: 285 }}>63301 kg/hr</BlueText>
        <Sensor label="P" style={{ left: 321, top: 611 }} />
        <BlueText style={{ left: 285, top: 642 }}>4.0 &quot; WG</BlueText>
        <Sensor label="T" style={{ left: 933, top: 574 }} />
        <BlueText style={{ left: 921, top: 640 }}>80 &deg;C</BlueText>
        <BlueText style={{ left: 944, top: 704 }}>0&deg;</BlueText>

        <Symbol name="vertical-valve-hp.svg" style={{ left: 910, top: 416, width: 44, height: 44 }} />
        <Symbol name="vertical-inline-flow-meter.svg" style={{ left: 955, top: 378, width: 33, height: 95 }} />
        <BlueText style={{ left: 986, top: 437 }}>2300 ppm</BlueText>
        <div className="damper" style={{ left: 979, top: 486 }} />
        <BlueText style={{ left: 999, top: 548 }}>36&deg;</BlueText>
        <div className="sensor-box" style={{ left: 982, top: 486 }} />

        <ScaleBox style={{ left: 1030, top: 575 }} />
        <Symbol name="vertical-valve-hp.svg" style={{ left: 946, top: 665, width: 33, height: 33 }} />
        <Symbol name="horizontal-valve-hp.svg" style={{ left: 515, top: 790, width: 40, height: 40 }} />
        <Symbol name="horizontal-valve-hp.svg" style={{ left: 572, top: 790, width: 40, height: 40 }} />
        <Symbol name="horizontal-valve-hp.svg" style={{ left: 763, top: 790, width: 40, height: 40 }} />
        <ValveCluster style={{ left: 625, top: 895 }} />
        <Sensor label="P" style={{ left: 696, top: 895 }} />
        <BlueText style={{ left: 636, top: 848 }}>20.2 &quot; WG</BlueText>
        <Symbol name="vertical-valve-hp.svg" style={{ left: 765, top: 852, width: 39, height: 39 }} />

        <div className="burner-gun" />
        <div className="pilot">
          <span />
        </div>
        <BlueText style={{ left: 414, top: 528 }}>On</BlueText>
        <div className="fuel-train">
          <div />
          <div />
          <div />
        </div>

        <div className="status">
          <p>
            Firing Rate <b>55%</b>
          </p>
          <p>Low Flame Hold</p>
          <p>Modulating - Firing</p>
        </div>

        <Symbol name="vertical-valve-hp.svg" style={{ left: 367, top: 250, width: 34, height: 34 }} />
        <Symbol name="vertical-valve-hp.svg" style={{ left: 367, top: 285, width: 34, height: 34 }} />
        <Symbol name="vertical-valve-hp.svg" style={{ left: 367, top: 320, width: 34, height: 34 }} />
        <Pipe x={371} y={250} w={288} vertical color="#7d7df6" />
        <Marker style={{ left: 384, top: 254 }} />
        <Marker style={{ left: 384, top: 288 }} />
        <Marker style={{ left: 384, top: 322 }} />
        <Marker style={{ left: 436, top: 774 }} />
        <Marker style={{ left: 436, top: 802 }} />
        <Marker style={{ left: 535, top: 797 }} />
        <Marker style={{ left: 584, top: 797 }} />
        <Marker style={{ left: 773, top: 797 }} />
        <Marker style={{ left: 649, top: 898 }} />
        <Marker style={{ left: 837, top: 898 }} />
        <Marker style={{ left: 917, top: 898 }} />
        <div className="sensor-box" style={{ left: 389, top: 308 }} />
        <BlueText style={{ left: 390, top: 831 }}>28&deg;</BlueText>
        <div className="sensor-box" style={{ left: 395, top: 846 }} />

        <div className="caption">Figure 3.1.i Home Screen</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
