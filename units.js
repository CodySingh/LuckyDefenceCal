/* Units page: card grid, filters and a detail dialog. Needs units-data.js. */
(function () {
  const grid = document.getElementById("unit-grid");
  if (!grid) return;

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const cap = (s) => (s ? s[0].toUpperCase() + s.slice(1) : "");
  const is2026 = (u) => (u.updated || "").startsWith("2026");

  /* Image with fallback: Immortal → its Mythic's art → lettered placeholder. */
  function imgTag(id, alt, fallbackId, cls) {
    const fb = fallbackId ? `images/units/${fallbackId}.webp` : "";
    const letter = esc((alt || "?").trim()[0]);
    return `<span class="portrait ${cls || ""}" data-letter="${letter}">
      <img src="images/units/${id}.webp" alt="${esc(alt)}" loading="lazy"
        onerror="if(this.dataset.fb!=='1' && '${fb}'){this.dataset.fb='1';this.src='${fb}';this.parentNode.classList.add('fallback');}else{this.remove();}">
    </span>`;
  }

  const milestoneIcon = (m) => (m && m.unlock ? "★" : "▲");

  function card(u) {
    const tags = [u.type && cap(u.type), u.race, u.damage && cap(u.damage)].filter(Boolean).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const ms = [6, 12].map((lv) => {
      const m = u["lv" + lv];
      if (!m) return `<li class="ms none"><b>Lv ${lv}</b> <span>Not documented</span></li>`;
      return `<li class="ms ${m.unlock ? "unlock" : "upgrade"}"><b>Lv ${lv} ${milestoneIcon(m)}</b> <span>${esc(m.text)}</span></li>`;
    }).join("");
    const flags = [
      u.immortal ? `<span class="badge imm">Immortal</span>` : "",
      !is2026(u) ? `<span class="badge warn" title="Wiki page last edited ${u.updated}">Not yet verified for 2026</span>` : "",
      u.incomplete ? `<span class="badge warn">Incomplete data</span>` : ""
    ].join("");
    return `<button class="unit-card" data-id="${u.id}" aria-label="Open ${esc(u.name)} details">
      <div class="unit-top">
        ${u.noImage ? `<span class="portrait" data-letter="${esc(u.name[0])}"></span>` : imgTag(u.id, u.name)}
        <div class="unit-id">
          <h2>${esc(u.name)} <span class="ko">${esc(u.ko)}</span></h2>
          <div class="tags">${tags}</div>
          <div class="mini-stats">⚔ ${esc(u.atk)} · ⚡ ${esc(u.aspd)}</div>
        </div>
      </div>
      <ul class="ms-list">${ms}</ul>
      <div class="flags">${flags}</div>
    </button>`;
  }

  /* ---------- Filtering ---------- */
  const state = { q: "", damage: "all", immortalOnly: false };

  function matches(u) {
    if (state.damage !== "all" && u.damage !== state.damage) return false;
    if (state.immortalOnly && !u.immortal) return false;
    if (state.q) {
      const hay = [u.name, u.ko, u.immortal && u.immortal.name, u.immortal && u.immortal.ko, ...u.skills.map((s) => s.name)].join(" ").toLowerCase();
      if (!hay.includes(state.q)) return false;
    }
    return true;
  }

  function renderGrid() {
    const list = UNITS.filter(matches);
    grid.innerHTML = list.length ? list.map(card).join("") : `<p class="muted empty">No units match your filters.</p>`;
    document.getElementById("unit-count").textContent = `${list.length} of ${UNITS.length} Mythics`;
  }

  document.getElementById("unit-search").addEventListener("input", (e) => { state.q = e.target.value.trim().toLowerCase(); renderGrid(); });
  document.querySelectorAll("[data-damage]").forEach((b) => b.addEventListener("click", () => {
    state.damage = b.dataset.damage;
    document.querySelectorAll("[data-damage]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderGrid();
  }));
  document.getElementById("imm-only").addEventListener("change", (e) => { state.immortalOnly = e.target.checked; renderGrid(); });

  /* ---------- Detail dialog ---------- */
  const dlg = document.getElementById("unit-dialog");
  const body = document.getElementById("unit-dialog-body");

  function timeline(u) {
    const nodes = [];
    for (let lv = 1; lv <= 15; lv++) {
      let cls = "", label = "";
      if (lv === 6 || lv === 12) {
        const m = u["lv" + lv];
        cls = m ? (m.unlock ? "big unlock" : "big upgrade") : "big none";
        label = m ? milestoneIcon(m) : "?";
      } else if (UNIT_COMMON_LEVELS[lv]) {
        cls = "small"; label = "+";
      }
      nodes.push(`<li class="${cls}" title="${lv === 6 || lv === 12 ? esc((u["lv" + lv] || {}).text || "Not documented") : esc(UNIT_COMMON_LEVELS[lv] || "")}"><span class="dot">${label}</span><span class="lv">${lv}</span></li>`);
    }
    return `<ol class="timeline" aria-label="Level 1 to 15">${nodes.join("")}</ol>`;
  }

  function milestoneRows(u) {
    const rows = [];
    for (let lv = 1; lv <= 15; lv++) {
      if (lv === 6 || lv === 12) {
        const m = u["lv" + lv];
        rows.push(`<tr class="${m ? (m.unlock ? "unlock" : "upgrade") : "none"}"><td>Lv ${lv}</td>
          <td>${m ? (m.unlock ? "★ New skill" : "▲ Upgrade") : "?"}</td><td>${m ? esc(m.text) : "Not documented on the wiki yet"}</td></tr>`);
      } else if (UNIT_COMMON_LEVELS[lv]) {
        rows.push(`<tr class="common"><td>Lv ${lv}</td><td>+ Stat boost</td><td>${esc(UNIT_COMMON_LEVELS[lv])}</td></tr>`);
      }
    }
    return `<table class="data ms-table"><thead><tr><th>Level</th><th>Type</th><th>Effect</th></tr></thead><tbody>${rows.join("")}</tbody></table>`;
  }

  const skillList = (skills) => skills.length
    ? `<ul class="skills">${skills.map((s) => `<li><span class="kind ${s.kind}">${cap(s.kind)}</span><div><strong>${esc(s.name)}</strong><p>${esc(s.desc)}</p></div></li>`).join("")}</ul>`
    : `<p class="muted">No skill data on the wiki yet.</p>`;

  function immortalBlock(u) {
    const im = u.immortal;
    if (!im) return `<section class="imm-block"><h3>Immortal form</h3><p class="muted">This Mythic has no Immortal form listed on the wiki.</p></section>`;
    const stats = im.documented && im.atk ? `<div class="mini-stats">⚔ ${esc(im.atk)} · ⚡ ${esc(im.aspd)}</div>` : "";
    const lv = (im.lv6 || im.lv12) ? `<table class="data ms-table"><tbody>
        ${im.lv6 ? `<tr class="upgrade"><td>Lv 6</td><td>${esc(im.lv6)}</td></tr>` : ""}
        ${im.lv12 ? `<tr class="upgrade"><td>Lv 12</td><td>${esc(im.lv12)}</td></tr>` : ""}
      </tbody></table>` : "";
    return `<section class="imm-block">
      <h3>Immortal form</h3>
      <div class="unit-top">
        ${im.noImage
          ? (u.noImage ? `<span class="portrait gold" data-letter="${esc(im.name[0])}"></span>` : imgTag(u.id, im.name, null, "gold fallback"))
          : imgTag(im.id, im.name, u.id, "gold")}
        <div class="unit-id"><h4>${esc(im.name)} <span class="ko">${esc(im.ko)}</span></h4>${stats}</div>
      </div>
      ${im.how ? `<p><strong>How to summon in a match:</strong> ${esc(im.how)}</p>` : ""}
      ${im.skills ? skillList(im.skills) : ""}
      ${lv}
      ${!im.documented ? `<p class="muted small">The wiki only lists this Immortal's name so far. Stats and skills aren't documented yet.</p>` : ""}
      <p class="muted small">${esc(IMMORTAL_RULES.unlock)} Immortals level to 25. See the notes at the top of this page.</p>
    </section>`;
  }

  function openUnit(id) {
    const u = UNITS.find((x) => x.id === id);
    if (!u) return;
    body.innerHTML = `
      <div class="unit-top dlg-head">
        ${u.noImage ? `<span class="portrait big-portrait" data-letter="${esc(u.name[0])}"></span>` : imgTag(u.id, u.name, null, "big-portrait")}
        <div class="unit-id">
          <h2 id="unit-dialog-title">${esc(u.name)} <span class="ko">${esc(u.ko)}</span></h2>
          <div class="tags">${[u.type && cap(u.type), u.race, u.damage && cap(u.damage)].filter(Boolean).map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>
          <div class="mini-stats">Attack ${esc(u.atk)} · Attack speed ${esc(u.aspd)} <span class="muted">(at Lv 1; the number in brackets is the gain per in-match upgrade)</span></div>
          ${u.recipe ? `<div class="muted small">Recipe: ${esc(u.recipe)}</div>` : ""}
        </div>
      </div>
      ${u.note ? `<p class="note">${esc(u.note)}</p>` : ""}
      <h3>Level milestones</h3>
      ${timeline(u)}
      <p class="legend small"><span class="key unlock">★</span> New skill unlocked <span class="key upgrade">▲</span> Skill upgraded <span class="key small">+</span> Stat boost every unit gets</p>
      ${milestoneRows(u)}
      <h3>Skills</h3>
      ${skillList(u.skills)}
      ${immortalBlock(u)}
      <p class="muted small">Source: <a href="${UNIT_SOURCE.url}" target="_blank" rel="noopener">${UNIT_SOURCE.name}</a>, page last edited ${esc(u.updated)}${!is2026(u) ? " (before 2026, so check it in-game)" : ""}.</p>`;
    dlg.showModal();
    try { history.replaceState(null, "", "#" + u.id); } catch (e) {}
  }

  grid.addEventListener("click", (e) => {
    const c = e.target.closest(".unit-card");
    if (c) openUnit(c.dataset.id);
  });
  document.getElementById("unit-dialog-close").addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { try { history.replaceState(null, "", location.pathname); } catch (e) {} });

  document.getElementById("imm-unlock").textContent = IMMORTAL_RULES.unlock;
  document.getElementById("imm-stones").textContent = IMMORTAL_RULES.stones;
  document.getElementById("imm-limit").textContent = IMMORTAL_RULES.limitBreak;

  renderGrid();
  if (location.hash) openUnit(location.hash.slice(1));
})();
