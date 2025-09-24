let allData = [];
let currentSort = { column: null, asc: true };

async function loadSheetData() {
  const url = ""; // API URL
  const response = await fetch(url);
  const data = await response.json();
  allData = data;
  initFilters(data);
  renderTable(data);
}

function initFilters(data) {
  const weekSelect = document.getElementById("weekFilter");
  const teamSelect = document.getElementById("teamFilter");
  const posSelect = document.getElementById("posFilter");

  // Populate unique options
  const weeks = [...new Set(data.map(r => r["Week"]))].sort();
  const teams = [...new Set(data.map(r => r["Team"]))].sort();
  const positions = [...new Set(data.map(r => r["Pos"]))].sort();

  weekSelect.innerHTML = `<option value="">All</option>` + weeks.map(w => `<option value="${w}">${w}</option>`).join("");
  teamSelect.innerHTML = `<option value="">All</option>` + teams.map(t => `<option value="${t}">${t}</option>`).join("");
  posSelect.innerHTML = `<option value="">All</option>` + positions.map(p => `<option value="${p}">${p}</option>`).join("");

  // Attach event listeners
  weekSelect.addEventListener("change", applyFilters);
  teamSelect.addEventListener("change", applyFilters);
  posSelect.addEventListener("change", applyFilters);
  document.getElementById("playerSearch").addEventListener("input", applyFilters);
}

function applyFilters() {
  const week = document.getElementById("weekFilter").value;
  const team = document.getElementById("teamFilter").value;
  const pos = document.getElementById("posFilter").value;
  const player = document.getElementById("playerSearch").value.toLowerCase();

  let filtered = allData.filter(row => {
    return (!week || row["Week"] == week) &&
           (!team || row["Team"] == team) &&
           (!pos || row["Pos"] == pos) &&
           (!player || row["Player Name"].toLowerCase().includes(player));
  });

  renderTable(filtered);
}

function renderTable(data) {
  const tbody = document.querySelector("#playerTable tbody");
  tbody.innerHTML = "";

  data.forEach(row => {
    let tr = document.createElement("tr");
    Object.keys(row).forEach(key => {
      if ([
        "Week","Player Name","Team","Pos","Snaps","Snap %","Touches","Opportunities","PPR points","% offense"
      ].includes(key)) {
        let td = document.createElement("td");
        td.textContent = row[key];
        if (key === "% offense") td.classList.add("percent-offense"); // highlight
        tr.appendChild(td);
      }
    });
    tbody.appendChild(tr);
  });

  attachSortHandlers();
}

function attachSortHandlers() {
  document.querySelectorAll("#playerTable th").forEach(th => {
    th.onclick = () => {
      const col = th.dataset.sort;
      sortTable(col);
    };
  });
}

function sortTable(column) {
  if (currentSort.column === column) {
    currentSort.asc = !currentSort.asc;
  } else {
    currentSort.column = column;
    currentSort.asc = true;
  }

  let sorted = [...allData].sort((a, b) => {
    let valA = a[column];
    let valB = b[column];

    // Convert to numbers if numeric
    if (!isNaN(valA) && !isNaN(valB)) {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    }

    if (valA < valB) return currentSort.asc ? -1 : 1;
    if (valA > valB) return currentSort.asc ? 1 : -1;
    return 0;
  });

  renderTable(sorted);
}

window.addEventListener("DOMContentLoaded", loadSheetData);
