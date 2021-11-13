-- Stvaranje tablica za regije
CREATE TABLE region1 AS (
	SELECT 1 AS gid, 'Sjever' AS name, ST_Union(array_agg(geom)) AS geom
	FROM hrv_adm1
	WHERE gid IN (2, 5, 8, 9, 11, 15, 17, 21)
);
CREATE TABLE region2 AS (
	SELECT 2 AS gid, 'Istok' AS name, ST_Union(array_agg(geom)) AS geom
	FROM hrv_adm1
	WHERE gid IN (3, 12, 13, 18, 19)
);
CREATE TABLE region3 AS (
	SELECT 3 AS gid, 'Zapad' AS name, ST_Union(array_agg(geom)) AS geom
	FROM hrv_adm1
	WHERE gid IN (6, 7, 10, 14)
);
CREATE TABLE region4 AS (
	SELECT 4 AS gid, 'Jug' AS name, ST_Union(array_agg(geom)) AS geom
	FROM hrv_adm1
	WHERE gid IN (1, 4, 16, 20)
);

-- Promjena SRID-a
SELECT UpdateGeometrySRID('region1', 'geom', 3765);
SELECT UpdateGeometrySRID('region2', 'geom', 3765);
SELECT UpdateGeometrySRID('region3', 'geom', 3765);
SELECT UpdateGeometrySRID('region4', 'geom', 3765);


/*
Način na koji sam stvorio regije je da sam za svaku regiju stvorio novu tablicu
koja se sastoji od odabranih župnaija koje čine tu regiju.
Geometrije tih županija sam pretvorio u polje funkcijom array_agg koje zatim 
proslijedim funkciju ST_Union koja stvori novu geometriju koja je unija svih županija.
Kod odabira koja županija spada u koju regiju samo su grupirane susjedne županije.
Nakon toga samo sam prikazao te regije kao slojeve u alatu qGis.

Kako bi osigurali da su regije približne površine?
Prvo što mi pada na pamet je napraviti skriptu koja će na brute-force način isprobati
sve kombinacije regija te odabrati onu kombinaciju regija gdje su površine najsličnije.
*/
