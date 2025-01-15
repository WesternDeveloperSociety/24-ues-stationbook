CREATE DATABASE ues_stationbook;

USE ues_stationbook;

CREATE TABLE students (
	student_id 			INT(10) NOT NULL PRIMARY KEY,
    email 				VARCHAR(20) NOT NULL,
    first_name			VARCHAR(20) NOT NULL,
    last_name			VARCHAR(20) NOT NULL,
    nickname			VARCHAR(20),
    password_hash		VARCHAR(50) NOT NULL,
    points				INT(30),
    email_verified		BOOL NOT NULL,
    is_active 			BOOL NOT NULL,
    is_admin			BOOL NOT NULL,
    created_at			TIMESTAMP,
    updated_at			TIMESTAMP
	);
    
