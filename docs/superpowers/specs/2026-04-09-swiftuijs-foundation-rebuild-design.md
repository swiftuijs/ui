# SwiftUI.js Foundation Rebuild Design

## Goal

Rebuild SwiftUI.js into a production-ready React component library that aligns its public API, interaction model, visual defaults, and documentation with SwiftUI and Apple's Human Interface Guidelines, while aligning its internal implementation, testing, and tooling with modern React and web best practices.

This redesign is explicitly allowed to be breaking. Existing APIs, folder layout, stories, and internal abstractions do not need to be preserved when they conflict with the target architecture.

## Product Direction

SwiftUI.js should behave like a serious React component library inspired by SwiftUI, not like a direct runtime port of SwiftUI internals.

The library should follow a dual-alignment model:

- External alignment: SwiftUI semantics, Apple-style interaction patterns, Apple-inspired defaults, and a clear mapping between SwiftUI concepts and React usage.
- Internal alignment: React component architecture, semantic HTML, accessibility, testability, composability, build tooling, and web platform constraints.

The core rule is:

- If a decision affects public API, interaction, visual defaults, or user-facing mental model, prefer SwiftUI and Apple conventions.
- If a decision affects runtime architecture, DOM structure, state management, styling mechanics, bundling, or testing, prefer React and web best practices.

## Rewrite Policy

This work is a foundation-first rewrite, not an incremental compatibility pass.

Allowed:

- Breaking API changes
- Renaming, moving, or deleting components
- Replacing existing styling architecture
- Replacing navigation internals
- Rewriting stories, tests, and docs

Not allowed:

- Preserving incorrect APIs purely for historical reasons
- Carrying unstable abstractions into the new architecture
- Allowing docs, stories, or tests to drift from implementation

## Scope

### In Scope for the foundation rebuild

- Monorepo restructuring
- Component library package redesign
- Design token and responsive system redesign
- Navigation and presentation infrastructure redesign
- Testing strategy redesign
- Storybook re-scoping as a developer workbench
- Fumadocs-based documentation site
- Component asset colocation strategy
- A new maturity model for component coverage
- Standardized component authoring patterns

### Out of Scope for the first implementation phase

- Full parity with all SwiftUI APIs in a single milestone
- Preserving current public API compatibility
- Platform-specific behavior that cannot be represented responsibly on the web
- Implementing speculative or low-value components before the core system is stable

## Target Repository Shape

The repository should become a monorepo with one library package and two first-class apps.

```text
packages/
  ui/
    src/
      components/
      primitives/
      composites/
      navigation/
      presentation/
      tokens/
      hooks/
      contexts/
      testing/
      index.ts

apps/
  docs/
  storybook/
```

### Responsibilities

- `packages/ui`
  - Source of truth for the component library
  - Ships build artifacts
  - Owns component source, tests, stories, component docs, tokens, hooks, and contexts

- `apps/docs`
  - Public-facing documentation site built with Fumadocs
  - Owns product documentation, concept documentation, roadmap/status, and cross-component guides

- `apps/storybook`
  - Local and CI component workbench
  - Owns Storybook configuration, visual validation workflows, and interactive component debugging

## Component Asset Colocation

Component-level assets should live with the component they describe.

Example:

```text
packages/ui/src/components/Button/
  index.tsx
  types.ts
  style.css
  Button.test.tsx
  Button.stories.tsx
  Button.docs.mdx
```

This is the default rule because it keeps implementation, tests, stories, and docs synchronized when a component changes.

### Colocated assets

- Component implementation
- Component-specific types
- Component-specific styles
- Component behavior tests
- Storybook stories
- Component usage and API docs

### Non-colocated assets

These belong in the docs app because they are not about a single component:

- Homepage
- Getting Started
- Installation
- Architecture overview
- SwiftUI alignment philosophy
- Responsive design model
- Theming model
- Navigation concepts
- Contribution guide
- Roadmap and maturity matrix

