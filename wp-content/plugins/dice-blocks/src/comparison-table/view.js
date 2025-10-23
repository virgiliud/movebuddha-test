(function () {
  function init(root) {
    if (root.dataset.comparisonTableInitialized) return;
    root.dataset.comparisonTableInitialized = "true";

    const $ = (sel) => Array.from(root.querySelectorAll(sel));

    const selection = new Set();
    const tray = root.querySelector("[data-comparison-tray]");

    const setIconState = (btn, isSelected) => {
      btn.setAttribute("aria-pressed", String(isSelected));
      btn.dataset.selected = isSelected ? "true" : "false";
      const show = btn.querySelector("[data-selected-variant]");
      const hide = btn.querySelector("[data-unselected-variant]");
      if (show) show.classList.toggle("hidden", !isSelected);
      if (hide) hide.classList.toggle("hidden", isSelected);

      btn.classList.remove(isSelected ? "border-primary" : "border-accent");
      btn.classList.add(isSelected ? "border-accent" : "border-primary");
    };

    const applyForId = (id, isSelected) => {
      if (isSelected) selection.add(id);
      else selection.delete(id);

      // Update all related elements for this mover id
      [
        `[data-mover-card="${id}"]`,
        `[data-mover-row="${id}"]`,
        `[data-compare-toggle][data-mover-id="${id}"]`,
      ]
        .map((s) => $(s))
        .flat()
        .forEach((el) => {
          if (el.matches("[data-compare-toggle]")) {
            setIconState(el, isSelected);
          } else {
            el.dataset.selected = isSelected ? "true" : "false";
          }
        });

      updateTrayAndActions();
    };

    const updateTrayAndActions = () => {
      const count = selection.size;
      if (tray) {
        tray.hidden = count === 0;
        const c = tray.querySelector("[data-selected-count]");
        const n = tray.querySelector("[data-selected-noun]");
        if (c) c.textContent = String(count);
        if (n) n.textContent = count === 1 ? "Company" : "Companies";
      }
      $("[data-compare-button]").forEach((btn) =>
        btn.toggleAttribute("disabled", count < 2)
      );
    };

    // Init all compare toggles
    $("[data-compare-toggle]").forEach((btn) => {
      const id = btn.dataset.moverId;
      if (id) {
        btn.classList.add("border", "border-primary");
        applyForId(id, false);
      }
    });

    // Delegated click listener
    root.addEventListener("click", (e) => {
      const clearBtn = e.target.closest("[data-clear-selection]");
      if (clearBtn && root.contains(clearBtn)) {
        e.preventDefault();
        Array.from(selection).forEach((id) => applyForId(id, false));
        return;
      }

      const toggleBtn = e.target.closest("[data-compare-toggle]");
      if (toggleBtn && root.contains(toggleBtn)) {
        e.preventDefault();
        const id = toggleBtn.dataset.moverId;
        if (!id) return;
        const isSelected = !selection.has(id);
        applyForId(id, isSelected);
      }
    });
  }

  function boot() {
    document
      .querySelectorAll("[data-comparison-table]")
      .forEach((root) => init(root));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
