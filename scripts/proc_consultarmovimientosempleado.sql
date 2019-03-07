IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarmovimientoempleado' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarmovimientoempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultarmovimientoempleado @idempleado INT, @fecha DATE
AS 
BEGIN 
	SELECT a.num_entregas, a.id_rolcubre, b.des_rol, b.opc_cubreroles
	FROM dbo.ctl_movimientos a(NOLOCK) 
	JOIN dbo.cat_roles b(NOLOCK) 
	ON (a.id_rolcubre = b.id_rol)
	WHERE a.id_empleado = @idempleado 
		AND	a.fec_diatrabajado = @fecha
END 
GO