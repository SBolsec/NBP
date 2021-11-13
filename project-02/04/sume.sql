-- tablica sa izracunatim povrsinama suma za svaku zupaniju
CREATE TABLE forests AS (
	SELECT c.gid, c.name_1 AS name, c.geom, SUM(ST_Area(ST_Intersection(c.geom, l.geom))) AS area
	FROM hrv_adm1 c
	JOIN landuse l ON l.fclass = 'forest' AND ST_Intersects(c.geom, l.geom)
	GROUP BY c.gid, c.name_1, c.geom
);

SELECT UpdateGeometrySRID('forests', 'geom', 3765);


/*
Napravio sam tablicu sa izracunatim povrsina suma za svaku zupaniju.
Zatim sam u qGIS-u napravio sloj iz te tablice.
Na tom sloju sam u Symbology tabu promijenio kategoriju sa 'Single symbol' na 'Graduated'.
Nakon toga sam za value odabrao izracunatu povrsinu, podesio gradijent boja te u 'Clases'
odabrao 21 klasa, tako da svaka zupanija dobije svoju boju.
*/
