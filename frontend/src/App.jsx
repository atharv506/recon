import { useMemo, useState } from "react";

import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { componentCategories, assetPath } from "./data/componentData";

import {
  generateComposite,
  refineComposite,
} from "./services/generationApi";

import { demoCandidates } from "./services/candidatesApi";

import {
  getCase,
  getCases,
  saveCase,
} from "./services/casesApi";


const sampleDescription =
  "A man around 30 years old with a long face, thick eyebrows, deep-set brown eyes, a broad slightly crooked nose, short black hair and a short beard.";


function Mark() {
  return (
    <div className="brand-mark">
      <span>R</span>
      <i />
    </div>
  );
}


function StatusDot({ label = "ONLINE", tone = "green" }) {
  return (
    <span className={`status status-${tone}`}>
      <b />
      {label}
    </span>
  );
}


function Shell() {
  const navItems = [
    ["Dashboard", "/dashboard", "01"],
    ["Cases", "/cases", "02"],
    ["New investigation", "/cases/new", "+"],
    ["Reconstructions", "/cases/REC-2026-081/reconstruct", "03"],
    ["Candidates", "/cases/REC-2026-081/candidates", "04"],
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <Link to="/" className="brand">
          <Mark />

          <span>
            <strong>RECON</strong>
            <small>FORENSIC RECONSTRUCTION</small>
          </span>
        </Link>

        <div className="sidebar-rule" />

        <p className="eyebrow">OPERATIONS</p>

        <nav>
          {navItems.map(([label, href, number]) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `nav-item ${isActive ? "active" : ""}`
              }
            >
              <span className="nav-number">{number}</span>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <p className="eyebrow">SYSTEM STATUS</p>

          <div className="system-line">
            <StatusDot label="Django API" />
            <span>REAL</span>
          </div>

          <div className="system-line">
            <StatusDot label="Gemini" />
            <span>REAL</span>
          </div>

          <div className="system-line">
            <StatusDot label="Pollinations" />
            <span>REAL</span>
          </div>

          <div className="system-line muted">
            <StatusDot label="Candidate index" tone="amber" />
            <span>PENDING</span>
          </div>
        </div>
      </aside>

      <div className="main-shell">
        <header className="topbar">
          <div className="mobile-brand">
            <Mark />
            <b>RECON</b>
          </div>

          <div className="crumb">
            CASE / <strong>REC-2026-081</strong>{" "}
            <span>/</span> NORTHBRIDGE STATEMENT
          </div>

          <div className="top-actions">
            <StatusDot label="ALL SYSTEMS NOMINAL" />

            <button
              className="icon-button"
              title="Notifications"
            >
              ◌
            </button>

            <div className="avatar">AM</div>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  );
}


function Panel({
  title,
  kicker,
  action,
  children,
  className = "",
}) {
  return (
    <section className={`panel ${className}`}>
      <div className="panel-head">
        <div>
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
        </div>

        {action}
      </div>

      {children}
    </section>
  );
}


function Page({
  title,
  kicker,
  intro,
  children,
}) {
  return (
    <main className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow orange">{kicker}</p>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>

        <div className="page-date">
          07 OCT 2026
          <br />
          <span>LOCAL / 09:42</span>
        </div>
      </div>

      {children}
    </main>
  );
}


function Stat({ label, value, detail }) {
  return (
    <div className="stat">
      <p className="eyebrow">{label}</p>
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}


function CaseRow({ item }) {
  return (
    <Link
      to={`/cases/${item.id}`}
      className="case-row"
    >
      <span className="case-id">{item.id}</span>

      <span className="case-main">
        <strong>{item.name}</strong>
        <small>
          {item.location} · {item.officer}
        </small>
      </span>

      <span
        className={`badge ${
          item.status === "ACTIVE"
            ? "badge-orange"
            : ""
        }`}
      >
        {item.status}
      </span>

      <span className="case-updated">
        {item.updated} <b>→</b>
      </span>
    </Link>
  );
}


function Home() {
  return (
    <div className="landing">
      <div className="landing-grid">
        <div>
          <Link
            to="/dashboard"
            className="brand landing-brand"
          >
            <Mark />

            <span>
              <strong>RECON</strong>
              <small>
                FORENSIC RECONSTRUCTION PLATFORM
              </small>
            </span>
          </Link>

          <p className="eyebrow orange">
            CASEWORK SYSTEM / 2026
          </p>

          <h1>
            From witness
            <br />
            <em>memory</em> to
            <br />
            evidence.
          </h1>

          <p className="landing-copy">
            A controlled workspace for assembling facial
            composites, reviewing evidence, and preserving
            every decision behind a reconstruction.
          </p>

          <Link
            to="/dashboard"
            className="button button-dark"
          >
            Enter workspace <span>→</span>
          </Link>
        </div>

        <div className="landing-console">
          <div className="console-head">
            <span>RECON / SYSTEM BRIEF</span>
            <StatusDot label="READY" />
          </div>

          <div className="face-grid">
            <div className="scan-lines" />

            <div className="face-placeholder">
              <span>R</span>
            </div>

            <div className="crosshair crosshair-a" />
            <div className="crosshair crosshair-b" />
          </div>

          <div className="console-meta">
            <span>01 / CONTROLLED INPUT</span>
            <span>02 / STRUCTURED OUTPUT</span>
            <span>03 / REVIEWABLE RECORD</span>
          </div>
        </div>
      </div>

      <div className="landing-footer">
        <span>AI-ASSISTED FACIAL COMPOSITE GENERATION</span>
        <span>DJANGO · GEMINI · POLLINATIONS</span>
      </div>
    </div>
  );
}


function Dashboard() {
  const cases = getCases();

  return (
    <Page
      title="Dashboard"
      kicker="OPERATIONS / OVERVIEW"
      intro="A live view of active investigations and reconstruction activity."
    >
      <div className="stats-grid">
        <Stat
          label="Active cases"
          value="02"
          detail="1 requires review"
        />

        <Stat
          label="Reconstructions"
          value="07"
          detail="This reporting period"
        />

        <Stat
          label="System uptime"
          value="99.8%"
          detail="Django API / Gemini"
        />

        <Stat
          label="Open tasks"
          value="04"
          detail="Across all cases"
        />
      </div>

      <div className="dashboard-grid">
        <Panel
          title="Active investigations"
          kicker="CASE DIRECTORY"
          action={
            <Link
              to="/cases"
              className="text-link"
            >
              VIEW ALL →
            </Link>
          }
        >
          <div className="case-list">
            {cases.map((item) => (
              <CaseRow
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </Panel>

        <Panel
          title="Activity log"
          kicker="RECENT EVENTS"
        >
          <div className="timeline">
            <div>
              <b>09:42</b>
              <span>
                Composite generated for{" "}
                <strong>Northbridge Statement</strong>
              </span>
            </div>

            <div>
              <b>YESTERDAY</b>
              <span>
                Reference evidence attached to Harbor
                CCTV Review
              </span>
            </div>

            <div>
              <b>OCT 06</b>
              <span>
                Case <strong>REC-2026-081</strong> opened
                by A. Mercer
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </Page>
  );
}


function Cases() {
  const cases = getCases();

  return (
    <Page
      title="Cases directory"
      kicker="OPERATIONS / CASES"
      intro="Manage active investigations and review archived work."
    >
      <div className="toolbar">
        <div className="search-field">
          ⌕
          <input placeholder="Search cases by ID, name, or location" />
        </div>

        <Link
          className="button button-orange"
          to="/cases/new"
        >
          + New investigation
        </Link>
      </div>

      <Panel
        title="All investigations"
        kicker={`${cases.length} REGISTERED CASES`}
      >
        <div className="case-list">
          {cases.map((item) => (
            <CaseRow
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </Panel>
    </Page>
  );
}


function NewCase() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  function create() {
    const id = `REC-2026-${String(Date.now()).slice(-3)}`;

    saveCase({
      id,
      name: name || "Untitled investigation",
      location: location || "Location pending",
      officer: "A. Mercer",
      status: "ACTIVE",
      updated: "Just now",
      summary:
        "New investigation opened in workspace.",
    });

    navigate(`/cases/${id}/reconstruct`);
  }

  return (
    <Page
      title="New investigation"
      kicker="CASE INTAKE / CREATE"
      intro="Open a controlled record before adding witness or reference evidence."
    >
      <div className="form-layout">
        <Panel
          title="Case registration"
          kicker="REQUIRED INFORMATION"
        >
          <label>
            Investigation name

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="e.g. Northbridge witness statement"
            />
          </label>

          <label>
            Location / jurisdiction

            <input
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              placeholder="e.g. Northbridge district"
            />
          </label>

          <div className="form-actions">
            <Link
              to="/cases"
              className="button button-quiet"
            >
              Cancel
            </Link>

            <button
              onClick={create}
              className="button button-orange"
            >
              Open case →
            </button>
          </div>
        </Panel>

        <div className="notice">
          <p className="eyebrow">RECORD POLICY</p>

          <strong>Every generation is versioned.</strong>

          <p>
            Case persistence is currently local to this
            browser. Django database persistence can be
            connected without changing this intake flow.
          </p>
        </div>
      </div>
    </Page>
  );
}


function CaseDetail() {
  const { id } = useParams();
  const item = getCase(id);

  return (
    <Page
      title={item?.name || "Case detail"}
      kicker={`CASE / ${item?.id || id}`}
      intro={
        item?.summary ||
        "Review evidence, reconstructions, and candidate activity."
      }
    >
      <div className="detail-grid">
        <Panel
          title="Case metadata"
          kicker="IDENTIFICATION"
        >
          <div className="metadata">
            <span>
              CASE ID
              <strong>{item?.id || id}</strong>
            </span>

            <span>
              STATUS
              <strong className="orange">
                {item?.status || "ACTIVE"}
              </strong>
            </span>

            <span>
              LOCATION
              <strong>
                {item?.location || "Pending"}
              </strong>
            </span>

            <span>
              LEAD OFFICER
              <strong>
                {item?.officer || "A. Mercer"}
              </strong>
            </span>
          </div>
        </Panel>

        <Panel
          title="Workspace actions"
          kicker="NEXT STEP"
        >
          <div className="action-stack">
            <Link
              to={`/cases/${item?.id || id}/reconstruct`}
              className="button button-orange"
            >
              Open reconstruction workspace →
            </Link>

            <Link
              to={`/cases/${item?.id || id}/candidates`}
              className="button button-quiet"
            >
              Review candidate search
            </Link>
          </div>
        </Panel>
      </div>

      <Panel
        title="Case timeline"
        kicker="HISTORY"
      >
        <div className="timeline">
          <div>
            <b>NOW</b>
            <span>
              Case record ready for witness input and
              evidence review.
            </span>
          </div>

          <div>
            <b>OPENED</b>
            <span>
              Investigation record created by{" "}
              {item?.officer || "A. Mercer"}.
            </span>
          </div>
        </div>
      </Panel>
    </Page>
  );
}


function Evidence({
  title,
  icon,
  children,
}) {
  return (
    <section className="evidence-card">
      <div className="evidence-head">
        <span>{icon}</span>
        <p>{title}</p>
        <small>UI READY / BACKEND PENDING</small>
      </div>

      {children}
    </section>
  );
}


function Attributes({ attributes }) {
  const rows = useMemo(
    () =>
      attributes
        ? [
            ["AGE", attributes.age],
            ["GENDER", attributes.gender],
            ["FACE SHAPE", attributes.face_shape],
            [
              "EYES",
              [
                attributes.eye_characteristics,
                attributes.eye_color,
              ]
                .filter(Boolean)
                .join(" / "),
            ],
            [
              "EYEBROWS",
              attributes.eyebrow_characteristics,
            ],
            [
              "NOSE",
              attributes.nose_characteristics,
            ],
            [
              "HAIR",
              [
                attributes.hair_color,
                attributes.hair_style,
              ]
                .filter(Boolean)
                .join(" / "),
            ],
            [
              "FACIAL HAIR",
              attributes.facial_hair,
            ],
          ]
        : [],
    [attributes]
  );

  return (
    <div className="attribute-list">
      {rows.length ? (
        rows.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value || "—"}</strong>
          </div>
        ))
      ) : (
        <div className="attribute-empty">
          Attributes from the real Django response will
          appear here.
        </div>
      )}
    </div>
  );
}


function Reconstruction() {
  const { id } = useParams();

  const [description, setDescription] =
    useState(sampleDescription);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [category, setCategory] =
    useState("head");

  const [selected, setSelected] =
    useState({});

  const [versions, setVersions] =
    useState([]);

  const [refinement, setRefinement] =
    useState("");

  const [compare, setCompare] =
    useState(false);

  const activeCategory =
    componentCategories.find(
      (item) => item.key === category
    );

  const caseData = getCase(id);


async function generate() {
  if (!description.trim()) {
    setError("Witness description is required.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await generateComposite(description.trim());

    const versionedData = {
      ...data,
      number: data.version ?? 1,
    };

    setResult(versionedData);
    setVersions([versionedData]);
    setCompare(false);
    setRefinement("");
  } catch (err) {
    setError(err.message || "Unable to generate composite.");
  } finally {
    setLoading(false);
  }
}



async function refine() {
  if (!result) {
    setError("Generate a composite before refining it.");
    return;
  }

  if (!result.case_id) {
    setError("Case ID is missing. Generate a new composite first.");
    return;
  }

  if (!refinement.trim()) {
    setError("Describe what you want to change.");
    return;
  }

  setLoading(true);
  setError("");

  try {
    const data = await refineComposite(
      result.case_id,
      result.attributes,
      refinement.trim()
    );

    const versionedData = {
      ...data,
      number: data.version,
    };

    setResult(versionedData);

    setVersions((items) => [
      versionedData,
      ...items.filter(
        (item) => item.number !== versionedData.number
      ),
    ]);

    setRefinement("");
    setCompare(false);
  } catch (err) {
    setError(err.message || "Unable to refine composite.");
  } finally {
    setLoading(false);
  } 
}


  return (
    <main className="workspace">
      <div className="workspace-head">
        <div>
          <p className="eyebrow orange">CORE RECONSTRUCTION WORKSPACE</p>
          <h1>{caseData?.name || "Forensic workspace"}</h1>
          <span className="case-id">{caseData?.id || id} / WITNESS-01</span>
        </div>
        <div className="workspace-actions">
          <StatusDot label="DJANGO API ONLINE" />
          <button className="button button-orange" onClick={generate} disabled={loading}>
            {loading ? "SYNTHESIZING..." : "Generate AI face →"}
          </button>
          <Link className="button button-dark" to={`/cases/${id}/candidates`}>Search candidates</Link>
        </div>
      </div>

      <div className="evidence-strip">
        <Evidence title="01 / WITNESS INPUT" icon="◫">
          <textarea value={description} onChange={(event) => setDescription(event.target.value)} maxLength={2000} placeholder="Describe the suspect in natural language." />
          <div className="field-meta"><span>{description.length} / 2,000 CHARACTERS</span><span className="pending">AUDIO TRANSCRIPTION / PENDING</span></div>
        </Evidence>
        <Evidence title="02 / REFERENCE EVIDENCE" icon="▧">
          <div className="dropzone"><strong>Drop an image or CCTV frame here</strong><span>Visual analysis endpoint not connected</span><label className="button button-quiet">Attach image<input type="file" hidden /></label></div>
        </Evidence>
      </div>

      <div className="workspace-grid">
        <Panel className="library-panel" title="Component library" kicker="MANUAL RECONSTRUCTION">
          <div className="tabs">{componentCategories.map((item) => <button className={category === item.key ? "selected" : ""} key={item.key} onClick={() => setCategory(item.key)}>{item.label}</button>)}</div>
          <div className="asset-grid">{Array.from({ length: Math.min(activeCategory?.count || 12, 12) }, (_, index) => <button className={selected[category] === index ? "asset selected" : "asset"} key={index} onClick={() => setSelected((current) => ({ ...current, [category]: index }))}><img src={assetPath(activeCategory.folder, index + 1)} alt={`${activeCategory.label} ${index + 1}`} /><span>{String(index + 1).padStart(2, "0")}</span></button>)}</div>
          <p className="library-note">Selections are local until a manual reconstruction endpoint is connected.</p>
        </Panel>

        <Panel className="canvas-panel" title="Reconstruction canvas" kicker="VERSIONED OUTPUT" action={<span className="version-chip">VERSION {String(result?.number || 0).padStart(2, "0")}</span>}>
          <div className="canvas-toolbar">
            <button className={!compare ? "active" : ""} onClick={() => setCompare(false)}>AI render</button>
            <button className={compare ? "active" : ""} onClick={() => versions.length >= 2 && setCompare(true)} disabled={versions.length < 2}>Compare</button>
            <button onClick={() => result && window.open(result.image_url, "_blank")}>↗ Open</button>
          </div>
          <div className={`canvas-stage ${compare ? "compare-mode" : ""}`}>
            {loading ? <div className="canvas-loading"><span className="spinner" /><b>GENERATING COMPOSITE</b><small>Gemini attributes → Pollinations render</small></div> : compare && versions.length >= 2 ? <div className="compare-view"><div className="compare-image"><span className="compare-label">VERSION {versions[1].number}</span><img src={versions[1].image_url} alt={`Composite version ${versions[1].number}`} /></div><div className="compare-image"><span className="compare-label current">VERSION {versions[0].number} / CURRENT</span><img src={versions[0].image_url} alt={`Composite version ${versions[0].number}`} /></div></div> : result ? <><img src={result.image_url} alt="AI generated facial composite" /><span className="render-tag">AI GENERATED COMPOSITE</span></> : <div className="canvas-empty"><div className="face-grid-mini"><span>R</span></div><b>NO COMPOSITE LOADED</b><small>Enter witness input and generate a versioned AI render.</small></div>}
          </div>
          <div className="canvas-actions"><button className="button button-orange" onClick={generate} disabled={loading}>Generate version {versions.length + 1} →</button>{result && <a className="button button-quiet" href={result.image_url} download="recon-composite.png">Download image</a>}</div>
        </Panel>

        <Panel className="attributes-panel" title="Facial attributes" kicker="STRUCTURED EXTRACTION">
          <Attributes attributes={result?.attributes} />
          <div className="refine-box"><p className="eyebrow">REFINE COMPOSITE</p><textarea value={refinement} onChange={(event) => setRefinement(event.target.value)} placeholder="What would you like to change?" disabled={loading || !result} /><button className="button button-quiet" onClick={refine} disabled={loading || !result}>{loading ? "REFINING..." : "Refine composite →"}</button></div>
        </Panel>
      </div>

      {versions.length > 0 && <Panel title="Reconstruction history" kicker={`${versions.length} VERSION${versions.length > 1 ? "S" : ""} GENERATED`}><div className="version-history">{versions.map((version) => <button key={version.number} type="button" className={`version-card ${result?.number === version.number ? "active" : ""}`} onClick={() => { setResult(version); setCompare(false); setError(""); }}><div className="version-thumb"><img src={version.image_url} alt={`Version ${version.number}`} /></div><div className="version-info"><strong>VERSION {String(version.number).padStart(2, "0")}</strong><span>{version.number === 1 ? "Initial AI composite" : "Refined composite"}</span></div></button>)}</div></Panel>}
      {error && <div className="error-banner">{error}</div>}
      {result?.prompt && <Panel title="Generation details" kicker="PROMPT TRACE"><p className="prompt-trace">{result.prompt}</p></Panel>}
    </main>
  );
}


function Candidates() {
  const { id } = useParams();

  return (
    <Page
      title="Candidate search"
      kicker={`CASE / ${id} / CANDIDATES`}
      intro="Review candidate retrieval when a connected search backend is available."
    >

      <div className="pending-banner">

        <StatusDot
          label="BACKEND INTEGRATION PENDING"
          tone="amber"
        />

        <span>
          Candidate cards below are clearly marked
          demo data. No FAISS or database search is
          being claimed.
        </span>

      </div>


      <div className="candidate-layout">

        <Panel
          title="Search configuration"
          kicker="MATCH PARAMETERS"
        >

          <label>
            Search scope

            <select defaultValue="all">
              <option value="all">
                All connected sources
              </option>

              <option value="pending">
                Pending source
              </option>
            </select>
          </label>


          <label>
            Minimum similarity

            <input
              type="range"
              defaultValue="70"
            />
          </label>


          <button
            className="button button-orange"
            onClick={() =>
              alert(
                "Candidate search backend is not connected yet."
              )
            }
          >
            Run search →
          </button>

        </Panel>


        <Panel
          title="Candidate results"
          kicker="DEMO UI / NOT VERIFIED"
        >

          <div className="candidate-list">

            {demoCandidates.map((candidate) => (
              <div
                className="candidate"
                key={candidate.id}
              >

                <div className="candidate-face">
                  {candidate.id.slice(-2)}
                </div>

                <div>

                  <strong>
                    {candidate.name}
                  </strong>

                  <span>
                    {candidate.id} ·{" "}
                    {candidate.source}
                  </span>

                  <small>
                    {candidate.status}
                  </small>

                </div>

                <b>
                  {candidate.score}%
                </b>

              </div>
            ))}

          </div>

        </Panel>

      </div>

    </Page>
  );
}


function Login() {
  return (
    <Page
      title="Secure access"
      kicker="AUTHENTICATION / UI ONLY"
      intro="Authentication is prepared for a future Django session endpoint."
    >

      <div className="form-layout">

        <Panel
          title="Officer sign-in"
          kicker="CREDENTIALS"
        >

          <label>
            Officer email

            <input
              type="email"
              placeholder="officer@department.gov"
            />
          </label>

          <label>
            Access code

            <input
              type="password"
              placeholder="Backend authentication pending"
            />
          </label>

          <button
            className="button button-orange"
            onClick={() =>
              alert(
                "Authentication backend is not connected yet."
              )
            }
          >
            Continue →
          </button>

        </Panel>


        <div className="notice">

          <p className="eyebrow">
            ACCESS POLICY
          </p>

          <strong>
            No credentials are transmitted.
          </strong>

          <p>
            This screen is a frontend shell only until
            Django authentication is connected.
          </p>

        </div>

      </div>

    </Page>
  );
}


function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route element={<Shell />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/cases"
          element={<Cases />}
        />

        <Route
          path="/cases/new"
          element={<NewCase />}
        />

        <Route
          path="/cases/:id"
          element={<CaseDetail />}
        />

        <Route
          path="/cases/:id/reconstruct"
          element={<Reconstruction />}
        />

        <Route
          path="/cases/:id/candidates"
          element={<Candidates />}
        />

      </Route>

    </Routes>
  );
}


export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}