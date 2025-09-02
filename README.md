# parking-system
host: localhost
user: root (I’ll assume, since you didn’t specify another)
password: 123
database: DBMS

Install Dependencies:
In the backend/ folder, run:
npm init -y
npm install express mysql2 cors body-parser


Here’s a clean, end-to-end run guide for your Parking Allocation System.

1) Prerequisites

Node.js + npm (LTS)

MySQL (running locally, port 3306)

MySQL user: root, password: 123

2) Project layout
parking-system/
│── backend/
│   ├── db.js
│   ├── server.js
│── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js


Make sure you’ve copied the code we wrote into these files exactly.

3) Create the database & tables

Open a terminal and run MySQL:

mysql -u root -p
# enter: 123


Then create DB and tables (paste the Final MySQL Queries I gave you earlier). At minimum:

CREATE DATABASE IF NOT EXISTS DBMS;
USE DBMS;

-- (Paste the full schema we finalized: staff, parkinglot, parkingslot, vehicles, allocation)

(Optional) Seed some sample data

Paste this to have something to see in the UI immediately:

USE DBMS;

INSERT INTO staff (staffnumber, staffname, phoneno, lotnumber) VALUES
('S001','Aarav Rao','9876500001','L01'),
('S002','Meera Shah','9876500002','L02');

INSERT INTO parkinglot (lotnumber, numberofslots, staffnumber) VALUES
('L01', 4, 'S001'),
('L02', 3, 'S002');

INSERT INTO parkingslot (slotnumber, lotnumber) VALUES
('SL01','L01'),('SL02','L01'),('SL03','L02'),('SL04','L02');

INSERT INTO vehicles (vehiclenumber, customername, vehiclename) VALUES
('KA01AB1234','Rohan Mehta','Honda City'),
('KA02CD5678','Priya Nair','Hyundai i20'),
('KA03EF9012','Vikram Iyer','Tata Nexon');

INSERT INTO allocation (vehiclenumber, slotnumber, checkintime, checkouttime) VALUES
('KA01AB1234','SL01','2025-08-31 09:00:00',NULL),
('KA02CD5678','SL03','2025-08-31 10:15:00','2025-08-31 12:00:00');

4) Install backend dependencies
cd parking-system/backend
npm init -y
npm install express mysql2 cors body-parser

5) Start the backend server

Make sure db.js has:

// host: localhost, user: root, password: 123, database: DBMS


Then run:

node server.js


You should see:

✅ Connected to MySQL Database: DBMS
🚀 Server running at http://localhost:5000

Quick API checks (optional)

Open in a browser: http://localhost:5000/api/staff

Or curl:

curl http://localhost:5000/api/vehicles

6) Open the frontend

Option A (simple): double-click parking-system/frontend/index.html to open in your browser.
Option B (recommended if your browser blocks file origins): serve it locally:

# from parking-system/frontend
npx http-server . -p 3000
# or: npx serve -l 3000


Then visit: http://localhost:3000

7) Use the app

On page load, it pulls data from the DB and populates all tables.

Use the forms to add Staff, Lots, Slots, Vehicles, and Allocations.

Use the Delete buttons to remove rows — this deletes them in the database too.

8) Troubleshooting

Port already in use: change const PORT = 5000; in server.js.

Access denied for user 'root'@'localhost': confirm password is 123 and MySQL is running.

ER_NO_DB_ERROR / unknown database: make sure you ran the CREATE DATABASE DBMS; and USE DBMS; steps.

CORS error: you’re likely opening index.html directly from the file system; either keep it (backend has cors() enabled) or use a static server (Option B above).
