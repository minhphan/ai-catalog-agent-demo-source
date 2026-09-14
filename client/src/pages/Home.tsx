import { useState, type ElementType, type ReactNode } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  History,
  Info,
  Layers3,
  MessageSquareText,
  Pencil,
  Play,
  Save,
  Settings2,
  ShieldCheck,
  Store,
  WandSparkles,
} from "lucide-react";

/*
 * B2B AI Operations comparison flow:
 * the source record is immutable, Version A and Version B are independently
 * instructed, both outputs are generated together, then one version is selected
 * for approval to the test store.
 */
const EAR_CUFF_IMAGE = "/manus-storage/atelier-ops-ear-cuff_6bb19b89.png";
const HERO_DETAIL_IMAGE = "/manus-storage/atelier-ops-hero-detail_c178d282.png";
const MARK_IMAGE = "/manus-storage/atelier-ops-mark_6a60e3ab.png";

const product = {
  sku: "RING-1023",
  name: "Contour Ear Cuff",
  category: "Ear Cuff",
  material: "18K White Gold",
  stone: "None",
  weight: "4.2g",
  inventory: "12 available",
};

type ToneId = "elegant" | "professional" | "luxury" | "friendly" | "wholesale";
type VersionKey = "A" | "B";

type ToneOption = {
  id: ToneId;
  label: string;
  objective: string;
  instruction: string;
};

const tones: ToneOption[] = [
  { id: "elegant", label: "Elegant & Professional", objective: "Professional / Wholesale", instruction: "Write in an elegant and professional tone for a premium jewelry wholesale audience." },
  { id: "professional", label: "Professional", objective: "Product / Operations", instruction: "Lead with clear product facts and a concise, specification-led tone." },
  { id: "luxury", label: "Luxury Editorial", objective: "Premium / Retail", instruction: "Use a luxury editorial style suitable for a premium jewelry brand." },
  { id: "friendly", label: "Friendly", objective: "Accessible / Everyday", instruction: "Use a warm, approachable tone that makes product benefits easy to understand." },
  { id: "wholesale", label: "Wholesale / B2B", objective: "Assortment / Merchandising", instruction: "Prioritize assortment value, merchandising clarity, and wholesale buyer relevance." },
];

const listings: Record<ToneId, { title: string; description: string; emphasis: string }> = {
  elegant: {
    title: "Contour Ear Cuff",
    description: "A refined 18K white gold ear cuff with a clean, sculptural profile. Designed for comfortable everyday styling, it offers a polished and understated finish without the need for piercing.",
    emphasis: "Polished product clarity",
  },
  professional: {
    title: "18K White Gold Contour Ear Cuff",
    description: "The Contour Ear Cuff is made from 18K white gold and designed to sit securely along the ear. Its sculptural profile offers a clean, versatile finish for customers who prefer a polished look without a piercing.",
    emphasis: "Specification-led clarity",
  },
  luxury: {
    title: "The Contour Ear Cuff in 18K White Gold",
    description: "A sculptural expression of refined simplicity, the Contour Ear Cuff brings an elevated presence to everyday styling. Crafted in 18K white gold, its clean silhouette offers a sophisticated statement without the need for piercing.",
    emphasis: "Tactile, curated positioning",
  },
  friendly: {
    title: "Meet the Contour Ear Cuff",
    description: "Add an easy finishing touch with the Contour Ear Cuff in 18K white gold. Its sculptural shape sits comfortably along the ear and gives everyday looks a polished lift—no piercing required.",
    emphasis: "Approachable everyday styling",
  },
  wholesale: {
    title: "Contour Ear Cuff | 18K White Gold",
    description: "A 4.2g 18K white gold ear cuff with a sculptural profile and no stone specification. A versatile, piercing-free style suited to curated assortment planning and everyday merchandising.",
    emphasis: "Assortment and merchandising value",
  },
};

type GeneratedVersion = { tone: ToneId; output: (typeof listings)[ToneId] };

