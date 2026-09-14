# AI Product Catalog Agent — Design Direction

## Three possible directions

### Theme Name: Quiet Luxury Operations
Very light, tactile ivory surfaces with ink-black typography and oxblood signals. The tone is premium, composed, and editorial while still feeling like a serious internal tool.
**Probability:** 0.07

### Theme Name: Studio Blueprint
A precise, paper-and-grid workspace with cobalt annotations, technical labels, and visible system logic. The tone is transparent, methodical, and product-minded.
**Probability:** 0.03

### Theme Name: Gallery Night Shift
A charcoal workbench with warm champagne highlights, restrained glow, and jewelry-catalog imagery. The tone is intimate, cinematic, and high-touch.
**Probability:** 0.09

## Chosen approach: Quiet Luxury Operations

### Design Movement
Contemporary quiet luxury editorial design translated into an operations-console interface.

### Core Principles
1. Make the workflow feel authored: every state, label, and transition should explain what the agent is doing.
2. Use contrast sparingly: oxblood is reserved for active actions, changes, warnings, and proof points.
3. Prefer asymmetric workspaces over generic centered cards so the before/after story reads immediately.
4. Pair tactile surfaces and fine rules with crisp system typography to blend premium craft and operational trust.

### Color Philosophy
Warm ivory is the canvas because the product is about elevating raw catalog data into something publishable. Ink-black provides editorial authority. A restrained oxblood acts as the brand-owned signal for mutations and approvals; pale blush and sage are used only for state feedback.

### Layout Paradigm
A persistent left rail anchors the product’s mental model, while the main workspace uses a wide split composition: conversational instruction input on the left, structured result on the right. The rerun state expands into a comparison strip rather than navigating away.

### Signature Elements
1. A small diamond mark made from four offset squares, echoing a jeweler’s loupe or cut stone.
2. Hairline dividers and micro-labels that make the UI feel like a working proof sheet.
3. “Delta” chips that call out changed language, rather than hiding the transformation.

### Interaction Philosophy
Actions are explicit and reversible. The user should understand whether they are editing instructions, generating a draft, validating data, or approving a proposed change. The same SKU stays visible through the entire loop.

### Animation
Use quick 160–220ms ease-out transitions for hover, focus, and state changes. When rerunning, let the output panel fade and translate upward 6px, then reveal the changed title, description, and delta chips in a short 45ms stagger. Respect reduced motion preferences.

### Typography System
Use Fraunces for display headlines and key product names, with IBM Plex Mono for micro-labels, metadata, and audit events, and Source Sans 3 for body copy and controls. Headlines are compact and editorial; metadata is uppercase, tracked, and deliberately small.

### Brand Essence
An AI catalog operator for teams who need premium listings without losing control of the source data. Personality: composed, exacting, transparent.

### Brand Voice
Headlines sound decisive and specific. CTAs sound like actions in a trusted workflow, never vague promises.
- “One SKU. Two directions. Zero guesswork.”
- “Rerun with the new house style.”

### Wordmark & Logo
Use the name “ATELIER / OPS” as a spaced editorial wordmark. The mark is a four-diamond cut symbol that sits beside the wordmark and can stand alone in the rail.

### Signature Brand Color
Oxblood `#762D35` — a muted, ownable red-brown that reads like velvet, lacquer, and a decisive revision rather than generic software purple.

## P0 scope captured from specification

The demo must support a natural-language request for a SKU, retrieve structured sample data, generate a high-quality listing, expose editable agent instructions, allow the user to change “Elegant and professional tone” into “Luxury editorial style suitable for a premium jewelry brand,” rerun the same SKU, and show visibly different output. It should also include validation, a missing-data warning for test mode, approval actions, and an audit trail. P1 and P2 integrations are represented as clearly labeled follow-on surfaces, not production integrations.
