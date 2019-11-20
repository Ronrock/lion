# Overlays System

[//]: # 'AUTO INSERT HEADER PREPUBLISH'

Supports different types of overlays like dialogs, toasts, tooltips, dropdown, etc.

Manages their position on the screen relative to other elements, including other overlays.

## Features

- [**Overlays Manager**](./docs/OverlaysManager.md), a global repository keeping track of all different types of overlays
- [**OverlayController**](./docs/OverlayController.md), a single controller class for handling overlays
- **OverlayMixin**, a mixin that can be used to create webcomponents that use the OverlayController under the hood

## How to use

### Installation

```sh
npm i --save @lion/overlays
```

### Example

```js
import { OverlayController } from '@lion/overlays';

const ctrl = new OverlayController({
  ...withModalDialogConfig(),
  invokerNode,
  contentNode,
});
```

## Rationales

For rationales, please check the [docs](./docs) folder, where we go into large detail!

### Aria roles

- No `aria-controls` as support for it is not quite there yet
- No `aria-haspopup`. People knowing the haspop up and hear about it don’t expect a dialog to open (at this moment in time) but expect a sub-menu. Until support for the dialog value has better implementation, it’s probably best to not use aria-haspopup on the element that opens the modal dialog.
