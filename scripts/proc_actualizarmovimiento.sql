IF EXISTS( SELECT * FROM sys.objects WHERE NAME = 'proc_actualizarmovimiento' AND TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_actualizarmovimiento
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO
CREATE PROCEDURE dbo.proc_actualizarmovimiento @idmovimiento INT, @numentregas INT, @idrolcubre INT
AS 
BEGIN 
	SET NOCOUNT ON
	UPDATE dbo.ctl_movimientos 
	SET 
		num_entregas = @numentregas,
		id_rolcubre = @idrolcubre
	WHERE id_movimiento = @idmovimiento
	
	SELECT 1 
END
GO