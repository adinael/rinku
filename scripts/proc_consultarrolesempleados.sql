IF EXISTS( SELECT * from sys.objects where name = 'proc_consultarrolesempleados' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarrolesempleados
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultarrolesempleados @idrolempleado INT = 0

AS 
BEGIN 
	SET NOCOUNT ON
	IF @idrolempleado = 0
	BEGIN
		SELECT id_rol, des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles 
		FROM cat_roles(NOLOCK) 
	END 
	ELSE 
	BEGIN
		SELECT id_rol, des_rol, imp_sueldobase, num_horaslaborales, imp_entregacliente, imp_bonoextra, opc_cubreroles 
		FROM cat_roles(NOLOCK)
		Where id_rol = @idrolempleado
	END 
END
GO