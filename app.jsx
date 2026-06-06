/* app.jsx — Tweaks panel + live application to the document.
   The document itself is static HTML; this only renders the panel
   and applies tweak values to :root CSS variables / data attributes. */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "coverStyle": "b",
  "headingFont": "Playfair Display",
  "paperTone": "Cream",
  "accent": "Teal"
}/*EDITMODE-END*/;

const FONT_STACK = {
  "Playfair Display": '"Playfair Display", Georgia, serif',
  "Cormorant": '"Cormorant Garamond", Georgia, serif',
  "Bodoni Moda": '"Bodoni Moda", Georgia, serif'
};
const PAPER = {
  "Cream":  { p: "#FEFCF8", p2: "#F2EFEA", bg: "#FFFFFF" },
  "Warm":   { p: "#F0E6D2", p2: "#E9DCC2", bg: "#D2C8B4" },
  "Light":  { p: "#F8F4EA", p2: "#F1ECDD", bg: "#DED8CB" }
};
const ACCENT = {
  "Teal":  { t: "#2C7268", td: "#1F5C53" },
  "Brown": { t: "#8A6A45", td: "#6E5230" }
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.setAttribute("data-cover", t.coverStyle);
    r.style.setProperty("--font-display", FONT_STACK[t.headingFont] || FONT_STACK["Playfair Display"]);
    const pp = PAPER[t.paperTone] || PAPER.Cream;
    r.style.setProperty("--paper", pp.p);
    r.style.setProperty("--paper-2", pp.p2);
    r.style.setProperty("--bg", pp.bg);
    const ac = ACCENT[t.accent] || ACCENT.Teal;
    r.style.setProperty("--teal", ac.t);
    r.style.setProperty("--teal-deep", ac.td);
  }, [t.coverStyle, t.headingFont, t.paperTone, t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Cover" />
      <TweakRadio label="Cover style" value={t.coverStyle}
        options={["a", "b", "c"]}
        onChange={(v) => setTweak("coverStyle", v)} />
      <div style={{ fontSize: 11, opacity: .6, margin: "2px 2px 0", lineHeight: 1.4 }}>
        a · centered &nbsp; b · editorial split &nbsp; c · quiet
      </div>

      <TweakSection label="Typography" />
      <TweakSelect label="Heading font" value={t.headingFont}
        options={["Playfair Display", "Cormorant", "Bodoni Moda"]}
        onChange={(v) => setTweak("headingFont", v)} />

      <TweakSection label="Paper & accent" />
      <TweakRadio label="Paper tone" value={t.paperTone}
        options={["Cream", "Warm", "Light"]}
        onChange={(v) => setTweak("paperTone", v)} />
      <TweakRadio label="Accent" value={t.accent}
        options={["Teal", "Brown"]}
        onChange={(v) => setTweak("accent", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
