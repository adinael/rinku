IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarsiguientenumeroempleado' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarsiguientenumeroempleado
END
GO
CREATE PROCEDURE dbo.proc_consultarsiguientenumeroempleado 
AS 
BEGIN 
	 
	SELECT ISNULL(IDENT_CURRENT ('dbo.cat_empleados'),90) + 10 AS numeroempleado;  
END
GO 