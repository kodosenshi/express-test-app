
-- POSTGRESQL
CREATE TABLE articles (
  id serial NOT NULL PRIMARY KEY ,
  title varchar(255) NOT NULL DEFAULT '',
  author varchar(255) NOT NULL DEFAULT '',
  featured bool NOT NULL DEFAULT '0',
  showInMenu bool NOT NULL DEFAULT '0',
  published bool NOT NULL DEFAULT '0',
  image varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT '',
  body text
);

-- MYSQL
CREATE TABLE articles (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL DEFAULT '',
  author varchar(255) NOT NULL DEFAULT '',
  featured tinyint(1) NOT NULL DEFAULT '0',
  showInMenu tinyint(1) NOT NULL DEFAULT '0',
  published tinyint(1) NOT NULL DEFAULT '0',
  image varchar(255) DEFAULT NULL,
  description varchar(255) DEFAULT '',
  body text
);