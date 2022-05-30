-- pronalaženje najbližih zgrada Savi, dijelom rijeke smatrajo sam i kanale
CREATE TABLE sava_closest_buildings AS (
	WITH sava_building_distances AS (
		SELECT b.*, ST_Distance(b.geom, s.geom) AS distance
		FROM river_sava s
		JOIN hrv_adm2 o ON ST_Intersects(s.geom, o.geom)
		JOIN buildings b ON ST_Intersects(o.geom, b.geom)
	)
	SELECT *
	FROM sava_building_distances
	ORDER BY distance ASC
);
SELECT UpdateGeometrySRID('sava_closest_buildings', 'geom', 3765);

-- pogled koji dohvaća najbližu zgradu
CREATE VIEW sava_closest_building AS (
	SELECT * FROM sava_closest_buildings ORDER BY distance ASC LIMIT 1
);

-- poplavljena Sava
CREATE TABLE river_sava_buffered AS (
	SELECT gid, 
		ST_Buffer(geom, (SELECT distance FROM sava_closest_building), 'endcap=round join=round') AS geom
	FROM river_sava
);
SELECT UpdateGeometrySRID('river_sava_buffered', 'geom', 3765);

-- udaljenost najbliže zgrade
SELECT distance FROM sava_closest_building;

/*
Udaljenost najbliže zgrade do Save je 16.98514243184114 metara.
Ako zaokružimo, Sava bi se trebala izliti 17 metara da barem jedna zgrada bude pogođena.

S velikom količinom podataka sam se nosio na način da prvo pronađem općine kroz koje rijeka prolazi,
nakon toga gledao sam samo zgrade u tim općinama i za te zgrade izračunao udaljenost do rijeke.
Nakon toga preostaje samo pogledati koja od tih zgrada ima najmanju udaljenost do rijeke. 
*/
