CREATE TABLE session (
  sid VARCHAR NOT NULL,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) WITHOUT TIME ZONE NOT NULL,

  CONSTRAINT pk_session PRIMARY KEY (sid)
);

CREATE TABLE menu_group (
  id serial NOT NULL,
  text VARCHAR,
  menu_order INTEGER,

  CONSTRAINT "pk_menuGroup" PRIMARY KEY (id)
);

CREATE TABLE system_page (
  id serial NOT NULL,
  text VARCHAR,
  link VARCHAR,
  icon VARCHAR,

  CONSTRAINT "pk_systemPage" PRIMARY KEY (id)
);

CREATE TABLE user_type (
  id VARCHAR,
  name VARCHAR,

  CONSTRAINT "pk_userType" PRIMARY KEY (id)
);

CREATE TABLE "user" (
  id SERIAL,
  user_id VARCHAR,
  user_type_id VARCHAR,
  name VARCHAR,
	email VARCHAR,
  phone VARCHAR,
  password_hash VARCHAR,
  password_salt VARCHAR,

  CONSTRAINT pk_user PRIMARY KEY (id),
  CONSTRAINT "fk_user_userType" FOREIGN KEY (user_type_id) REFERENCES user_type (id),
  CONSTRAINT uq_user UNIQUE (user_id)
);

CREATE TABLE user_permission (
  user_type_id VARCHAR NOT NULL,
  system_page_id INTEGER NOT NULL,
  menu_group_id INTEGER,
  in_menu boolean DEFAULT false,
  menu_order INTEGER,

  CONSTRAINT "pk_userPermission" PRIMARY KEY (user_type_id, system_page_id),
  CONSTRAINT "fk_userPermission_menuGroup" FOREIGN KEY (menu_group_id) REFERENCES menu_group (id),
  CONSTRAINT "fk_userPermission_systemPage" FOREIGN KEY (system_page_id) REFERENCES system_page (id),
  CONSTRAINT "fk_userPermission_userType" FOREIGN KEY (user_type_id) REFERENCES user_type (id)
);

------------------------------------------------------------------------------------------------

-- DATA INSERTS
INSERT INTO user_type (id, name) VALUES ('ADM', 'Administrador');
INSERT INTO user_type (id, name) VALUES ('USR', 'Usuario');

INSERT INTO "user" (id, name) VALUES (0, 'Sistema');

INSERT INTO menu_group (id, text, menu_order) VALUES (1, 'Configuraciones', 9999);
SELECT pg_catalog.setval('menu_group_id_seq', 1, TRUE);

INSERT INTO system_page (id, text, link, icon) VALUES (1, 'Inicio', '/', 'home');
SELECT pg_catalog.setval('system_page_id_seq', 1, TRUE);

INSERT INTO user_permission (user_type_id, system_page_id, menu_group_id, in_menu, menu_order) VALUES ('ADM', 1, NULL, TRUE, 1);
INSERT INTO user_permission (user_type_id, system_page_id, menu_group_id, in_menu, menu_order) VALUES ('USR', 1, NULL, TRUE, 1);


create table if not exists cheques(
  id serial,
  numerocheque integer not null,
  fecharecepcion date,
  numerocuenta integer not null,
  montocheque integer not null,
  banco text,
  apellidoemisor text,
  fechavencimiento date,
  descripcioncheque text,
  chequecobradoS_N boolean,
  nombremisor text,
  CONSTRAINT "pk_cheques" primary key (id)
);

create table if not exists proveedores(
  id serial,
  nombresproveedor text,
  apellidosproveedor text,
  contactoproveedor int,
  emailproveedor text,
  descripcionproveedor text,
  CONSTRAINT "pk_proveedores" primary key (id)
);

