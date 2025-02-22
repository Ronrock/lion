import { css } from '@lion/core';
import { LocalizeMixin } from '@lion/localize';
import { LionInput } from '@lion/input';
import { FieldCustomMixin } from '@lion/field';
import { IsNumber } from '@lion/validate';
import { parseAmount } from './parsers.js';
import { formatAmount } from './formatters.js';

/**
 * `LionInputAmount` is a class for an amount custom form element (`<lion-input-amount>`).
 *
 * @customElement lion-input-amount
 * @extends {LionInput}
 */
export class LionInputAmount extends FieldCustomMixin(LocalizeMixin(LionInput)) {
  static get properties() {
    return {
      currency: {
        type: String,
      },
    };
  }

  updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has('currency')) {
      this._onCurrencyChanged({ currency: this.currency });
    }
  }

  get slots() {
    return {
      ...super.slots,
      after: () => {
        if (this.currency) {
          const el = document.createElement('span');
          el.textContent = this.currency;
          return el;
        }
        return null;
      },
    };
  }

  constructor() {
    super();
    this.parser = parseAmount;
    this.formatter = formatAmount;

    this.defaultValidators.push(new IsNumber());
  }

  connectedCallback() {
    // eslint-disable-next-line wc/guard-super-call
    super.connectedCallback();
    this.type = 'text';
  }

  _onCurrencyChanged({ currency }) {
    if (this._isPrivateSlot('after')) {
      Array.from(this.children).find(child => child.slot === 'after').textContent = currency;
    }
    this.formatOptions.currency = currency;
    this._calculateValues();
  }

  static get styles() {
    return [
      ...super.styles,
      css`
        .input-group__container > .input-group__input ::slotted(.form-control) {
          text-align: right;
        }
      `,
    ];
  }
}
