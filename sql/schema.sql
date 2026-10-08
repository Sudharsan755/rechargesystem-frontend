-- ============================================
-- rechargesys: Neon Postgres schema + seed data
-- Paste this whole file into the Neon Console SQL Editor and run it once.
-- ============================================

DROP TABLE IF EXISTS recharges;
DROP TABLE IF EXISTS plans;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id       TEXT PRIMARY KEY,
  name     TEXT NOT NULL,
  phone    TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE plans (
  id       TEXT PRIMARY KEY,
  operator TEXT NOT NULL,
  price    INTEGER NOT NULL,
  data     TEXT NOT NULL,
  validity TEXT NOT NULL
);

CREATE TABLE recharges (
  id              TEXT PRIMARY KEY,
  mobile          TEXT NOT NULL,
  operator        TEXT NOT NULL,
  amount          INTEGER NOT NULL,
  "paymentMethod" TEXT NOT NULL,
  status          TEXT NOT NULL,
  date            TEXT NOT NULL,
  "userPhone"     TEXT NOT NULL
);

-- ============================================
-- Seed data migrated from your existing db.json
-- ============================================

-- USERS
INSERT INTO users (id, name, phone, password) VALUES ('gRPYi40dmzA', 'vijay', '0000000001', '1');
INSERT INTO users (id, name, phone, password) VALUES ('5zR02RgAY9U', 'Siva', '0000000002', '2');
INSERT INTO users (id, name, phone, password) VALUES ('4xrxEEFVqYo', 'ravi', '3333333333', '333');
INSERT INTO users (id, name, phone, password) VALUES ('xcRzX0eBQjo', 'Sudharsan', '9998887777', '987');
INSERT INTO users (id, name, phone, password) VALUES ('DoOjlqhERks', 'vijay', '0101010101', '01');

-- PLANS
INSERT INTO plans (id, operator, price, data, validity) VALUES ('H5-qO2RMK2A', 'Airtel', 299, '1.5GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('y7h7vb1INkU', 'Airtel', 379, '2GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('b2PVH6gidrU', 'Airtel', 579, '1.5GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('SyQ0JCYAfHw', 'Airtel', 649, '2GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('9sJ_SFFdkr8', 'Airtel', 859, '84 days', '1.5GB/day');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('VG9uXp3Z8Vc', 'Airtel', 979, '84 days', '2GB/day');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('5flIvKqdg3M', 'Airtel', 3599, '365 days', '2GB/day');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('Tz4wC67w-q4', 'Jio', 299, '1.5GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('_CsTft4t5eg', 'Jio', 349, '2GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('KTzXA8hrtx0', 'Jio', 579, '1.5GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('AY8IDX9aHc4', 'Jio', 629, '2GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('2Dj75Xjy3cA', 'Jio', 889, '1.5GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('lwllgXoZvls', 'Jio', 859, '2GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('HmkW3wbwY7w', 'Jio', 3599, '2GB/day', '365 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('ah_meLL0aHI', 'Vi', 349, '1.5GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('TcuL2y1Y38s', 'Vi', 365, '2GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('4Ea27mPpoKE', 'Vi', 579, '1.5GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('XE5uElSlp9I', 'Vi', 649, '2GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('idIlfhKVwlo', 'Vi', 859, '1.5GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('gNS5wxnlECc', 'Vi', 979, '2GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('bEmYqsBybRc', 'Vi', 3599, '2GB/day', '365 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('VSKI7m1CyTM', 'BSNL', 187, '1.5GB/day', '28 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('BQgZ2ySgwh4', 'BSNL', 199, '28 days', '2GB/day');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('F6bl7TMXJaE', 'BSNL', 329, '1.5GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('V8umJREDujc', 'BSNL', 379, '2GB/day', '56 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('3tPxcYPcXDg', 'BSNL', 485, '1.5GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('XRYUBVIT4Es', 'BSNL', 521, '2GB/day', '84 days');
INSERT INTO plans (id, operator, price, data, validity) VALUES ('rUxEAgHEFVI', 'BSNL', 2025, '2GB/day', '365 days');

-- RECHARGES
INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone") VALUES ('AV_474L5l1g', '9922334412', 'BSNL', 2025, 'UPI', 'Success', '4/18/2026, 4:23:58 PM', '0101010101');
INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone") VALUES ('kjFs_kOxk5A', '1221312112', 'Jio', 349, 'UPI', 'Success', '4/18/2026, 4:24:39 PM', '0000000002');
INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone") VALUES ('Jz1FLKdzOD0', '1221222222', 'Jio', 299, 'UPI', 'Success', '4/18/2026, 4:32:19 PM', '0000000001');
INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone") VALUES ('IIOHI8EYpKs', '3242324234', 'Vi', 979, 'UPI', 'Success', '4/18/2026, 5:38:54 PM', '9998887777');
INSERT INTO recharges (id, mobile, operator, amount, "paymentMethod", status, date, "userPhone") VALUES ('TfTpvOThWLc', '6576565765', 'Vi', 979, 'Card', 'Success', '4/18/2026, 5:39:29 PM', '9998887777');