## Documentation Strategy

Documentation should be split into two systems with clear boundaries.

### Fumadocs

Fumadocs is the public documentation surface.

It should provide:

- Brand and product presentation
- Getting Started
- Core concepts
- SwiftUI-to-React mental model mapping
- Component guides
- Patterns and recipes
- Alignment status and support matrix
- Responsive, accessibility, and theming guidance

Fumadocs should be visually polished and optimized for learning and adoption.

### Storybook

Storybook remains part of the product, but only as a component workbench.

It should provide:

- Interactive state exploration
- Prop playgrounds
- Local debugging of edge cases
- Scenario verification during development
- A future base for interaction and visual regression workflows

Storybook should not act as the primary public documentation site.

### Content Ownership Rules

- Product-level docs belong to `apps/docs`
- Component-level docs belong to component folders in `packages/ui`
- Storybook consumes colocated stories from `packages/ui`
- Fumadocs consumes colocated component docs and adds higher-level guides from `apps/docs`

## Testing Strategy

The new library should treat testing as a first-class product requirement.

### Layer 1: Unit tests

Used for:

- Utility functions
- Token mapping logic
- Responsive helpers
- Hooks
- Context helpers
- State machines and reducers

### Layer 2: Component behavior tests

Used for:

- Semantic output
- Controlled and uncontrolled behavior
- Keyboard interactions
- Accessibility attributes
- Focus handling
- Disabled, loading, and error states

These tests should verify user-observable behavior, not implementation trivia like incidental class names.

### Layer 3: Integration tests

Used for:

- NavigationStack flows
- Presentation containers like Sheet and Page
- List/Section semantics
- Layout behavior across responsive constraints
- Cross-component composition

### Layer 4: Story-driven validation

Used for:

- Storybook state coverage
- Interaction checks
- Future screenshot or visual regression workflows

### Testing Standard

Every production-ready component must have:

- Behavior tests
- Representative stories
- Component documentation
- Explicit accessibility expectations

## Styling and Design System Strategy

The library should not switch its internal styling foundation to Tailwind CSS.

Tailwind may be used in docs or app-level implementation where helpful, but the component library itself should remain token-driven and component-oriented.

### Core styling rules

- Design tokens are the source of truth
- Visual defaults should be driven by tokens, not inline ad hoc values
- Styling must support component packaging and distribution
- State styles and platform-like interaction details should remain explicit and maintainable

### Required design system capabilities

- Color tokens
- Typography tokens
- Spacing tokens
- Radius tokens
- Elevation/shadow tokens
- Motion tokens
- Responsive tokens
- Size class support
- Reduced motion support
- High contrast support
- Light and dark themes

### Styling implementation direction

The current SCSS approach can be replaced if needed, but the replacement must keep:

- Strong token support
- Component-level style ownership
- Minimal leakage of global styling assumptions
- Predictable output for consumers

## Responsive Strategy

The library should support a SwiftUI-inspired responsive model, adapted for the web.

### Principles

- Support compact and regular size classes as a first-class concept
- Support viewport breakpoints where the web requires them
- Keep responsive behavior explicit in both code and docs
- Avoid hidden magic that makes layouts unpredictable

### Public expectations

Users should be able to:

- Build layouts that adapt between compact and regular environments
- Use container-style primitives that respond sensibly to width changes
- Understand responsive behavior from docs and stories without reading internals

## Public API Design Rules

The API should feel familiar to SwiftUI users, but it must still behave naturally in React.

### Rules

- Prefer semantic props over CSS-like props
- Use React composition rather than reproducing SwiftUI internals literally
- Support controlled and uncontrolled patterns where appropriate
- Use semantic HTML whenever possible
- Make accessibility the default, not an optional enhancement
- Avoid overly clever abstractions that obscure React behavior

### Alignment categories

Each component should declare one of these statuses in docs:

- `aligned`: meaningfully matches SwiftUI semantics and behavior
- `adapted`: same conceptual role, but adjusted for web constraints
- `partial`: only some behavior or API is implemented
- `planned`: intentionally not implemented yet

