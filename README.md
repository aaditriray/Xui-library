# Enterprise Angular UI Library

An enterprise-grade Angular UI Component Library built using:

- Angular
- Storybook
- SCSS
- Atomic Design
- WCAG Accessibility Standards
- OWASP Top 10 Security Principles

---

# Objectives

This project provides a reusable component library for enterprise applications while ensuring:

- Security by design
- Accessibility by default
- Consistent UX
- Zero commercial dependencies
- High maintainability
- Theme support
- Responsive design

---

# Technology Stack

| Technology | Purpose |
|------------|----------|
| Angular | Component Framework |
| TypeScript | Type Safety |
| SCSS | Styling |
| Storybook | Component Documentation |
| Angular CDK | Base UI Utilities |
| GitHub Actions | CI/CD |

---

# Architecture

## Atomic Design

```text
Atoms
   ↓
Molecules
   ↓
Organisms
   ↓
Templates
```

---

# Project Structure

```text
projects/
└── ui-core/
    └── src/
        ├── styles.scss
        ├── public-api.ts
        └── lib/
            ├── atoms/
            │   ├── button/
            │   ├── checkbox/
            │   ├── textbox/
            │   └── additional-atoms.ts
            ├── molecules/
            │   ├── form-field/
            │   └── additional-molecules.ts
            ├── organisms/
            │   ├── modal/
            │   └── additional-organisms.ts
            ├── templates/
            │   └── templates.ts
            ├── directives/
            ├── pipes/
            ├── services/
            └── tokens/

.storybook/
├── main.ts
├── preview.ts
└── tsconfig.json
```

Component stories are colocated as `*.stories.ts` files and the public component
API is exported from `projects/ui-core/src/public-api.ts`.

---

# Components

## Atoms

- Button
- Textbox
- Password
- Textarea
- Checkbox
- Radio
- Label
- Badge
- Icon
- Link
- Spinner

## Molecules

- Form Field
- Search Box
- Dropdown
- Radio Group
- Checkbox Group
- Breadcrumb
- Input Group

## Organisms

- Table
- Tabs
- Accordion
- Modal
- Navigation
- Header
- Footer
- Stepper
- Side Panel

## Templates

- Login
- Dashboard
- Search
- Master Detail

Each component in the inventory has an Angular implementation and a Storybook
example. Interactive controls use semantic HTML, expose typed inputs and
outputs, and provide keyboard-friendly native behavior or the appropriate
composite-widget keyboard interaction.

---

# Security Standards

This library follows OWASP Top 10 recommendations.

## Rules

### Prevent XSS

Never use:

```typescript
innerHTML
eval()
document.write()
```

Use Angular bindings:

```html
{{ value }}
```

---

### Input Validation

All user input should be validated before emitting events.

---

### Strong Typing

All public APIs must use TypeScript interfaces.

Example:

```typescript
export interface TableColumn {
    field: string;
    header: string;
}
```

---

### Secure Event Handling

Events must emit sanitized and validated values.

---

# Accessibility

All generated components must conform to **WCAG 2.2 Level AA** and support the
following requirements. Component, Storybook, and test implementations must
preserve these behaviors unless a documented accessibility exception is
approved.

## Mandatory Component Requirements

- Use semantic HTML first; add ARIA only to expose information that native
  elements cannot provide.
- Every interactive component must have an accessible name and, when needed,
  an accessible description.
- Support complete keyboard operation with the documented interaction pattern.
  Do not remove, trap, or obscure keyboard focus.
- Provide a visible focus indicator on interactive elements. Use a focus style
  with at least a 2 px area, at least 3:1 contrast against adjacent colors, and
  do not rely on color alone.
- Use logical heading, landmark, label, and reading order. Do not use headings
  or lists solely for visual styling.
- Associate form controls with visible labels. Use `aria-describedby` for
  existing help or error text and `aria-invalid="true"` for invalid controls.
- Preserve state with accessible semantics, including `aria-expanded`,
  `aria-selected`, `aria-pressed`, or the native equivalent where applicable.
- Announce asynchronous state changes and important errors with live regions
  without repeatedly announcing unchanged content.
- Move focus intentionally when opening, closing, or replacing UI. Modal dialogs
  must contain focus, return focus to the trigger, and provide an Escape action
  when dismissal is allowed.
- Do not use positive `tabindex` values. Keep custom pointer interactions
  operable from the keyboard.
- Support 200% zoom and reflow down to a 320 CSS-pixel viewport without loss of
  content or two-dimensional scrolling for the normal reading experience.
- Make target controls at least 24 by 24 CSS pixels, or provide a 24-pixel
  spacing exception as described by WCAG 2.2. For high-precision or touch UI,
  prefer 44 by 44 CSS pixels.
- Do not cause unexpected page movement, flashing, or animated motion. Honor
  `prefers-reduced-motion`.
- Do not convey status, errors, or selection only through color.
- Ensure time limits, parallax, auto-updating content, moving content, or
  auto-playing media provide pause, stop, hide, or time extension controls when
  the user may need them.

## Text and Non-text Contrast

- Normal text must have at least 4.5:1 contrast against its background.
- Large text and large-text alternatives must have at least 3:1 contrast.
- User-interface components, active states, and graphical objects required to
  understand the interface must have at least 3:1 contrast against adjacent
  colors.
