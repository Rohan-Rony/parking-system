const API = "http://localhost:5000/api";

// ---------- Utility to render rows ----------
function renderTable(tableId, data, cols, deleteFn) {
  const tbody = document.querySelector(`#${tableId} tbody`);
  tbody.innerHTML = "";
  data.forEach(row => {
    const tr = document.createElement("tr");
    cols.forEach(col => {
      const td = document.createElement("td");
      td.textContent = row[col];
      tr.appendChild(td);
    });
    const actionTd = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("deleteBtn");
    delBtn.onclick = () => deleteFn(row);
    actionTd.appendChild(delBtn);
    tr.appendChild(actionTd);
    tbody.appendChild(tr);
  });
}

// ---------- Staff ----------
function loadStaff() {
  fetch(`${API}/staff`).then(r => r.json()).then(data => {
    renderTable("staffTable", data, ["staffnumber","staffname","phoneno","lotnumber"], (row) => {
      fetch(`${API}/staff/${row.staffnumber}`, { method:"DELETE" })
        .then(() => loadStaff());
    });
  });
}
document.querySelector("#staffForm").onsubmit = e => {
  e.preventDefault();
  const body = {
    staffnumber: staffnumber.value,
    staffname: staffname.value,
    phoneno: phoneno.value,
    lotnumber: lotnumber.value
  };
  fetch(`${API}/staff`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)})
    .then(() => { loadStaff(); e.target.reset(); });
};

// ---------- Parking Lot ----------
function loadParkingLot() {
  fetch(`${API}/parkinglot`).then(r => r.json()).then(data => {
    renderTable("parkinglotTable", data, ["lotnumber","numberofslots","staffnumber"], (row) => {
      fetch(`${API}/parkinglot/${row.lotnumber}`, { method:"DELETE" })
        .then(() => loadParkingLot());
    });
  });
}
document.querySelector("#parkinglotForm").onsubmit = e => {
  e.preventDefault();
  const body = {
    lotnumber: lotnumberLot.value,
    numberofslots: numberofslots.value,
    staffnumber: staffnumberLot.value
  };
  fetch(`${API}/parkinglot`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)})
    .then(() => { loadParkingLot(); e.target.reset(); });
};

// ---------- Parking Slot ----------
function loadParkingSlot() {
  fetch(`${API}/parkingslot`).then(r => r.json()).then(data => {
    renderTable("parkingslotTable", data, ["slotnumber","lotnumber"], (row) => {
      fetch(`${API}/parkingslot/${row.slotnumber}`, { method:"DELETE" })
        .then(() => loadParkingSlot());
    });
  });
}
document.querySelector("#parkingslotForm").onsubmit = e => {
  e.preventDefault();
  const body = {
    slotnumber: slotnumber.value,
    lotnumber: lotnumberSlot.value
  };
  fetch(`${API}/parkingslot`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)})
    .then(() => { loadParkingSlot(); e.target.reset(); });
};

// ---------- Vehicles ----------
function loadVehicles() {
  fetch(`${API}/vehicles`).then(r => r.json()).then(data => {
    renderTable("vehicleTable", data, ["vehiclenumber","customername","vehiclename"], (row) => {
      fetch(`${API}/vehicles/${row.vehiclenumber}`, { method:"DELETE" })
        .then(() => loadVehicles());
    });
  });
}
document.querySelector("#vehicleForm").onsubmit = e => {
  e.preventDefault();
  const body = {
    vehiclenumber: vehiclenumber.value,
    customername: customername.value,
    vehiclename: vehiclename.value
  };
  fetch(`${API}/vehicles`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)})
    .then(() => { loadVehicles(); e.target.reset(); });
};

// ---------- Allocation ----------
function loadAllocation() {
  fetch(`${API}/allocation`).then(r => r.json()).then(data => {
    renderTable("allocationTable", data, ["vehiclenumber","slotnumber","checkintime","checkouttime"], (row) => {
      fetch(`${API}/allocation/${row.vehiclenumber}/${row.slotnumber}`, { method:"DELETE" })
        .then(() => loadAllocation());
    });
  });
}
document.querySelector("#allocationForm").onsubmit = e => {
  e.preventDefault();
  const body = {
    vehiclenumber: vehiclenumberAlloc.value,
    slotnumber: slotnumberAlloc.value,
    checkintime: checkintime.value,
    checkouttime: checkouttime.value
  };
  fetch(`${API}/allocation`, { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(body)})
    .then(() => { loadAllocation(); e.target.reset(); });
};

// ---------- Initial Load ----------
loadStaff();
loadParkingLot();
loadParkingSlot();
loadVehicles();
loadAllocation();
