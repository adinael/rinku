IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarmovimientoporid' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarmovimientoporid
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultarmovimientoporid @idmovimiento INT
AS 
BEGIN 
	SELECT a.id_empleado, 
		b.des_nombre, 
		b.des_apellido, 
		c.des_rol, 
		d.des_tipoempleado, 
		c.id_rol, 
		c.opc_cubreroles,
		CONVERT(VARCHAR, a.fec_diatrabajado, 111) as fec_diatrabajado,
		a.num_entregas
	FROM dbo.ctl_movimientos a(NOLOCK) 
	JOIN cat_empleados b(NOLOCK) 
		ON(a.id_empleado = b.id_empleado )
	JOIN dbo.cat_roles (NOLOCK) c
		ON(a.id_rolcubre = c.id_rol)
	JOIN dbo.cat_tipoempleados d
		ON(d.id_tipo = b.id_tipo)
	WHERE a.id_movimiento = @idmovimiento
END 
GO