IF EXISTS( SELECT name FROM sysobjects WHERE name = 'proc_eliminarempleado' and TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_eliminarempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE proc_eliminarempleado @idempleado INT = 0
AS 
BEGIN 
	SET NOCOUNT ON
	
	DELETE FROM dbo.ctl_movimientos 
	WHERE id_empleado = @idempleado
	
	DELETE FROM dbo.cat_empleados
	WHERE id_empleado = @idempleado
END
GO 