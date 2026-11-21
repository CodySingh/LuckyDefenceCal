/* Lucky Defense Calculator — shared logic. Needs data.js loaded first. */

const fmt = (n) => Math.round(n).toLocaleString("en-US");
const $ = (id) => document.getElementById(id);

function getUnitType(id) {
  return LD_DATA.units.find((u) => u.id === id);
}

/* Sum costs to go from `from` to `to` (inclusive of the step into `to`). */
function unitCost(type, from, to) {
  const steps = type.costs.filter((c) => c.toLevel > from && c.toLevel <= to);
  return {
    steps,
    amount: steps.reduce((s, c) => s + c.amount, 0),
    gold: steps.reduce((s, c) => s + c.gold, 0)
  };
}

function maxLevel(costs) {
  return costs[costs.length - 1].toLevel;
}

function fillLevelSelect(select, min, max, value) {
  select.innerHTML = "";
  for (let l = min; l <= max; l++) {
    const o = document.createElement("option");
    o.value = l;
    o.textContent = "Lv " + l;
    select.appendChild(o);
  }
  select.value = String(Math.min(Math.max(value, min), max));
}

function verifiedBadge(verified, source) {
  return verified
    ? `<span class="badge ok" title="${source}">Verified 2026</span>`
    : `<span class="badge warn" title="${source}">Not yet verified for 2026</span>`;
}

function safeStorage(fn, fallback) {
  try { return fn(); } catch (e) { return fallback; }
}

/* ---------------- Unit calculator ---------------- */

function initUnitCalculator() {
  const typeSel = $("unit-type");
  if (!typeSel) return;
  const fromSel = $("unit-from");
  const toSel = $("unit-to");
  const ownAmt = $("own-amount");
  const ownGold = $("own-gold");

  LD_DATA.units.forEach((u) => {
    const o = document.createElement("option");
    o.value = u.id;
    o.textContent = u.name;
    typeSel.appendChild(o);
  });

  function resetLevels() {
    const t = getUnitType(typeSel.value);
    const max = maxLevel(t.costs);
    fillLevelSelect(fromSel, 1, max - 1, Number(fromSel.value) || 1);
    fillLevelSelect(toSel, 2, max, Number(toSel.value) || max);
  }

  function render() {
    const t = getUnitType(typeSel.value);
    let from = Number(fromSel.value);
    let to = Number(toSel.value);
    if (to <= from) {
      to = from + 1;
      toSel.value = String(to);
    }
    const c = unitCost(t, from, to);
    const haveAmt = Math.max(0, Number(ownAmt.value) || 0);
    const haveGold = Math.max(0, Number(ownGold.value) || 0);
    const needAmt = Math.max(0, c.amount - haveAmt);
    const needGold = Math.max(0, c.gold - haveGold);

    $("res-label").textContent = t.resource;
    $("own-amount-label").textContent = t.resource + " you have";
    $("unit-badge").innerHTML = verifiedBadge(t.verified, t.source);
    $("unit-source").textContent = "Source: " + t.source;

    $("unit-total").innerHTML = `
      <div class="stat"><span class="stat-label">${t.resource}</span><span class="stat-value">${fmt(c.amount)}</span></div>
      <div class="stat"><span class="stat-label">Gold</span><span class="stat-value">${fmt(c.gold)}</span></div>`;

    const done = needAmt === 0 && needGold === 0 && (haveAmt > 0 || haveGold > 0);
    $("unit-need").innerHTML = done
      ? `<p class="ready">You have enough to reach Lv ${to}!</p>`
      : `<div class="stat"><span class="stat-label">${t.resource} still needed</span><span class="stat-value need">${fmt(needAmt)}</span></div>
         <div class="stat"><span class="stat-label">Gold still needed</span><span class="stat-value need">${fmt(needGold)}</span></div>`;

    let running = 0, runningGold = 0;
    $("unit-breakdown").innerHTML = c.steps.map((s) => {
      running += s.amount;
      runningGold += s.gold;
      const reachable = running <= haveAmt && runningGold <= haveGold;
      return `<tr class="${reachable ? "reachable" : ""}">
        <td>Lv ${s.toLevel - 1} → ${s.toLevel}</td>
        <td>${fmt(s.amount)}</td><td>${fmt(s.gold)}</td>
        <td>${fmt(running)}</td><td>${fmt(runningGold)}</td></tr>`;
    }).join("");

    // Highest level reachable with what the player owns
    let reach = from, a = 0, g = 0;
    for (const s of t.costs.filter((x) => x.toLevel > from)) {
      if (a + s.amount > haveAmt || g + s.gold > haveGold) break;
      a += s.amount; g += s.gold; reach = s.toLevel;
    }
    $("unit-reach").textContent = (haveAmt || haveGold)
      ? `With what you have, you can reach Lv ${reach}.`
      : "";
  }

  typeSel.addEventListener("change", () => { resetLevels(); render(); });
  [fromSel, toSel].forEach((el) => el.addEventListener("change", render));
  [ownAmt, ownGold].forEach((el) => el.addEventListener("input", render));

  document.querySelectorAll("[data-target]").forEach((btn) =>
    btn.addEventListener("click", () => {
      const target = Number(btn.dataset.target);
      if (Number(fromSel.value) >= target) fromSel.value = "1";
      toSel.value = String(target);
      render();
    })
  );

  $("add-plan").addEventListener("click", () => {
    const t = getUnitType(typeSel.value);
    const from = Number(fromSel.value), to = Number(toSel.value);
    const label = $("unit-name").value.trim() || t.name + " unit";
    plan.push({ label, typeId: t.id, from, to });
    savePlan();
    renderPlan();
    $("unit-name").value = "";
  });

  resetLevels();
  render();
}

