IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarmovimientos' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarmovimientos
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultarmovimientos @idempleado INT, @anio INT, @mes INT 
AS 
BEGIN 
	SELECT id_movimiento,a.id_empleado, CONVERT(VARCHAR, a.fec_diatrabajado, 103) as fec_diatrabajado, a.num_entregas, b.des_nombre,b.des_apellido, c.des_rol
	FROM dbo.ctl_movimientos a(NOLOCK) 
	JOIN cat_empleados b(NOLOCK) 
	ON(a.id_empleado = b.id_empleado )
	JOIN dbo.cat_roles (NOLOCK) c
	ON(a.id_rolcubre = c.id_rol) 
	WHERE a.id_empleado = @idempleado 
		AND YEAR(a.fec_diatrabajado) = @anio
		AND MONTH(a.fec_diatrabajado) = @mes
	ORDER BY fec_diatrabajado
END 
GO