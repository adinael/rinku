IF EXISTS( SELECT * from sys.objects where name = 'proc_grabarmovimiento' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_grabarmovimiento
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_grabarmovimiento @idempleado INT, @fecdiatrabajado DATE, @numentregas INT, @idrolcubre INT
AS 
BEGIN 
	SET NOCOUNT ON
	DELETE FROM dbo.ctl_movimientos
	WHERE id_empleado = @idempleado AND fec_diatrabajado = @fecdiatrabajado
	
	INSERT INTO dbo.ctl_movimientos (id_empleado, fec_diatrabajado, num_entregas, id_rolcubre)
	VALUES(@idempleado, @fecdiatrabajado, @numentregas, @idrolcubre)
	
	SELECT ISNULL(IDENT_CURRENT ('dbo.ctl_movimientos'),1) AS idmovimiento
END 
GO