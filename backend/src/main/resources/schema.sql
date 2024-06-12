CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS revenue;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS customers;

CREATE TABLE IF NOT EXISTS customers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL
);
DROP TYPE IF EXISTS e_status;
CREATE TYPE e_status AS ENUM ('paid', 'pending');

CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY UNIQUE,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status e_status NOT NULL,
    processing_date DATE NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE IF NOT EXISTS revenues (
    month_name VARCHAR(4) NOT NULL UNIQUE,
    revenue INT NOT NULL
);