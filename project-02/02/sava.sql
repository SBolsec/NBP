-- tablica za rijeku Savu, dijelom rijeke smatrao sam i kanale
CREATE TABLE river_sava AS (
	SELECT 1 AS gid, ST_Union(array_agg(geom)) AS geom
	FROM waterways
	WHERE fclass IN ('river', 'canal') AND LOWER(name) LIKE '%sava%'
);
SELECT UpdateGeometrySRID('river_sava', 'geom', 3765);

-- izracun duljine po regijama
SELECT r.name, SUM(ST_Length(ST_Intersection(s.geom, r.geom))) AS duljina
	FROM region1 r
	JOIN river_sava s ON ST_Intersects(s.geom, r.geom)
	GROUP BY r.name
UNION ALL
SELECT r.name, SUM(ST_Length(ST_Intersection(s.geom, r.geom))) AS duljina
	FROM region2 r
	JOIN river_sava s ON ST_Intersects(s.geom, r.geom)
	GROUP BY r.name
UNION ALL
SELECT r.name, SUM(ST_Length(ST_Intersection(s.geom, r.geom))) AS duljina
	FROM region3 r
	JOIN river_sava s ON ST_Intersects(s.geom, r.geom)
	GROUP BY r.name
UNION ALL
SELECT r.name, SUM(ST_Length(ST_Intersection(s.geom, r.geom))) AS duljina
	FROM region4 r
	JOIN river_sava s ON ST_Intersects(s.geom, r.geom)
	GROUP BY r.name;


/*
Rijeku Savu sam dobio tako da sam napravio uniju svih ntorki iz tablice 'waterways'
koje su rijeka ili kanal i u nazivu sadrže 'sava'.

Duljinu rijeke u regijama:
	- regija 1: 259488 metara
	- regija 2: 83106 metara
	- regija 3: 0 metara
	- regija 4: 0 metara

Pretragom na internetu dobivam da je duljina rijeke Save u Hrvatskoj 510 km.
Zbroj duljina koje dobivam sql upitima je 342.594 km.
Kada u qGis-u stavim rijeku Savu i regije, vidi se da se ne preklepaju,
odnosno rijeka je generalno malo juznije i istocnije od regija.
Mislim da se zbog toga ne poklapaju izračunate udaljenosti sa stvarnom duljinom.
*/
