CREATE TABLE influence_30k AS (
	SELECT *
	FROM places
	WHERE fclass IN ('city', 'town', 'national_capital') AND population > 30000
);
SELECT UpdateGeometrySRID('influence_30k', 'geom', 3765);

/*
Napravio sam tablicu koja sadrži gradove s više od 30k stanovnika.
Nakon toga sam napravio sloj u qGIS-u iz te tablice.
Nakon toga:
    Izbornik Vector
    Geometry Tools
    Voronoi polygons
        Kao input layer odabrati prethodno napravljeni sloj
        Kliknuti Run
*/
