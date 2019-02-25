IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarempleado' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarempleado
END
GO
CREATE PROCEDURE proc_consultarempleado @idempleado int 
AS 
BEGIN 
	SELECT a.id_empleado, a.des_nombre, a.des_apellido, a.num_edad, 
			a.id_rol, b.des_rol, a.id_tipo, c.des_tipoempleado
	FROM dbo.empleados a (NOLOCK) 
	JOIN dbo.roles b (NOLOCK) 
		ON(a.id_rol = b.id_rol) 
	JOIN dbo.tipoempleados c (NOLOCK) 
		ON (a.id_tipo = c.id_tipo) 
	WHERE id_empleado = @idempleado
END
GO 