- Disabled controls are exempt from contrast requirements, but must remain
  visually distinct and use native or consistent disabled semantics.
- Verify both light and dark themes. Do not combine text and background values
  only on the assumption that a design token pair is accessible.

## Generated Component Contract

Every component generated for this library must include:

1. **Semantic template** - native elements and roles, labels, descriptions,
   headings, and state attributes.
2. **Keyboard behavior** - expected key commands and focus behavior, including
   focus restoration where it applies.
3. **Accessible API** - typed inputs for labels or externally supplied names,
   with no duplicate or inaccessible controls.
4. **Storybook accessibility example** - default, error, loading, disabled,
   selected, and keyboard states as applicable.
5. **Automated checks** - unit or browser tests for DOM semantics and keyboard
   behavior, plus an accessibility scan in Storybook or CI.
6. **Manual verification** - keyboard-only, zoom/reflow, screen-reader, pointer,
   high-contrast, and reduced-motion checks.

Do not ship a component with placeholder text such as "click here", unlabeled
icons, empty buttons, positive `tabindex`, removed focus outlines, or a visual
state that lacks an accessible equivalent.

## Testing

Use at least the following checks for each interactive component:

- Run an automated scanner such as axe against representative component states.
- Test keyboard navigation with `Tab`, `Shift+Tab`, `Enter`, `Space`, and
  component-specific arrow keys.
- Verify focus order and focus visibility in light and dark themes.
- Test labels, descriptions, state, and announcements with a screen reader.
- Test at 200% zoom and at a 320 CSS-pixel viewport.
- Inspect CSS contrast and target size rather than relying only on visual review.

Automated results do not replace manual testing. Existing tests should fail when
an accessible name, keyboard behavior, focus treatment, or required ARIA state
is removed.

---

# Design Tokens

## Colors

```scss
:root {
  --xui-primary: #0057b8;
  --xui-primary-dark: #174a7c;
  --xui-danger: #b42318;
  --xui-focus: #0b63ce;
}
```

## Spacing

```scss
:root {
  --xui-space-1: 4px;
  --xui-space-2: 8px;
  --xui-space-3: 12px;
  --xui-space-4: 16px;
  --xui-space-5: 24px;
  --xui-space-6: 32px;
}
```

## Border Radius

```scss
:root {
  --xui-radius-sm: 4px;
  --xui-radius-md: 8px;
  --xui-radius-lg: 12px;
}
```

---

# Styling

Shared design tokens and common component rules live in
`projects/ui-core/src/styles.scss`. It defines the color, spacing, focus,
typography, form-control, target-size, visually-hidden, and reduced-motion
defaults used throughout the library.

The Angular demo imports this file from `src/styles.scss`, and Storybook loads
the same stylesheet from `.storybook/preview.ts`. Keep shared CSS and design
tokens in this global file; do not duplicate them in component styles.

Each component's SCSS file should contain only rules unique to that component,
such as its layout, variant, or specialized state. Components without unique
styles do not need a component stylesheet. Keep component styles in external
`.scss` files referenced with `styleUrl`; do not add inline `styles` or `style`
attributes.

The library build includes `styles.scss` as a package asset. Consumers should
load it once in their application's global stylesheet:

```scss
@use 'ui-core/styles';
```

---

# Storybook

Storybook is the primary catalog and development environment for `ui-core`.
Component stories live beside the source implementation under
`projects/ui-core/src/lib` and demonstrate default, state, error, and disabled
variants.

Start the Storybook development server:

```bash
npm run storybook
```

The local catalog is available at `http://localhost:6006`.

Build the static Storybook catalog:

```bash
npm run build-storybook
```

The generated static site is written to `storybook-static/`.

## Story Requirements

Every component should provide:

- Default and representative state stories
- Disabled, loading, error, selected, or expanded states when applicable
- Accessible names and visible labels
- Keyboard interaction coverage
- Story controls for public component inputs
- Automated accessibility checks through the Storybook accessibility addon

Place each story beside its component as `*.stories.ts`. Do not replace manual
keyboard and screen-reader verification with accessibility-addon results.

---

# Development

Install dependencies:

```bash
npm install
```

Run the Angular application:

```bash
npm start
```

Run the component catalog:

```bash
npm run storybook
```

Run tests:

```bash
npm test
```

Lint Project

```bash
npm run lint
```

---

# Code Quality

Required standards:

- TypeScript Strict Mode
- ESLint
- Prettier
- SonarQube Compatible
- 80%+ Unit Test Coverage

---

# CI/CD Pipeline

Pipeline Stages:

1. Install
2. Lint
3. Unit Test
4. Security Scan
5. Build Library
6. Build Storybook
7. Publish Artifact
8. Release

---

# Versioning

Semantic Versioning:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.0.0
1.1.0
1.1.1
```

---

# Roadmap

## Version 1.0

- Foundation
- Design Tokens
- Atoms

## Version 1.5

- Molecules
- Forms

## Version 2.0

- Organisms
- Dynamic Table
- Navigation

## Version 3.0

- Templates
- Theme Engine
- Dark Mode

---

# License

MIT License