IF EXISTS( SELECT * from sys.objects where name = 'proc_grabarempleado' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_grabarempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_grabarempleado @nombre varchar(50), @apellido varchar(50),@edad int, @idrol int, @idtipo int 
WITH EXECUTE AS OWNER 									 

AS 
BEGIN 
	SET NOCOUNT ON
	
	INSERT INTO dbo.cat_empleados (des_nombre, des_apellido, num_edad,id_rol, id_tipo) 
	VALUES (@nombre, @apellido, @edad, @idrol, @idtipo) 
	
	SELECT ISNULL(IDENT_CURRENT ('dbo.cat_empleados'),100) AS numeroempleado
END
GO 