/* ---------------- Upgrade plan (several units) ---------------- */

let plan = [];

function savePlan() {
  safeStorage(() => localStorage.setItem("ld-plan", JSON.stringify(plan)));
}

function loadPlan() {
  plan = safeStorage(() => JSON.parse(localStorage.getItem("ld-plan")) || [], []);
  plan = plan.filter((p) => getUnitType(p.typeId));
}

function renderPlan() {
  const list = $("plan-list");
  if (!list) return;
  if (plan.length === 0) {
    list.innerHTML = `<li class="muted">No units yet. Set a unit above and press “Add to plan”.</li>`;
    $("plan-total").innerHTML = "";
    return;
  }
  let gold = 0;
  list.innerHTML = plan.map((p, i) => {
    const t = getUnitType(p.typeId);
    const c = unitCost(t, p.from, p.to);
    gold += c.gold;
    const resName = t.resource === "Duplicates" ? `${t.name} duplicates` : t.resource;
    return `<li><span><strong>${escapeHtml(p.label)}</strong> <span class="muted">${t.name} · Lv ${p.from} → ${p.to}</span></span>
      <span>${fmt(c.amount)} ${resName} · ${fmt(c.gold)} gold
      <button class="icon-btn" data-remove="${i}" aria-label="Remove">✕</button></span></li>`;
  }).join("");

  // Duplicates are per-unit, so total them by rarity instead of lumping together
  const byRes = {};
  plan.forEach((p) => {
    const t = getUnitType(p.typeId);
    const key = t.resource === "Duplicates" ? `${t.name} duplicates` : t.resource;
    byRes[key] = (byRes[key] || 0) + unitCost(t, p.from, p.to).amount;
  });
  $("plan-total").innerHTML =
    Object.entries(byRes).map(([k, v]) =>
      `<div class="stat"><span class="stat-label">${k}</span><span class="stat-value">${fmt(v)}</span></div>`).join("") +
    `<div class="stat"><span class="stat-label">Gold</span><span class="stat-value">${fmt(gold)}</span></div>`;

  list.querySelectorAll("[data-remove]").forEach((b) =>
    b.addEventListener("click", () => {
      plan.splice(Number(b.dataset.remove), 1);
      savePlan();
      renderPlan();
    })
  );
}

function initPlan() {
  if (!$("plan-list")) return;
  loadPlan();
  $("clear-plan").addEventListener("click", () => { plan = []; savePlan(); renderPlan(); });
  renderPlan();
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* ---------------- Treasure calculator ---------------- */

/*
 * Probability distribution of attempts needed for one treasure level.
 * Success chance on attempt k (0-based) is rate + min(k, maxInc) * increment.
 * Returns array dist where dist[n] = P(success on exactly attempt n+1).
 */
function attemptDistribution(step, maxInc) {
  const dist = [];
  let survive = 1; // probability all previous attempts failed
  for (let k = 0; k < 5000 && survive > 1e-9; k++) {
    const p = Math.min(100, step.rate + Math.min(k, maxInc) * step.increment) / 100;
    dist.push(survive * p);
    survive *= 1 - p;
  }
  return dist;
}

function expectedAttempts(dist) {
  return dist.reduce((s, p, n) => s + p * (n + 1), 0);
}

function convolve(a, b) {
  const out = new Array(a.length + b.length - 1).fill(0);
  for (let i = 0; i < a.length; i++) {
    if (a[i] < 1e-12) continue;
    for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j];
  }
  return out;
}

/* Attempt count (total) at which cumulative probability reaches q. */
function quantile(dist, q, offset) {
  let c = 0;
  for (let n = 0; n < dist.length; n++) {
    c += dist[n];
    if (c >= q) return n + offset;
  }
  return dist.length - 1 + offset;
}

