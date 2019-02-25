USE rinku 
CREATE TABLE empleados(
    id_empleado INT IDENTITY(100,10),
	des_nombre VARCHAR(50) NOT NULL DEFAULT '',
	des_apellido VARCHAR(50) NOT NULL DEFAULT '',
	num_edad INT NOT NULL DEFAULT 0,
    id_rol INT NOT NULL DEFAULT 0,
    id_tipo INT NOT NULL DEFAULT 0
)

CREATE TABLE roles 
(
    id_rol INT  IDENTITY,
    des_rol VARCHAR (50) NOT NULL DEFAULT '',
    imp_sueldobase INT NOT NULL DEFAULT 0,
    num_horaslaborales INT NOT NULL DEFAULT 0,
    imp_entregacliente INT NOT NULL DEFAULT 0,
    imp_bonoextra INT NOT NULL DEFAULT 0, 
    opc_cubreroles BIT NOT NULL DEFAULT 0
)

CREATE TABLE tipoempleados
(
    id_tipo INT IDENTITY,
    des_tipoempleado VARCHAR NOT NULL DEFAULT 0,
    prc_valesdespensa real NOT NULL DEFAULT 0 
)
 
CREATE TABLE impuestos
(
    prc_isr REAL NOT NULL DEFAULT 0,
    prc_isradicional REAL NOT NULL DEFAULT 0,
    imp_salarioisradicional INT NOT NULL DEFAULT 0
)

CREATE TABLE movimientos 
(
    id_movimiento INT IDENTITY,
    id_empleado INT NOT NULL DEFAULT 0,
    fec_fechamovimiento DATE NOT NULL DEFAULT '1900-01-01',
)
 
ALTER TABLE roles
	ADD CONSTRAINT pk_roles_id_rol
	PRIMARY KEY (id_rol)
GO

ALTER TABLE empleados
	ADD CONSTRAINT pk_empleados_id_empleado
	PRIMARY KEY(id_empleado)
GO

ALTER TABLE tipoempleados
	ADD CONSTRAINT pk_empleados_id_tipo
	PRIMARY KEY(id_tipo)

ALTER TABLE empleados 
   ADD CONSTRAINT fk_tipoempleados
   FOREIGN KEY (id_tipo) 
   REFERENCES "tipoempleados"(id_tipo)
GO

ALTER TABLE empleados 
   ADD CONSTRAINT fk_roles
   FOREIGN KEY (id_rol) 
   REFERENCES "roles"(id_rol);

INSERT INTO roles(des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles)
VALUES('Chofer',30,8,5,10,'0'),
	  ('Cargador',30,8,5,5,'0'),
      ('Auxiliar',30,8,5,0,'1')
        
INSERT INTO tipoempleados(des_tipoempleado, prc_valesdespensa)
VALUES('Interno',4),
 	  ('Externo', 0)
        
INSERT INTO impuestos(prc_isr, prc_isradicional, imp_salarioisradicional)
VALUES(9,3,16000)