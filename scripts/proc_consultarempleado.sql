IF EXISTS( SELECT name FROM sysobjects WHERE name = 'proc_consultarempleado' and TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE proc_consultarempleado @idempleado INT = 0
AS 
BEGIN 
	SET NOCOUNT ON
	
	IF(@idempleado = 0) 
	BEGIN 
		SELECT a.id_empleado, a.des_nombre, a.des_apellido, a.num_edad, 
				a.id_rol, b.des_rol, a.id_tipo, c.des_tipoempleado
		FROM dbo.cat_empleados a (NOLOCK) 
		JOIN dbo.cat_roles b (NOLOCK) 
			ON(a.id_rol = b.id_rol) 
		JOIN dbo.cat_tipoempleados c (NOLOCK) 
			ON (a.id_tipo = c.id_tipo) 
	END
	ELSE 
	BEGIN 
		SELECT a.id_empleado, a.des_nombre, a.des_apellido, a.num_edad, 
			a.id_rol, b.des_rol, a.id_tipo, c.des_tipoempleado
		FROM dbo.cat_empleados a (NOLOCK) 
		JOIN dbo.cat_roles b (NOLOCK) 
			ON(a.id_rol = b.id_rol) 
		JOIN dbo.cat_tipoempleados c (NOLOCK) 
			ON (a.id_tipo = c.id_tipo) 
		WHERE id_empleado = @idempleado
	END
END
GO 