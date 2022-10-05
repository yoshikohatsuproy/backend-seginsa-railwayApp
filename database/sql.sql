/* TABLA ROL DE USUARIOS */
CREATE TABLE tb_rol (
    idr int primary key auto_increment ,
    des_rol varchar(255)
);

insert into tb_rol (des_rol) values('GLOBAL');
insert into tb_rol (des_rol) values('NORMAL');


/* TABLA DE USUARIOS */
CREATE TABLE tb_usuario (
    idu int primary key auto_increment ,
    nom_usuario varchar(255),
    ape_usuario varchar(255),
    tel_usuario varchar(255),
    car_usuario varchar(255),
    cor_usuario varchar(255) unique,
    pas_usuario varchar(255),
    idrol int ,
    id_create int,
    date_create date,
    id_update int,
    date_update date,
    activo int,
    FOREIGN KEY (idrol) REFERENCES tb_rol(idr)
);

delimiter //
create procedure sp_listarUsuarios( )
 begin
 select * from tb_usuario;
end //
 delimiter ;

CALL sp_insertUsuario('JONATHAN', 'HUAMBACHANO','938511627','ADMINISTRADOR', 'YOKUN12342@GMAIL.COM','12345678',1,1);
delimiter //
create procedure sp_insertUsuario( 
    _nom_usuario varchar(255),
    _ape_usuario varchar(255),
    _tel_usuario varchar(255),
    _car_usuario varchar(255),
    _cor_usuario varchar(255),
    _pas_usuario varchar(255),
    _idrol int ,
    _id_create int
)
 begin
 insert into tb_usuario(
    nom_usuario,
    ape_usuario,
    tel_usuario,
    car_usuario,
    cor_usuario,
    pas_usuario,
    idrol,
    id_create,
    date_create,
    id_update,
    date_update,
    activo
 ) values (
    _nom_usuario,
    _ape_usuario,
    _tel_usuario,
    _car_usuario,
    _cor_usuario,
    _pas_usuario,
    _idrol,
    _id_create,
    curdate(),
    _id_create,
    curdate(),
    1
 );
end //
 delimiter ;

 delimiter //
create procedure sp_actualizarUsuario( 
    _nom_usuario varchar(255),
    _ape_usuario varchar(255),
    _tel_usuario varchar(255),
    _car_usuario varchar(255),
    _idrol int ,
    _id_update int,
    _idu int
)
begin
    UPDATE tb_usuario set
    nom_usuario = _nom_usuario,
    ape_usuario = _ape_usuario,
    tel_usuario = _tel_usuario,
    car_usuario = _car_usuario,
    idrol = _idrol ,
    date_update =  curdate(),
    id_update = _id_update,
    activo = 1
    where idu = _idu;
end //
delimiter ;

  delimiter //
 create procedure sp_actualizarContrasenia( 
     _pas_usuario    varchar(255),
     _id_update int,
     _idu int
 )
 begin
 update tb_usuario set 
 pas_usuario = _pas_usuario,
 id_update = _id_update,
 date_update = curdate()
 where idu = _idu;
end //
 delimiter ;
  

 delimiter //
create procedure sp_eliminarUsuario( 
    _idu int,
    _id_update int
)
begin
    UPDATE tb_usuario set
    date_update =  curdate(),
    id_update = _id_update,
    activo = 0
    where idu = _idu;
end //
delimiter ;

 delimiter //
create procedure sp_listarUsuarioById( 
    _idu int
)
begin
    select * from tb_usuario where idu = _idu;
end //
delimiter ;


 delimiter //
create procedure sp_verificarCorreo( 
    _cor_usuario varchar(255)
)
begin
    select * from tb_usuario where cor_usuario = _cor_usuario;
end //
delimiter ;


/* Tabla Marca */
 create table tb_marca(
	idm int primary key auto_increment,
    des_marca varchar(255),
	id_create int,
    date_create date,
    id_update int,
    date_update date,
    activo int
 );



delimiter //
create procedure sp_listarMarca()
begin
  select * from tb_marca;
 end //
 delimiter ;

delimiter //
create procedure sp_listarMarcaByid(
    _idm int
)
begin
  select * from tb_marca where idm = _idm;
 end //
 delimiter ;

delimiter //
create procedure sp_insertarMarca( 
	_des_marca varchar(255) , _id_create int
)
begin
 insert into tb_marca(des_marca, id_create, date_create, id_update, date_update, activo)
 values (_des_marca, _id_create, curdate(), _id_create, curdate(), 1);
 
 end //
 delimiter ;


 delimiter //
create procedure sp_actualizarMarca( 
	_des_marca varchar(255) , _id_update int, _idm int
)
begin
	update tb_marca set
    des_marca = _des_marca,
    id_update = _id_update,
    date_update = curdate(),
    activo = 1
    where idm = _idm;
 end //
 delimiter ;

  delimiter //
create procedure sp_eliminarMarca( 
 _id_update int, _idm int
)
begin
	update tb_marca set
    id_update = _id_update,
    date_update = curdate(),
    activo = 0
    where idm = _idm;
 end //
 delimiter ;


/* Tabla Proveedor */
  create table tb_proveedor(
	idp int primary key auto_increment,
    des_prov varchar(255),
    con_prov varchar(255),
    tel_prov varchar(255),
    cor_prov varchar(255),
	id_create int,
    date_create date,
    id_update int,
    date_update date,
    activo int
 );