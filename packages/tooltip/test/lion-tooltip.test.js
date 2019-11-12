import { expect, fixture, html } from '@open-wc/testing';

import '../lion-tooltip.js';

describe('lion-tooltip', () => {
  describe('Basic', () => {
    it('should not be shown by default', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('none');
    });

    it('should show content on mouseenter and hide on mouseleave', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const eventMouseEnter = new Event('mouseenter');
      el.dispatchEvent(eventMouseEnter);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
      const eventMouseLeave = new Event('mouseleave');
      el.dispatchEvent(eventMouseLeave);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('none');
    });

    it('should show content on mouseenter and remain shown on focusout', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const eventMouseEnter = new Event('mouseenter');
      el.dispatchEvent(eventMouseEnter);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
      const eventFocusOut = new Event('focusout');
      el.dispatchEvent(eventFocusOut);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
    });

    it('should show content on focusin and hide on focusout', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="invoker"]');
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
      const eventFocusOut = new Event('focusout');
      invoker.dispatchEvent(eventFocusOut);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('none');
    });

    it('should show content on focusin and remain shown on mouseleave', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="invoker"]');
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
      const eventMouseLeave = new Event('mouseleave');
      invoker.dispatchEvent(eventMouseLeave);
      await el.updateComplete;
      expect(el.querySelector('[slot="content"]').style.display).to.be.equal('inline-block');
    });

    it('should tooltip contains html when specified in tooltip content body', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">
            This is Tooltip using <strong id="click_overlay">overlay</strong>
          </div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="invoker"]');
      const event = new Event('mouseenter');
      invoker.dispatchEvent(event);
      await el.updateComplete;
      expect(el.querySelector('strong')).to.not.be.undefined;
    });
  });

  describe('Accessibility', () => {
    it('should have a tooltip role set on the tooltip', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="content"]');
      expect(invoker.getAttribute('role')).to.be.equal('tooltip');
    });

    it('should have aria-controls attribute set to the invoker', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="invoker"]');
      expect(invoker.getAttribute('aria-controls')).to.not.be.null;
    });

    it('should be accessible when closed', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      await expect(el).to.be.accessible;
    });

    it('should be accessible when opened', async () => {
      const el = await fixture(html`
        <lion-tooltip>
          <div slot="content">Hey there</div>
          <lion-button slot="invoker">Tooltip button</lion-button>
        </lion-tooltip>
      `);
      const invoker = el.querySelector('[slot="invoker"]');
      const eventFocusIn = new Event('focusin');
      invoker.dispatchEvent(eventFocusIn);
      await el.updateComplete;

      await expect(el).to.be.accessible;
    });
  });
});
