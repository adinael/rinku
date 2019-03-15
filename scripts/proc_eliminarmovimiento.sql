IF EXISTS( SELECT name FROM sysobjects WHERE name = 'proc_eliminarmovimiento' and TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_eliminarmovimiento
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE proc_eliminarmovimiento @idmovimiento INT = 0
AS 
BEGIN 
	SET NOCOUNT ON
	
	DELETE FROM dbo.ctl_movimientos 
	WHERE id_movimiento = @idmovimiento
	
END
GO 