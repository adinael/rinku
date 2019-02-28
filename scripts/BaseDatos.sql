USE Nominarinku 

IF EXISTS( SELECT * from sys.objects where name = 'ctl_movimientos' and type = 'U' ) 
BEGIN 
	DROP TABLE dbo.ctl_movimientos
END
GO
CREATE TABLE ctl_movimientos 
(
    id_movimiento INT IDENTITY,
    id_empleado INT NOT NULL DEFAULT 0,
    fec_diatrabajado DATE NOT NULL DEFAULT '1900-01-01',
    num_entregas INT NOT NULL DEFAULT 0,
    id_empleadocubre INT NOT NULL DEFAULT 0,
    fec_movimiento SMALLDATETIME NOT NULL DEFAULT GETDATE()
)
GO
IF EXISTS( SELECT * from sys.objects where name = 'cat_empleados' and type = 'U' ) 
BEGIN 
	DROP TABLE dbo.cat_empleados
END
GO
CREATE TABLE cat_empleados(
    id_empleado INT IDENTITY(100,10),
	des_nombre VARCHAR(50) NOT NULL DEFAULT '',
	des_apellido VARCHAR(50) NOT NULL DEFAULT '',
	num_edad INT NOT NULL DEFAULT 0,
    id_rol INT NOT NULL DEFAULT 0,
    id_tipo INT NOT NULL DEFAULT 0
)
GO 
IF EXISTS( SELECT * from sys.objects where name = 'cat_roles' and type = 'U' ) 
BEGIN 
	DROP TABLE dbo.cat_roles
END
GO
CREATE TABLE cat_roles 
(
    id_rol INT  IDENTITY,
    des_rol VARCHAR (50) NOT NULL DEFAULT '',
    imp_sueldobase INT NOT NULL DEFAULT 0,
    num_horaslaborales INT NOT NULL DEFAULT 0,
    imp_entregacliente INT NOT NULL DEFAULT 0,
    imp_bonoextra INT NOT NULL DEFAULT 0, 
    opc_cubreroles BIT NOT NULL DEFAULT 0
)
GO 
IF EXISTS( SELECT * from sys.objects where name = 'cat_tipoempleados' and type = 'U' ) 
BEGIN 
	DROP TABLE dbo.cat_tipoempleados
END
GO
CREATE TABLE cat_tipoempleados
(
    id_tipo INT IDENTITY,
    des_tipoempleado VARCHAR(50) NOT NULL DEFAULT 0,
    prc_valesdespensa real NOT NULL DEFAULT 0 
)
GO 
IF EXISTS( SELECT * from sys.objects where name = 'cat_impuestos' and type = 'U' ) 
BEGIN 
	DROP TABLE dbo.cat_impuestos
END
GO
CREATE TABLE cat_impuestos
(
    prc_isr REAL NOT NULL DEFAULT 0,
    prc_isradicional REAL NOT NULL DEFAULT 0,
    imp_salarioisradicional INT NOT NULL DEFAULT 0
)
GO

 
ALTER TABLE cat_roles
	ADD CONSTRAINT pk_roles_id_rol
	PRIMARY KEY (id_rol)
GO

ALTER TABLE cat_empleados
	ADD CONSTRAINT pk_empleados_id_empleado
	PRIMARY KEY(id_empleado)
GO

ALTER TABLE cat_tipoempleados
	ADD CONSTRAINT pk_empleados_id_tipo
	PRIMARY KEY(id_tipo)

ALTER TABLE cat_empleados 
   ADD CONSTRAINT fk_tipoempleados
   FOREIGN KEY (id_tipo) 
   REFERENCES "cat_tipoempleados"(id_tipo)
GO

ALTER TABLE cat_empleados 
   ADD CONSTRAINT fk_roles
   FOREIGN KEY (id_rol) 
   REFERENCES "cat_roles"(id_rol);
   
ALTER TABLE ctl_movimientos 
   ADD CONSTRAINT fk_movimientos_empleados
   FOREIGN KEY (id_empleado) 
   REFERENCES "cat_empleados"(id_empleado);

INSERT INTO cat_roles(des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles)
VALUES('Chofer',30,8,5,10,'0'),
	  ('Cargador',30,8,5,5,'0'),
      ('Auxiliar',30,8,5,0,'1')
        
INSERT INTO cat_tipoempleados(des_tipoempleado, prc_valesdespensa)
VALUES('Interno',4),
 	  ('Externo', 0)
        
INSERT INTO cat_impuestos(prc_isr, prc_isradicional, imp_salarioisradicional)
VALUES(9,3,16000)