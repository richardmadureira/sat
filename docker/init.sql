/*
CREATE SCHEMA sat;

CREATE USER sat with password 'sat00';
create database sat;
GRANT ALL PRIVILEGES ON DATABASE sat TO sat;
CREATE SEQUENCE sat.sq_pessoa INCREMENT BY 1 MINVALUE 1 NO MAXVALUE START WITH 1 CACHE 1 NO CYCLE;
CREATE TABLE sat.Pessoas (
    id BIGINT DEFAULT nextval('sat.sq_pessoa'::regclass) NOT NULL,
    nome VARCHAR(255) not null
);

CREATE TABLE sat.TesteTable (
    id BIGINT DEFAULT nextval('sat.sq_pessoa'::regclass) NOT NULL,
    nome VARCHAR(255) not null
);
*/

