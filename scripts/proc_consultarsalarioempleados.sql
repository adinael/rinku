IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarsalarioempleados' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarsalarioempleados
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultarsalarioempleados @mes INT, @anio INT
AS 
BEGIN 
	SET NOCOUNT ON
	SELECT a.id_empleado, a.des_nombre, COUNT(a.id_empleado) 
	FROM dbo.empleados a (NOLOCK) 
	JOIN dbo.roles b (NOLOCK) 
		ON(a.id_rol = b.id_rol) 
	JOIN dbo.tipoempleados c (NOLOCK) 
		ON (a.id_tipo = c.id_tipo) 
	JOIN dbo.movimientos d(NOLOCK) 
		ON(d.id_empleado = a.id_empleado) 
	WHERE MONTH(d.fec_diatrabajado) = @mes AND YEAR(d.fec_diatrabajado) = @anio
	GROUP BY a.id_empleado, a.des_nombre
END
GO 