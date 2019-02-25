IF EXISTS( SELECT * FROM sys.objects WHERE NAME = 'proc_actualizarempleado' AND TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_actualizarempleado
END
GO
CREATE PROCEDURE dbo.proc_actualizarempleado @idempleado INT, @nombre VARCHAR(50), @apellido VARCHAR(50),
									 @edad INT, @idrol INT, @idtipo INT 
AS 
BEGIN 
	UPDATE dbo.empleados 
	SET 
		des_nombre = @nombre,
		des_apellido = @apellido,
		num_edad = @edad,
		id_rol = @idrol, 
		id_tipo = @idtipo
	WHERE id_empleado = @idempleado

END
GO 