## Architecture Layers

The system should be organized into four layers.

### 1. Design System Layer

Owns:

- Tokens
- Theming
- Motion rules
- Responsive rules
- Accessibility baselines

### 2. Primitive Layer

Owns:

- Fundamental building blocks such as Text, Button, Image, Stack, Spacer, field primitives, and shape primitives
- Shared authoring patterns for component props and state

### 3. Composite and Container Layer

Owns:

- Navigation
- Presentation
- Lists and form containers
- Toolbars, tabs, and higher-level UI structures

### 4. Validation and Documentation Layer

Owns:

- Tests
- Stories
- Public docs
- Coverage and maturity reporting

## Implementation Standards

All rewritten components should follow these internal engineering standards:

- Functional React components by default
- Hooks for reusable state logic
- Semantic HTML over generic `div` wrappers where possible
- Minimal inline styling
- Strong typing without broad escape hatches
- No obsolete React lifecycle patterns
- No debug logging in shipped runtime code
- No brittle tests that assert internal DOM details unless those details are part of the public contract

## Initial Priority Order

The first implementation phase should not try to add every SwiftUI component immediately.

Priority should be:

1. Repository reset and monorepo structure
2. Build, lint, typecheck, and test architecture
3. Design tokens and responsive foundation
4. Navigation and presentation foundation
5. Documentation and Storybook split
6. Standardization of existing core components

Only after this should the project aggressively expand component coverage.

## Phased Delivery Model

### Phase 1: Repo and architecture reset

Outcomes:

- Monorepo setup
- Library/app boundaries
- Unified scripts
- Removal of current known structural issues

### Phase 2: Foundation hardening

Outcomes:

- Stable token system
- Responsive model
- Navigation/presentation rewrite
- Shared authoring conventions

### Phase 3: Documentation system

Outcomes:

- Fumadocs public site
- Storybook workbench
- Colocated component docs/stories/tests

### Phase 4: Core component standardization

Outcomes:

- Existing core components rewritten or normalized
- Better a11y and test coverage
- SwiftUI alignment status made explicit

### Phase 5: Coverage expansion

Outcomes:

- New component implementations built on a stable foundation
- Maturity model tracked across the library

### Phase 6: Production readiness gate

Outcomes:

- CI enforcement
- Release workflow
- Visual and interaction validation
- Stable contribution path

## Success Criteria

The rebuild is successful when:

- The repo structure clearly separates library, docs, and workbench concerns
- Component source, tests, stories, and component docs stay synchronized through colocation
- Public docs are polished enough to represent the product directly
- Storybook remains fast and useful for local development and debugging
- Core components have reliable behavior and integration tests
- The styling and responsive system are consistent and token-driven
- The public API reads as SwiftUI-inspired while the implementation remains idiomatic React
- The project can credibly claim a production-ready foundation before broadening component coverage

## Risks and Mitigations

### Risk: Scope explosion from “support all SwiftUI components”

Mitigation:

- Treat full coverage as a roadmap, not a single milestone
- Gate expansion behind a stable foundation

### Risk: Docs and stories drifting apart

Mitigation:

- Colocate component docs and stories with source
- Keep conceptual docs in the docs app only

### Risk: Over-optimizing for SwiftUI and violating web norms

Mitigation:

- Preserve the dual-alignment rule
- Review all APIs against React and accessibility expectations

### Risk: Carrying current implementation debt into the new system

Mitigation:

- Allow breaking rewrites
- Delete or replace incorrect abstractions rather than wrapping them

## Recommendation

Proceed with a foundation-first rebuild using a monorepo, colocated component assets, Fumadocs for product documentation, Storybook for the development workbench, and a strict testing/documentation standard for every production-ready component.

This is the highest-leverage path to making SwiftUI.js credible as a production-ready library without letting early architectural mistakes compound as component coverage grows.
