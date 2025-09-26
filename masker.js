// ==UserScript==
// @name         Fidelity Positions: Mask Account Digits with "yourmum"
// @namespace    http://tampermonkey.net/
// @version      2025-09-26
// @description  Automatically replace account last digits with ****yourmum on the positions page
// @author       wind
// @match        https://digital.fidelity.com/ftgw/digital/portfolio/positions*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fidelity.com
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
  'use strict';

  const MASK_TEXT = '****yourmum';
  const SECONDARY_CLASS = 'posweb-cell-account_secondary';
  const H3_CLASS = 'posweb-cell-account';
  const DATA_FLAG = 'yourmumMasked';

  function maskInRoot(root) {
    if (!root) return;

    try {
      // 1) Preferred: by class selector
      const secondarySpans = root.querySelectorAll(`span.${SECONDARY_CLASS}`);
      secondarySpans.forEach(span => {
        if (span.dataset[DATA_FLAG] === '1') return;
        span.textContent = MASK_TEXT;
        span.dataset[DATA_FLAG] = '1';
      });

      // 2) Fallback: 3rd span inside h3.posweb-cell-account
      const headers = root.querySelectorAll(`h3.${H3_CLASS}`);
      headers.forEach(h3 => {
        // Already handled above if the secondary span had the class (and got flagged)
        if (h3.dataset[DATA_FLAG] === '1') return;

        const spans = h3.querySelectorAll('span');
        if (spans.length >= 3) {
          const lastDigitsSpan = spans[2];
          // Only mask if not already done
          if (lastDigitsSpan && lastDigitsSpan.dataset[DATA_FLAG] !== '1') {
            lastDigitsSpan.textContent = MASK_TEXT;
            lastDigitsSpan.dataset[DATA_FLAG] = '1';
            h3.dataset[DATA_FLAG] = '1';
          }
        }
      });
    } catch (e) {
      // Fail safe: swallow errors so it doesn't disrupt page
      // console.warn('[yourmum-mask] error while masking', e);
    }
  }

  function maskAll() {
    maskInRoot(document);
  }

  function setupObserver() {
    const observer = new MutationObserver(mutations => {
      for (const m of mutations) {
        if (m.type === 'childList' && m.addedNodes && m.addedNodes.length) {
          m.addedNodes.forEach(node => {
            if (node && node.nodeType === Node.ELEMENT_NODE) {
              maskInRoot(node);
            }
          });
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return observer;
  }

  function setupSafetyInterval() {
    // In case the grid re-renders or lazy loads content we didn't observe,
    // run a short interval to re-apply for a little while.
    let ticks = 0;
    const maxTicks = 60; // ~30 seconds total
    const id = setInterval(() => {
      maskAll();
      if (++ticks >= maxTicks) clearInterval(id);
    }, 500);
  }

  // Initialize
  function init() {
    maskAll();
    setupObserver();
    setupSafetyInterval();
    // Also re-mask on visibility changes (SPA can re-render while hidden)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        maskAll();
      }
    }, { passive: true });
  }

  // Run when DOM is ready enough (document-idle ensures this, but double-guard)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
