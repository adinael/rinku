IF EXISTS( SELECT * from sys.objects where name = 'proc_consultartipoempleados' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultartipoempleados
END
GO
CREATE PROCEDURE dbo.proc_consultartipoempleados @idrol INT = 0

AS 
BEGIN 
	IF @idrol = 0
	BEGIN
		
	END 
	ELSE 
	BEGIN
		
	END 
END