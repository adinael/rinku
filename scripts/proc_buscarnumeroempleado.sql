IF EXISTS( SELECT * FROM sys.objects WHERE NAME = 'proc_buscarnumeroempleado' AND TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_buscarnumeroempleado
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO
CREATE PROCEDURE dbo.proc_buscarnumeroempleado @idempleado VARCHAR (20) = ''
AS 
BEGIN 
	SET NOCOUNT ON
	SELECT id_empleado FROM dbo.cat_empleados (NOLOCK) 
	WHERE id_empleado like @idempleado + '%'
END
GO


EXEC dbo.proc_buscarnumeroempleado 15