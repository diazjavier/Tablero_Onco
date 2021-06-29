----User: TableroCABA
----Passwd: 123456Aa

--CREATE DATABASE tablerocaba;

USE tablerocaba;

CREATE TABLE roles(
  idRol int(11) NOT NULL,
  descripcion  VARCHAR(100) NOT NULL,
  fCreacion timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE roles
  ADD PRIMARY KEY (idRol);

USE tablerocaba;

CREATE TABLE usuarios(
  idUsuario INT(11) NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(16) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  email varchar(100) NOT NULL,
  password VARCHAR(60) NOT NULL,
  idRol INT(11) NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT true,
  fCreacion timestamp NOT NULL DEFAULT current_timestamp,
  CONSTRAINT fk_rol FOREIGN KEY (idRol) REFERENCES roles(idRol),
  CONSTRAINT pk_usuario PRIMARY KEY (idUsuario)
);
