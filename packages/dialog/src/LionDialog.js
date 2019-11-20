import { LitElement, html } from '@lion/core';
import { OverlayMixin, OverlayController, withModalDialogConfig } from '@lion/overlays';

export class LionDialog extends OverlayMixin(LitElement) {
  static get properties() {
    return {
      config: {
        type: Object,
      },
    };
  }

  set config(value) {
    if (this._overlayCtrl) {
      this._overlayCtrl.updateConfig(value);
    }
    // Before OverlayController instance exists, we still need to store this config
    // for _defineOverlay, where we instantiate the OverlayController with the config
    this.__config = value;
  }

  render() {
    return html`
      <slot name="invoker"></slot>
      <slot name="content"></slot>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  _defineOverlay() {
    return new OverlayController({
      ...withModalDialogConfig(),
      contentNode: this.querySelector('[slot=content]'),
      invokerNode: this.querySelector('[slot=invoker]'),
      ...this.__config,
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Bound 'this' to LionDialog instance, otherwise 'this' is bound to invoker/content node.
    this.show = () => this._overlayCtrl.show();
    this.hide = () => this._overlayCtrl.hide();

    this._overlayCtrl.invokerNode.addEventListener('click', this.show);
    this._overlayCtrl.contentNode.addEventListener('dialog-close', this.hide);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._overlayCtrl.invokerNode.removeEventListener('click', this.show);
    this._overlayCtrl.invokerNode.removeEventListener('dialog-close', this.hide);
  }
}
