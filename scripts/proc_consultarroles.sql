USE rinku
GO
IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarroles' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarroles
END
GO
CREATE PROCEDURE dbo.proc_consultarroles @idrol INT = 0

AS 
BEGIN 
	IF @idrol = 0
	BEGIN
		SELECT id_rol, des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles
		FROM dbo.roles (NOLOCK) 
	END 
	ELSE 
	BEGIN
		SELECT id_rol, des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles
		FROM dbo.roles (NOLOCK)  
		WHERE id_rol = @idrol
	END 
END