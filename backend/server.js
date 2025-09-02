// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ---------------- STAFF ---------------- //
app.get('/api/staff', (req, res) => {
  db.query('SELECT * FROM staff', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/staff', (req, res) => {
  const { staffnumber, staffname, phoneno, lotnumber } = req.body;
  db.query(
    'INSERT INTO staff (staffnumber, staffname, phoneno, lotnumber) VALUES (?, ?, ?, ?)',
    [staffnumber, staffname, phoneno, lotnumber],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.delete('/api/staff/:staffnumber', (req, res) => {
  const { staffnumber } = req.params;
  db.query('DELETE FROM staff WHERE staffnumber = ?', [staffnumber], err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// ---------------- PARKING LOT ---------------- //
app.get('/api/parkinglot', (req, res) => {
  db.query('SELECT * FROM parkinglot', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/parkinglot', (req, res) => {
  const { lotnumber, numberofslots, staffnumber } = req.body;
  db.query(
    'INSERT INTO parkinglot (lotnumber, numberofslots, staffnumber) VALUES (?, ?, ?)',
    [lotnumber, numberofslots, staffnumber],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.delete('/api/parkinglot/:lotnumber', (req, res) => {
  const { lotnumber } = req.params;
  db.query('DELETE FROM parkinglot WHERE lotnumber = ?', [lotnumber], err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// ---------------- PARKING SLOT ---------------- //
app.get('/api/parkingslot', (req, res) => {
  db.query('SELECT * FROM parkingslot', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/parkingslot', (req, res) => {
  const { slotnumber, lotnumber } = req.body;
  db.query(
    'INSERT INTO parkingslot (slotnumber, lotnumber) VALUES (?, ?)',
    [slotnumber, lotnumber],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.delete('/api/parkingslot/:slotnumber', (req, res) => {
  const { slotnumber } = req.params;
  db.query('DELETE FROM parkingslot WHERE slotnumber = ?', [slotnumber], err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// ---------------- VEHICLES ---------------- //
app.get('/api/vehicles', (req, res) => {
  db.query('SELECT * FROM vehicles', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/vehicles', (req, res) => {
  const { vehiclenumber, customername, vehiclename } = req.body;
  db.query(
    'INSERT INTO vehicles (vehiclenumber, customername, vehiclename) VALUES (?, ?, ?)',
    [vehiclenumber, customername, vehiclename],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true, id: result.insertId });
    }
  );
});

app.delete('/api/vehicles/:vehiclenumber', (req, res) => {
  const { vehiclenumber } = req.params;
  db.query('DELETE FROM vehicles WHERE vehiclenumber = ?', [vehiclenumber], err => {
    if (err) throw err;
    res.json({ success: true });
  });
});

// ---------------- ALLOCATION ---------------- //
app.get('/api/allocation', (req, res) => {
  db.query('SELECT * FROM allocation', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/allocation', (req, res) => {
  const { vehiclenumber, slotnumber, checkintime, checkouttime } = req.body;
  db.query(
    'INSERT INTO allocation (vehiclenumber, slotnumber, checkintime, checkouttime) VALUES (?, ?, ?, ?)',
    [vehiclenumber, slotnumber, checkintime, checkouttime],
    (err, result) => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

app.delete('/api/allocation/:vehiclenumber/:slotnumber', (req, res) => {
  const { vehiclenumber, slotnumber } = req.params;
  db.query(
    'DELETE FROM allocation WHERE vehiclenumber = ? AND slotnumber = ?',
    [vehiclenumber, slotnumber],
    err => {
      if (err) throw err;
      res.json({ success: true });
    }
  );
});

// ---------------- START SERVER ---------------- //
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
