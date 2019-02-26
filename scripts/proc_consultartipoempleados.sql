IF EXISTS( SELECT * from sys.objects where name = 'proc_consultartipoempleados' and type = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultartipoempleados
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO

CREATE PROCEDURE dbo.proc_consultartipoempleados @idtipoempleado INT = 0

AS 
BEGIN 
	SET NOCOUNT ON
	IF @idtipoempleado = 0
	BEGIN
		SELECT id_tipo, des_tipoempleado, prc_valesdespensa
		FROM cat_tipoempleados(NOLOCK) 
	END 
	ELSE 
	BEGIN
		SELECT id_tipo, des_tipoempleado, prc_valesdespensa 
		FROM cat_tipoempleados(NOLOCK) 
		Where id_tipo = @idtipoempleado
	END 
END
GO