
IF EXISTS( SELECT * FROM sys.objects WHERE NAME = 'proc_consultarnominaempleados' AND TYPE = 'P' ) 
BEGIN 
	DROP PROC dbo.proc_consultarnominaempleados
END
GO
SET QUOTED_IDENTIFIER OFF
GO
SET ANSI_NULLS ON
GO
CREATE PROCEDURE [dbo].[proc_consultarnominaempleados] @anio smallint, @mes tinyint, @idempleado INT = 0
WITH EXECUTE AS OWNER  
AS
BEGIN
	SET NOCOUNT ON
	IF OBJECT_ID('tempdb.dbo.#tmpnominaempleados', 'U') IS NOT NULL
		DROP TABLE #tmpnominaempleados
	
	CREATE TABLE #tmpnominaempleados
	(
		id_empleado INT NOT NULL DEFAULT 0,
		des_nombre VARCHAR(100) NOT NULL DEFAULT '',
		des_rol VARCHAR(50) NOT NULL DEFAULT '',
		num_diastrabajados INT NOT NULL DEFAULT 0,
		num_totalentregas INT NOT NULL DEFAULT 0,
		imp_sueldobase DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_adicionalporentrega DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_bonoporhoras DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_sueldo DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_isr DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_sueldoneto DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_isradicional DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_sueldototal DECIMAL(10,2) NOT NULL DEFAULT 0,
		imp_valedespensa DECIMAL(10,2) NOT NULL DEFAULT 0,
	)
	
    INSERT INTO #tmpnominaempleados (id_empleado,des_nombre, des_rol, num_diastrabajados, num_totalentregas, imp_sueldobase, imp_adicionalporentrega )
    SELECT  e.id_empleado														  AS id_empleado,
            e.des_nombre + ' '+ e.des_apellido                                    AS des_nombre,
            r.des_rol															  AS des_rol,
            COUNT(m.fec_diatrabajado)											  AS num_diastrabajados,
            SUM(m.num_entregas)													  AS num_totalentregas, 
            COUNT(m.fec_diatrabajado) * r.num_horaslaborales * r.imp_sueldobase   AS imp_sueldobase,
            SUM(m.num_entregas)* r.imp_entregacliente							  AS imp_adicionalporentrega

    FROM dbo.ctl_movimientos m(NOLOCK) 
    JOIN dbo.cat_empleados e(NOLOCK) 
        ON(m.id_empleado = e.id_empleado) 
    JOIN dbo.cat_roles r(NOLOCK) 
        ON(e.id_rol = r.id_rol) 
    JOIN dbo.cat_tipoempleados t(NOLOCK)
        ON(t.id_tipo = e.id_tipo)
    WHERE
        YEAR(m.fec_diatrabajado) = @anio 
        AND  MONTH(m.fec_diatrabajado) = @mes
    GROUP BY e.id_empleado, e.des_nombre, e.des_apellido,r.des_rol, r.imp_sueldobase, r.num_horaslaborales, r.imp_entregacliente

    --se calcula los bonos por hora
    UPDATE  t
    SET imp_bonoporhoras = a.imp_bonoporhoras
    FROM #tmpnominaempleados t
    JOIN (
        SELECT b.id_empleado, SUM(b.imp_bonoporhora) as imp_bonoporhoras
        FROM (
            SELECT  m.id_empleado,
            COUNT(m.fec_diatrabajado) * c.num_horaslaborales * c.imp_bonoextra   AS imp_bonoporhora
            FROM dbo.ctl_movimientos m(NOLOCK) 
            JOIN dbo.cat_roles c(NOLOCK) 
                ON(m.id_rolcubre = c.id_rol) 
            WHERE
                YEAR(m.fec_diatrabajado) = @anio 
                AND  MONTH(m.fec_diatrabajado) = @mes
            GROUP BY m.id_empleado, c.num_horaslaborales,c.imp_bonoextra
    ) b
    GROUP BY b.id_empleado ) a
    ON a.id_empleado = t.id_empleado

    --se calcula el sueldo, el isr y el sueldo menos el isr 
    UPDATE  t
    SET imp_sueldo = imp_bonoporhoras + imp_adicionalporentrega + imp_sueldobase,
        imp_isr = (imp_bonoporhoras + imp_adicionalporentrega + imp_sueldobase) * i.prc_isr / 100,
        imp_sueldoneto = imp_bonoporhoras + imp_adicionalporentrega + imp_sueldobase - (imp_bonoporhoras + imp_adicionalporentrega + imp_sueldobase) * i.prc_isr / 100
    FROM #tmpnominaempleados t
    CROSS JOIN dbo.cat_impuestos i

    --se agrega el isr adicional 
    UPDATE  t
    SET imp_isradicional = imp_sueldoneto * i.prc_isradicional / 100
    FROM #tmpnominaempleados t
    CROSS JOIN dbo.cat_impuestos i
    WHERE t.imp_sueldoneto > i.imp_salarioisradicional

    --se calcula el sueldo total 
    UPDATE  t
    SET imp_sueldototal = imp_sueldoneto - imp_isradicional
    FROM #tmpnominaempleados t

    --se agrega los vales de despensa 
    UPDATE  t
    SET imp_valedespensa = imp_sueldo * c.prc_valesdespensa / 100 
    FROM #tmpnominaempleados t 
    JOIN dbo.cat_empleados e
    ON(e.id_empleado = t.id_empleado) 
    JOIN dbo.cat_tipoempleados c (NOLOCK) 
        ON(e.id_tipo = c.id_tipo) 
IF(@idempleado = 0)        
BEGIN 
    SELECT id_empleado ,
            des_nombre,
            des_rol ,
            num_diastrabajados ,
            num_totalentregas ,
            imp_sueldobase,
            imp_adicionalporentrega ,
            imp_bonoporhoras ,
            imp_sueldo ,
            imp_isr,
            imp_sueldoneto ,
            imp_isradicional ,
            imp_sueldototal,
            imp_valedespensa,
            imp_sueldototal + imp_valedespensa as imp_totalpagar
    FROM #tmpnominaempleados
    END 
    ELSE 
    BEGIN 
        SELECT id_empleado ,
            des_nombre,
            des_rol ,
            num_diastrabajados ,
            num_totalentregas ,
            imp_sueldobase,
            imp_adicionalporentrega ,
            imp_bonoporhoras ,
            imp_sueldo ,
            imp_isr,
            imp_sueldoneto ,
            imp_isradicional ,
            imp_sueldototal,
            imp_valedespensa,
            imp_sueldototal + imp_valedespensa as imp_totalpagar
    FROM #tmpnominaempleados
    WHERE id_empleado = @idempleado
    END 
END 
GO 