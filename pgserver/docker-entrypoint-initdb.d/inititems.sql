DO $$ 
<<first_block>>
DECLARE
  counter integer := 0;
BEGIN 
	CREATE SEQUENCE if not exists items_id_seq;
	create table if not exists items(id int NOT NULL DEFAULT nextval('items_id_seq'), name varchar(100), description varchar(300));
	select count(*) into counter from items;
	IF (counter <= 0) THEN
	  insert into items(name, description)values('books','products of type books');
	END IF;

	CREATE SEQUENCE if not exists subitems_id_seq;
	create table if not exists subitems(id int NOT NULL DEFAULT nextval('subitems_id_seq'),itemid int, name varchar(100), description varchar(300));
	select count(*) into counter from subitems;
	IF (counter <= 0) THEN
	  insert into subitems(itemid, name, description)values(1, 'harry potter and the chamber of secretes','the 2th book of the HP saga. Not a great book, but ok');
	  insert into subitems(itemid, name, description)values(1, 'harry potter and the half blood prince','the 6th book of the HP saga. Great book');
	  insert into subitems(itemid, name, description)values(1, 'harry potter and the goblet of fire','the 4th book of the HP saga. Great book!');
	END IF;
	
END first_block $$;
