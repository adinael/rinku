IF EXISTS( SELECT * from sys.objects where name = 'proc_grabarmovimiento' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_grabarmovimiento
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_grabarmovimiento @idempleado INT, @diatrabajo DATE, @numentregas INT, @idempleadocubre INT
AS 
BEGIN 
	SET NOCOUNT ON
	INSERT INTO dbo.ctl_movimientos (id_empleado, fec_diatrabajado, num_entregas, id_empleadocubre)
	VALUES(@idempleado, @diatrabajo, @numentregas, @idempleadocubre)
END 
GO