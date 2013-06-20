# change @@schema@@ for current schema :)

# DROPS

alter table @@schema@@.task
	drop constraint task_category_fk;

alter table @@schema@@.team_resource
	drop constraint team_resource_team_fk;

alter table @@schema@@.team_resource
	drop constraint team_resource_resource_fk;

alter table @@schema@@.journey
	drop constraint journey_resource_fk;

alter table @@schema@@.journey
	drop constraint journey_task_fk;

alter table @@schema@@.resource
	drop constraint resource_pk;

alter table @@schema@@.task
	drop constraint task_pk;

alter table @@schema@@.task_category
	drop constraint task_category_pk;

alter table @@schema@@.team
	drop constraint team_pk;

alter table @@schema@@.team_resource
	drop constraint team_resource_pk;

alter table @@schema@@.journey
	drop constraint journey_pk;

drop table @@schema@@.resource;
drop table @@schema@@.task;
drop table @@schema@@.task_category;
drop table @@schema@@.team;
drop table @@schema@@.team_resource;
drop table @@schema@@.journey;

drop sequence @@schema@@.task_category_sequence;
drop sequence @@schema@@.journey_sequence;

# CREATES

#	SEQUENCES

create sequence @@schema@@.task_category_sequence;
create sequence @@schema@@.journey_sequence;

#	TABLES

create table @@schema@@.resource (
	email varchar(100) not null,
	name varchar(20) not null,
	surname varchar(100) not null,
	allocation int not null
);

alter table @@schema@@.resource
	add constraint resource_pk
	primary key(email);

create table @@schema@@.task (
	id varchar(50) not null,
	title varchar(100) not null,
	description varchar(255) not null,
	priority int not null,
	estimation int not null,
	category_id int not null,
	team_id varchar(50) not null
);

alter table @@schema@@.task
	add constraint task_pk
	primary key(id);

alter table @@schema@@.task
	add constraint task_category_fk
	foreign key(id)
	references @@schema@@.task_category(id);

create table @@schema@@.task_category (
	id int not null default nextval('@@schema@@.task_category_sequence'),
	name varchar(100) not null,
	description varchar(255) not null
);

alter table @@schema@@.task_category
	add constraint task_category_pk
	primary key (id);

create table @@schema@@.team (
	id varchar(50) not null,
	name varchar(100) not null
);

alter table @@schema@@.team
	add constraint team_pk
	primary key(id);

create table @@schema@@.team_resource (
	team_id varchar(50) not null,
	resource_email varchar(100) not null,
	role varchar(10) not null,
	start_date timestamp not null,
	end_date timestamp,
	allocation int
);

alter table @@schema@@.team_resource
	add constraint team_resource_pk 
		primary key (team_id, resource_email);

alter table @@schema@@.team_resource
	add constraint team_resource_team_fk
		foreign key (team_id)
		references @@schema@@.team(id); 

alter table @@schema@@.team_resource
	add constraint team_resource_resource_fk
		foreign key (resource_email)
		references @@schema@@.resource(email);

create table @@schema@@.journey (
	id int not null default nextval('@@schema@@.journey_sequence'),
	resource_email varchar(100) not null,
	task_id varchar(50) not null,
	date timestamp not null,
	hours int
);

alter table @@schema@@.journey
	add constraint journey_pk
		primary key (id);

alter table @@schema@@.journey
	add constraint journey_task_fk
		foreign key (task_id)
		references @@schema@@.task(id);

alter table @@schema@@.journey
	add constraint journey_resource_fk
		foreign key (resource_email)
		references @@schema@@.resource(email);