function RailItem({ icon: Icon, label, active = false, count, onClick }: { icon: ElementType; label: string; active?: boolean; count?: string; onClick?: () => void }) {
  return <button className={`rail-item ${active ? "rail-item-active" : ""}`} onClick={onClick}><Icon size={16} /><span>{label}</span>{count && <small>{count}</small>}</button>;
}

function Status({ children, tone = "success" }: { children: ReactNode; tone?: "success" | "neutral" | "warning" | "active" }) {
  return <span className={`status status-${tone}`}><span className="status-dot" />{children}</span>;
}

function toneById(id: ToneId) {
  return tones.find((tone) => tone.id === id) ?? tones[0];
}

function App() {
  const [toneA, setToneA] = useState<ToneId>("elegant");
  const [toneB, setToneB] = useState<ToneId>("luxury");
  const [generatedA, setGeneratedA] = useState<GeneratedVersion>({ tone: "elegant", output: listings.elegant });
  const [generatedB, setGeneratedB] = useState<GeneratedVersion>({ tone: "luxury", output: listings.luxury });
  const [instructionText, setInstructionText] = useState(tones[2].instruction);
  const [isGenerating, setIsGenerating] = useState(false);
  const [comparisonGenerated, setComparisonGenerated] = useState(true);
  const [selectedVersion, setSelectedVersion] = useState<VersionKey | null>(null);
  const [approved, setApproved] = useState(false);
  const [saved, setSaved] = useState(true);
  const [testMode, setTestMode] = useState(false);
  const [toast, setToast] = useState("");

  const selectedOutput = selectedVersion === "A" ? generatedA : selectedVersion === "B" ? generatedB : null;
  const selectedTone = selectedOutput ? toneById(selectedOutput.tone) : null;
  const currentStep = approved ? 5 : selectedVersion ? 4 : comparisonGenerated ? 3 : isGenerating ? 1 : 1;

  const announce = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const generateComparison = () => {
    setIsGenerating(true);
    setSelectedVersion(null);
    setApproved(false);
    window.setTimeout(() => {
      setGeneratedA({ tone: toneA, output: listings[toneA] });
      setGeneratedB({ tone: toneB, output: listings[toneB] });
      setComparisonGenerated(true);
      setIsGenerating(false);
      announce("Both directions generated from the same source data.");
    }, 650);
  };

  const updateToneA = (value: string) => {
    setToneA(value as ToneId);
    setComparisonGenerated(false);
    setSelectedVersion(null);
    setApproved(false);
  };

  const updateToneB = (value: string) => {
    setToneB(value as ToneId);
    setComparisonGenerated(false);
    setSelectedVersion(null);
    setApproved(false);
  };

  const saveInstructions = () => {
    setSaved(true);
    announce("House instructions saved as version 1.1.");
  };

  const chooseVersion = (version: VersionKey) => {
    setSelectedVersion(version);
    setApproved(false);
    announce(`Version ${version} selected for review.`);
  };

  const approveSelected = () => {
    if (!selectedVersion) {
      announce("Select Version A or Version B before approving.");
      return;
    }
    setApproved(true);
    announce(`Version ${selectedVersion} approved for the test store.`);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-lockup"><div className="brand-mark-shell"><img src={MARK_IMAGE} alt="Atelier Ops mark" className="brand-mark" onError={(event) => { event.currentTarget.style.display = "none"; }} /></div><div><div className="wordmark">ATELIER / OPS</div><div className="brand-caption">AI operations platform</div></div></div>
        <div className="sidebar-rule" /><div className="rail-label">WORKSPACE</div>
        <nav className="rail-nav"><RailItem icon={MessageSquareText} label="Agent" active /><RailItem icon={Layers3} label="Catalog" count="10" onClick={() => announce("Catalog view is represented in this demo.")} /><RailItem icon={ClipboardCheck} label="Review queue" count="03" onClick={() => announce("Review queue is represented in this demo.")} /><RailItem icon={History} label="Activity log" onClick={() => announce("Activity log is represented below.")} /></nav>
        <div className="sidebar-bottom"><div className="rail-label">SYSTEM</div><RailItem icon={Settings2} label="Instructions" onClick={() => document.getElementById("instructions")?.scrollIntoView({ behavior: "smooth" })} /><div className="system-card"><div className="system-card-top"><span className="live-dot" /> Agent online</div><div className="system-card-meta">Controlled workspace · v1.1</div></div><div className="user-chip"><span>AM</span><div><strong>Alex Morgan</strong><small>Catalog manager</small></div><ChevronDown size={14} /></div></div>
      </aside>

      <main className="main-canvas">
        <header className="topbar"><div className="breadcrumb"><span>Workspace</span><span className="slash">/</span><strong>Product Catalog Agent</strong></div><div className="topbar-actions"><span className="saved-indicator"><Check size={13} /> {saved ? "Instructions saved" : "Unsaved changes"}</span><button className="icon-button" aria-label="Settings"><Settings2 size={16} /></button><button className="avatar">AM</button></div></header>
        <div className="content-wrap">
          <section className="page-intro"><div><p className="eyebrow"><span className="eyebrow-line" /> AI OPERATIONS / PRODUCT CATALOG</p><h1>Product Catalog Agent</h1><p className="intro-copy">Teach the agent how your business should communicate — then compare and control every change.</p></div><div className="intro-aside"><span className="intro-kicker">Environment</span><strong>TEST STORE</strong><span>Last updated · Today, 09:42</span></div></section>
          <section className="request-bar"><div className="request-icon"><WandSparkles size={17} /></div><div className="request-copy"><span className="micro-label">NATURAL-LANGUAGE REQUEST</span><strong>Create a listing for {product.sku}</strong></div><div className="request-meta"><Status>READY FOR COMPARISON</Status><span>0.8 sec</span></div></section>
          <section className="workflow-bar" aria-label="Approval workflow">{["Generate", "Validate", "Compare", "Select", "Publish"].map((step, index) => <div key={step} className={`workflow-step ${index + 1 <= currentStep ? "is-complete" : ""} ${index + 1 === currentStep ? "is-current" : ""}`}><span>{index + 1 < currentStep ? <Check size={12} /> : index + 1}</span><strong>{step}</strong>{index < 4 && <ArrowRight size={13} />}</div>)}</section>

          <div className="workspace-grid">
            <section className="left-column">
              <div className="panel source-panel"><div className="section-heading"><div><span className="micro-label">01 / PRODUCT DATA</span><h2>Source record</h2></div><Status tone="neutral">IMMUTABLE / LOCKED</Status></div><div className="record-summary"><div className="product-thumb"><img src={EAR_CUFF_IMAGE} alt="Contour ear cuff" /></div><div><strong>{product.name}</strong><span>{product.sku} · {product.category}</span></div></div><div className="data-grid"><div><span>SKU</span><strong>{product.sku}</strong></div><div><span>Category</span><strong>{product.category}</strong></div><div><span>Material</span><strong>{product.material}</strong></div><div><span>Stone</span><strong>{product.stone}</strong></div><div><span>Weight</span><strong>{product.weight}</strong></div><div><span>Inventory</span><strong>{product.inventory}</strong></div></div><div className="facts-note"><ShieldCheck size={15} /><span>Same source facts are used for both versions. The agent can change wording, not specifications.</span></div>{testMode && <div className="test-warning"><AlertTriangle size={15} /><span><strong>Review required:</strong> Stone type is missing from source data. Agent did not generate a stone specification.</span></div>}<button className={`test-toggle ${testMode ? "is-on" : ""}`} onClick={() => setTestMode(!testMode)}><span className="toggle-track"><span /></span> Test mode · check missing data</button></div>
              <div className="panel instructions-panel" id="instructions"><div className="section-heading"><div><span className="micro-label">02 / AGENT BEHAVIOR</span><h2>House instructions</h2></div><button className="text-button" onClick={() => announce("Instruction editor is ready for business input.")}><Pencil size={13} /> Edit</button></div><div className="instruction-meta"><span>Version 1.0</span><span>Last updated: Today</span><button onClick={() => announce("Instruction documentation preview opened.")}>View instructions</button></div><label className="field-label" htmlFor="rules">BUSINESS RULES + BRAND VOICE</label><textarea id="rules" value={instructionText} onChange={(event) => { setInstructionText(event.target.value); setSaved(false); }} rows={3} className="instruction-input" /><div className="why-matters"><Info size={15} /><div><strong>Why compare?</strong><span>Different customer segments and campaigns may require different positioning.</span></div></div><div className="segment-map"><span>Wholesale customer <b>→</b> Professional / Product-focused</span><span>Luxury retail customer <b>→</b> Editorial / Aspirational</span></div><div className="rule-list"><div><Check size={13} /><span>Keep claims grounded in source data</span></div><div><Check size={13} /><span>Never invent missing specifications</span></div><div><Check size={13} /><span>Avoid unsupported luxury claims</span></div><div><Check size={13} /><span>Keep descriptions between 80–120 words</span></div></div><div className="instruction-actions"><button className="secondary-button" onClick={saveInstructions}><Save size={14} /> Save instructions</button><span>{saved ? "Saved as version 1.1" : "Unsaved changes"}</span></div></div>
            </section>

            <section className="right-column">
              <div className="comparison-shell"><div className="comparison-header"><div><span className="micro-label">03 / BUSINESS COMPARISON</span><h2>Same product. Different business direction.</h2><p>Compare how the same product is positioned under different business instructions.</p></div><div className="comparison-time"><Clock3 size={14} /> {comparisonGenerated ? "Generated just now" : "Ready to generate"}</div></div><div className="selector-grid"><div className="direction-selector"><div className="selector-label"><span>VERSION A</span><small>Direction one</small></div><label htmlFor="tone-a">BUSINESS TONE</label><div className="select-wrap"><select id="tone-a" value={toneA} onChange={(event) => updateToneA(event.target.value)}>{tones.map((tone) => <option key={tone.id} value={tone.id}>{tone.label}</option>)}</select><ChevronDown size={15} /></div><span className="objective-line">Objective · {toneById(toneA).objective}</span></div><div className="direction-connector"><ArrowRight size={17} /><span>same source</span></div><div className="direction-selector"><div className="selector-label"><span>VERSION B</span><small>Direction two</small></div><label htmlFor="tone-b">BUSINESS TONE</label><div className="select-wrap"><select id="tone-b" value={toneB} onChange={(event) => updateToneB(event.target.value)}>{tones.map((tone) => <option key={tone.id} value={tone.id}>{tone.label}</option>)}</select><ChevronDown size={15} /></div><span className="objective-line">Objective · {toneById(toneB).objective}</span></div></div><button className="generate-comparison" onClick={generateComparison} disabled={isGenerating}><Play size={15} fill="currentColor" /> {isGenerating ? "Generating A + B…" : comparisonGenerated ? "Regenerate Comparison" : "Generate Comparison"}<span>1 click · 2 directions</span></button></div>

              <div className="comparison-result"><div className="result-heading"><div><span className="micro-label">04 / COMPARISON RESULT</span><h2>Same source data. Different communication strategy.</h2></div>{comparisonGenerated && <Status tone="active">A / B READY</Status>}</div><div className="result-source"><span>Same source data</span><strong>{product.sku} · {product.material} · {product.category}</strong><small>Both outputs are generated from the locked product record.</small></div><div className={`version-grid ${isGenerating ? "is-generating" : ""}`}><VersionCard version="A" generated={generatedA} selected={selectedVersion === "A"} onSelect={() => chooseVersion("A")} /><VersionCard version="B" generated={generatedB} selected={selectedVersion === "B"} onSelect={() => chooseVersion("B")} /></div><div className="fact-consistency"><div className="fact-consistency-heading"><ShieldCheck size={15} /><strong>FACT CONSISTENCY</strong><span>Same source facts used in both versions.</span></div><div className="fact-list"><span><Check size={12} /> SKU — {product.sku}</span><span><Check size={12} /> Material — {product.material}</span><span><Check size={12} /> Category — {product.category}</span><span><Check size={12} /> Weight — {product.weight}</span><span><Check size={12} /> Stone — {product.stone}</span></div></div></div>

              <div className="selection-card"><div className="selection-status"><div className={`approval-icon ${approved ? "approved" : ""}`}>{approved ? <Check size={16} /> : <ClipboardCheck size={16} />}</div><div><span className="micro-label">05 / BUSINESS DECISION</span><strong>{approved ? `Ready for Test Store · Version ${selectedVersion}` : selectedVersion ? `Selected: Version ${selectedVersion} — ${selectedTone?.label}` : "Select a version to use"}</strong><span>{approved ? "Approved output is staged for the test destination. No production system is modified." : "Choose the direction that fits the customer segment or campaign objective."}</span></div></div><div className="selection-actions"><button className={`version-select ${selectedVersion === "A" ? "selected" : ""}`} onClick={() => chooseVersion("A")}>{selectedVersion === "A" && <Check size={13} />} Select A</button><button className={`version-select ${selectedVersion === "B" ? "selected" : ""}`} onClick={() => chooseVersion("B")}>{selectedVersion === "B" && <Check size={13} />} Select B</button><button className="approve-button" onClick={approveSelected}><Store size={14} /> {approved ? "Preview Test Store Update" : "Approve Selected Version"}</button></div></div>
            </section>
          </div>

          <section className="audit-section"><div className="audit-title"><span className="micro-label">ACTIVITY / AUDIT LOG</span><Status>LIVE</Status></div><div className="audit-timeline"><div className="audit-event"><span className="audit-dot done" /><span className="audit-time">09:42:18</span><span className="audit-text">{approved ? `Version ${selectedVersion} approved` : comparisonGenerated ? "Comparison generated" : "Awaiting comparison"}</span><span className="audit-detail">{product.sku}</span></div><div className="audit-event"><span className="audit-dot done" /><span className="audit-time">09:42:17</span><span className="audit-text">Fact consistency verified</span><span className="audit-detail">5 facts matched</span></div><div className="audit-event"><span className="audit-dot done" /><span className="audit-time">09:42:16</span><span className="audit-text">Instructions loaded</span><span className="audit-detail">{toneById(toneA).label} + {toneById(toneB).label}</span></div></div></section>
          <footer className="page-footer"><span>ATELIER / OPS · PRODUCT CATALOG AGENT</span><span>Prototype environment · test destination only</span></footer>
        </div>
        {toast && <div className="toast"><Check size={14} /> {toast}</div>}
      </main>
    </div>
  );
}

function VersionCard({ version, generated, selected, onSelect }: { version: VersionKey; generated: GeneratedVersion; selected: boolean; onSelect: () => void }) {
  const tone = toneById(generated.tone);
  return <article className={`version-card ${selected ? "is-selected" : ""}`}><div className="version-card-top"><div><span className="version-label">VERSION {version}</span><strong>{tone.label}</strong><small>{tone.objective}</small></div>{selected && <Status tone="active">SELECTED</Status>}</div><h3>{generated.output.title}</h3><span className="description-label">DESCRIPTION</span><p>{generated.output.description}</p><div className="version-card-footer"><span><Check size={13} /> Facts verified</span><button className={selected ? "selected-version-button" : ""} onClick={onSelect}>{selected ? "Selected" : `Select ${version}`} {selected && <Check size={12} />}</button></div></article>;
}

export default App;
