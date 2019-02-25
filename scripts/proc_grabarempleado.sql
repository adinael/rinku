IF EXISTS( SELECT * from sys.objects where name = 'proc_grabarempleado' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_grabarempleado
END
GO
CREATE PROCEDURE dbo.proc_grabarempleado @nombre varchar(50), @apellido varchar(50),
									 @edad int, @idrol int, @idtipo int 
AS 
BEGIN 
	INSERT INTO dbo.empleados (des_nombre, des_apellido, num_edad,id_rol, id_tipo) 
	VALUES (@nombre, @apellido, @edad, @idrol, @idtipo) 
END
GO 