# Migration Guidelines Overlay System

If you are still using the old overlay system, we encourage you to migrate. The new way is more reliable, less error-prone and a lot easier to maintain. In addition, we now have a web component `lion-dialog` which is a declarative way of adding a modal dialog inside your template!

## Declaratively (encouraged)

Using generic `lion-overlay`:

```js
import { withBottomSheetConfig } from '@lion/overlays';
import '@lion/overlays/lion-overlay.js';

const template = html`
  <lion-overlay
    .config=${{
      ...withBottomSheetConfig(),
      viewportConfig: { placement: 'top-right' },
    }}
  >
    <button slot="invoker">Click me!</button>
    <div slot="content">
      <div>Hello, World!</div>
      <button @click=${e => e.target.dispatchEvent(new Event('overlay-close', { bubbles: true }))}>
        Close
      </button>
    </div>
  </lion-overlay>
`;
```

Or using a more specific component like `lion-tooltip`, which toggles on-hover:

```js
import '@lion/tooltip/lion-tooltip.js';

const template = html`
  <lion-tooltip .config=${{ popperConfig: { placement: 'top-right' } }}>
    <button slot="invoker">Hover me!</button>
    <div slot="content">
      <div>Hello, World!</div>
    </div>
  </lion-tooltip>
`;
```

Or `lion-dialog` which uses modal dialog configuration defaults

```js
import '@lion/dialog/lion-dialog.js';

const template = html`
  <lion-dialog .config=${{ viewportConfig: { placement: 'top-right' } }}>
    <button slot="invoker">Click me!</button>
    <div slot="content">
      <div>Hello, World!</div>
      <button @click=${e => e.target.dispatchEvent(new Event('dialog-close', { bubbles: true }))}>
        Close
      </button>
    </div>
  </lion-dialog>
`;
```

## Instantiating an overlay controller (discouraged)

### Old

```js
import { overlays, GlobalOverlayController } from '@lion/overlays';

const ctrl = overlays.add(
  new GlobalOverlayController({
    contentTemplate: () => html`
      <div>My content</div>
    `,
  }),
);

const template = html`
  <lion-button @click="${event => ctrl.show(event.target)}">
    Open dialog
  </lion-button>
`;
```

### New

> Note: The OverlayController is render-system agnostic, you are responsible for passing a node (and rendering it prior). For lit-html, the open-wc fixtureSync helper works fine.

This example shows how you can use our configuration generators.

```js
import { OverlayController, withModalDialogConfig } from '@lion/overlays';
import { fixtureSync } from '@open-wc/testing-helpers';

const ctrl = new OverlayController({
  ...withModalDialogConfig(),
  contentTemplate: fixtureSync(html`
    <div>My content</div>
  `),
});

const template = html`
  <lion-button @click="${event => ctrl.show(event.target)}">
    Open dialog
  </lion-button>
`;
```

### New (local example)

```js
import { OverlayController } from '@lion/overlays';
import { fixtureSync } from '@open-wc/testing-helpers';

const ctrl = new OverlayController({
  ...withModalDialogConfig(),
  placementMode: 'local',
  hidesOnEsc: true,
  hidesOnOutsideClick: true,
  contentNode: fixtureSync(html`
    <div>United Kingdom</div>
  `),
  invokerNode: fixtureSync(html`
    <button @click=${() => ctrl.toggle()}>UK</button>
  `),
});

const template = html`
  <div>In the ${ctrl.invoker}${ctrl.content} the weather is nice.</div>
`;
```
