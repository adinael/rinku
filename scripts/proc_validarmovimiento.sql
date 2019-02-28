IF EXISTS( SELECT * from sys.objects where name = 'proc_validarmovimiento' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_validarmovimiento
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_validarmovimiento @idempleado INT, @diatrabajo DATE
AS 
BEGIN 
	SELECT id_movimiento,num_entregas 
	FROM dbo.ctl_movimientos (NOLOCK) 
	WHERE id_empleado = @idempleado 
		AND fec_diatrabajado = @diatrabajo
END 
GO