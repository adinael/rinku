IF EXISTS( SELECT * FROM sys.objects WHERE NAME = 'proc_actualizarempleado' AND TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_actualizarempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO
CREATE PROCEDURE dbo.proc_actualizarempleado @idempleado INT, @nombre VARCHAR(50), @apellido VARCHAR(50),
									 @idrol INT, @idtipo INT 
AS 
BEGIN 
	SET NOCOUNT ON
	UPDATE dbo.cat_empleados 
	SET 
		des_nombre = @nombre,
		des_apellido = @apellido,
		id_rol = @idrol, 
		id_tipo = @idtipo
	WHERE id_empleado = @idempleado
	
	SELECT a.id_empleado, a.des_nombre, a.des_apellido,
		a.id_rol, b.des_rol, a.id_tipo, c.des_tipoempleado
	FROM dbo.cat_empleados a (NOLOCK) 
	JOIN dbo.cat_roles b (NOLOCK) 
		ON(a.id_rol = b.id_rol) 
	JOIN dbo.cat_tipoempleados c (NOLOCK) 
		ON (a.id_tipo = c.id_tipo) 
	WHERE id_empleado = @idempleado
END
GO