function initTreasureCalculator() {
  const fromSel = $("tr-from");
  if (!fromSel) return;
  const toSel = $("tr-to");
  const T = LD_DATA.treasure;
  const max = maxLevel(T.costs);
  fillLevelSelect(fromSel, 1, max - 1, 1);
  fillLevelSelect(toSel, 2, max, 6);
  $("tr-badge").innerHTML = verifiedBadge(T.verified, T.source);
  $("tr-source").textContent = "Source: " + T.source;

  function render() {
    const from = Number(fromSel.value);
    let to = Number(toSel.value);
    if (to <= from) { to = from + 1; toSel.value = String(to); }

    const steps = T.costs.filter((c) => c.toLevel > from && c.toLevel <= to);
    let expCoins = 0, expTickets = 0, expTries = 0;
    let total = [1]; // distribution of total attempts, index = attempts - steps.length
    const rows = steps.map((s) => {
      const d = attemptDistribution(s, T.maxIncrements);
      const e = expectedAttempts(d);
      expTries += e;
      expCoins += e * s.coins;
      expTickets += e * s.redTickets;
      total = convolve(total, d);
      const p90 = quantile(d, 0.9, 1);
      return `<tr><td>Lv ${s.toLevel - 1} → ${s.toLevel}</td><td>${s.rate}% (+${s.increment}%)</td>
        <td>${fmt(s.coins)}${s.redTickets ? " + " + s.redTickets + " 🎟" : ""}</td>
        <td>${e.toFixed(1)}</td><td>${p90}</td></tr>`;
    });
    $("tr-breakdown").innerHTML = rows.join("");

    // Worst-luck estimate: coins and tickets if total attempts hit the 90th percentile.
    // Attempts are spread across levels in the same ratio as the expected case.
    const p90Total = quantile(total, 0.9, steps.length);
    const scale = p90Total / expTries;

    $("tr-total").innerHTML = `
      <div class="stat"><span class="stat-label">Expected attempts</span><span class="stat-value">${expTries.toFixed(1)}</span></div>
      <div class="stat"><span class="stat-label">Expected coins</span><span class="stat-value">${fmt(expCoins)}</span></div>
      <div class="stat"><span class="stat-label">Expected red tickets</span><span class="stat-value">${expTickets.toFixed(1)}</span></div>`;
    $("tr-bad").innerHTML = `
      <div class="stat"><span class="stat-label">Attempts (90% done by)</span><span class="stat-value need">${p90Total}</span></div>
      <div class="stat"><span class="stat-label">≈ Coins</span><span class="stat-value need">${fmt(expCoins * scale)}</span></div>
      <div class="stat"><span class="stat-label">≈ Red tickets</span><span class="stat-value need">${Math.ceil(expTickets * scale)}</span></div>`;
  }

  [fromSel, toSel].forEach((el) => el.addEventListener("change", render));
  render();
}

/* ---------------- Tabs ---------------- */

function initTabs() {
  const tabs = document.querySelectorAll("[role=tab]");
  if (!tabs.length) return;
  const show = (id) => {
    tabs.forEach((t) => {
      const on = t.dataset.panel === id;
      t.setAttribute("aria-selected", on);
      $(t.dataset.panel).hidden = !on;
    });
    safeStorage(() => localStorage.setItem("ld-tab", id));
  };
  tabs.forEach((t) => t.addEventListener("click", () => show(t.dataset.panel)));
  const saved = safeStorage(() => localStorage.getItem("ld-tab"), null);
  show(saved && $(saved) ? saved : tabs[0].dataset.panel);
}

/* ---------------- Data tables (guide page) ---------------- */

function initDataTables() {
  const box = $("all-tables");
  if (!box) return;
  box.innerHTML = LD_DATA.units.map((u) => {
    const total = unitCost(u, 1, maxLevel(u.costs));
    return `<details>
      <summary>${u.name} <span class="muted">(${u.resource})</span> ${verifiedBadge(u.verified, u.source)}</summary>
      <table class="data"><thead><tr><th>Level</th><th>${u.resource}</th><th>Gold</th></tr></thead><tbody>
      ${u.costs.map((c) => `<tr><td>${c.toLevel - 1} → ${c.toLevel}</td><td>${fmt(c.amount)}</td><td>${fmt(c.gold)}</td></tr>`).join("")}
      <tr class="sum"><td>1 → ${maxLevel(u.costs)}</td><td>${fmt(total.amount)}</td><td>${fmt(total.gold)}</td></tr>
      </tbody></table><p class="muted small">Source: ${u.source}</p></details>`;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-version]").forEach((el) => (el.textContent = LD_DATA.latestKnownVersion));
  document.querySelectorAll("[data-reviewed]").forEach((el) => (el.textContent = LD_DATA.lastReviewed));
  initTabs();
  initUnitCalculator();
  initPlan();
  initTreasureCalculator();
  initDataTables();
});
