---
layout: post
title: "Walkthrough: Cracking Passwords with Hashcat"
date:  19-02-2026
categories: [Walkthroughs, HTB Academy]
tags: [Hashcat]
image: "assets/images/HTB_Academy_Cracking_Passwords_with_Hashcat/featured_image_module.png"
alt: portada de Walkthrough Cracking Passwords with Hashcat.
---
## Introduccion a Hashcat
Hashcat es una de las herramientas más poderosas para la recuperación de contraseñas mediante el cracking de hashes. Su capacidad de aprovechar la GPU para realizar ataques de alta velocidad la convierte en una opción esencial para auditores de seguridad y pentesters.

### Hashing vs Cifrado

El hashing es un proceso unidireccional que transforma una entrada en una cadena fija de caracteres, sin posibilidad de revertirlo sin fuerza bruta. En cambio, el cifrado es bidireccional, lo que permite descifrar los datos con una clave correcta.

**Generar un hash MD5 de la contraseña 'HackTheBox123!'.**

```sh
echo -n "HackTheBox123!" | md5sum

87946d0585ba62c0671b734cada46b41
```

Explicación:

- **`echo -n`** evita la nueva línea al final, asegurando que el hash generado sea correcto.

- **`md5sum`** calcula el hash MD5 de la entrada proporcionada.
- 

**Cree el texto cifrado XOR de la contraseña 'opens3same' utilizando la clave 'academy'. (Formato de respuesta: \\x00\\x00\\x00\\....)**

```sh
python3
from pwn import xor
xor("opens3same", "academy")

b'\x0e\x13\x04\n\x16^\n\x00\x0e\x04'
```

Explicación:

- **`xor()`** de pwntools se usa para aplicar la operación XOR entre la contraseña y la clave.

La salida es el resultado de cifrar 'opens3same' usando 'academy' como clave.

### Identificacion de hashes

**Identifique el siguiente hash: $S$D34783772bRXEx1aCsvY.bqgaaSu75XmVlKrW9Du8IQlvxHlmzLc**

```sh
hashid '$S$D34783772bRXEx1aCsvY.bqgaaSu75XmVlKrW9Du8IQlvxHlmzLc'

Drupal > v7.x
```

### Descripcion general de Hashcat

**¿Cuál es el modo hash del tipo hash Cisco-ASA MD5?**

```sh
hashcat --help

2410
```

## Tipos de ataques de Hashcat

### Ataque de diccionario

**Descifra el siguiente hash usando la lista de palabras rockyou.txt: 0c352d5b2f45217c57bef9f8452ce376**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ cp /usr/share/wordlists/rockyou.txt.gz .

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ gunzip rockyou.txt.gz 

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashid '0c352d5b2f45217c57bef9f8452ce376' -m

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -a 0 -m 0 0c352d5b2f45217c57bef9f8452ce376 rockyou.txt 

0c352d5b2f45217c57bef9f8452ce376:cricket1 
```       

### Ataque combinado

**Utilizando el ataque de combinación Hashcat, busque la contraseña en texto simple del siguiente hash md5: 19672a3f042ae1b592289f8333bf76c5. Utilice las listas de palabras complementarias que se muestran al final de esta sección.**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ touch lista1.dict

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ nano lista1.dict 

sunshine
happy
frozen
golden

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ touch lista1.dict

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ nano lista1.dict 

hello
joy
secret
apple

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -a1 -m0 19672a3f042ae1b592289f8333bf76c5 lista1.dict lista2.dict 


19672a3f042ae1b592289f8333bf76c5:frozenapple  
```

### Ataque de máscara

**Descifrar el siguiente hash MD5 mediante un ataque de máscara: 50a742905949102c961929823a2e8ca0. Utilizar la siguiente máscara: -1 02 'HASHCAT?l?l?l?l?l20?1?d'**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -m0 -a3 50a742905949102c961929823a2e8ca0 -1 02 'HASHCAT?l?l?l?l?l20?1?d'

50a742905949102c961929823a2e8ca0:HASHCATqrstu2020
```

### Modo híbrido

**Descifra el siguiente hash: 978078e7845f2fb2e20399d9e80475bc1c275e06 usando la máscara ?d?s.**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashid 978078e7845f2fb2e20399d9e80475bc1c275e06  -m
Analyzing '978078e7845f2fb2e20399d9e80475bc1c275e06'
[+] SHA-1 [Hashcat Mode: 100]
[+] Double SHA-1 [Hashcat Mode: 4500]
[+] RIPEMD-160 [Hashcat Mode: 6000]
[+] Haval-160 
[+] Tiger-160 
[+] HAS-160 
[+] LinkedIn [Hashcat Mode: 190]
[+] Skein-256(160) 
[+] Skein-512(160) 

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -a6 -m100 978078e7845f2fb2e20399d9e80475bc1c275e06 rockyou.txt '?d?s'

978078e7845f2fb2e20399d9e80475bc1c275e06:hybridmaster9$ 
```

## Trabajar con diccionarios

### Trabajar con reglas

**Descifre el siguiente hash SHA1 utilizando las técnicas enseñadas para generar una regla personalizada: 46244749d1e8fb99c37ad4f14fccb601ed4ae283. Modifique la regla de ejemplo que aparece al principio de la sección para agregar 2020 al final de cada intento de contraseña.**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ echo 'so0 si1 se3 ss5 sa@ c $2 $0 $2 $0' > regla.txt

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ echo '46244749d1e8fb99c37ad4f14fccb601ed4ae283' > hash.txt

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -a 0 -m 100 hash.txt rockyou.txt -r regla.txt

46244749d1e8fb99c37ad4f14fccb601ed4ae283:R@c3c@r2020
```


## Cracking

### Descifrando hashes comunes

**Descifrar el siguiente hash: 7106812752615cdfe427e01b98cd4083**

```sh
hashcat -a 0 -m 1000 -g 1000 7106812752615cdfe427e01b98cd4083 rockyou.txt

Password22$
```

### Cracking de archivos y hashes varios


**Extraiga el hash del archivo 7-Zip adjunto, descifre el hash y envíe el valor del archivo flag.txt contenido dentro del archivo.**

```sh
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ unzip Misc_hashes.zip 
Archive:  Misc_hashes.zip
 extracting: hashcat.7z              
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ locate 7z2john
/usr/bin/7z2john
/usr/share/doc/john/README.7z2john.md
/usr/share/john/7z2john.pl
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ 7z2john hashcat.7z > hash_7zip
ATTENTION: the hashes might contain sensitive encrypted data. Be careful when sharing or posting these hashes
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ cat hash_7zip 
hashcat.7z:$7z$0$19$0$$8$9c7684c204c437fa0000000000000000$1098215690$112$106$7395978cad9ad8b18aef51ba2f9dcf909a1bff70d240b1c8e98dffabd352d69a1f37978e5df0179860d0fe4754721ae3cbbee1b558d93cd27e0b2959efe44a00305f982527d19584d62bcf8c23cf89e24fd19db844108e452a26d4a8343d504fc3063744d081db1492ea1cdef7a9b983
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ nano hash_7zip 

(elimino hashcat.7z:)

┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ hashcat -m 11600 hash_7zip rockyou.txt

452a26d4a8343d504fc3063744d081db1492ea1cdef7a9b983:123456789a


┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$ 7z x hashcat.7z 

7-Zip [64] 16.02 : Copyright (c) 1999-2016 Igor Pavlov : 2016-05-21
p7zip Version 16.02 (locale=en_US.UTF-8,Utf16=on,HugeFiles=on,64 bits,128 CPUs AMD EPYC 7543 32-Core Processor                 (A00F11),ASM,AES-NI)

Scanning the drive for archives:
1 file, 230 bytes (1 KiB)

Extracting archive: hashcat.7z

Enter password (will not be echoed):
--
Path = hashcat.7z
Type = 7z
Physical Size = 230
Headers Size = 182
Method = LZMA2:12 7zAES
Solid = -
Blocks = 1

Everything is Ok

Size:       33
Compressed: 230
┌─[eu-academy-3]─[10.10.15.53]─[htb-ac-1333791@htb-9glskpmycp]─[~]
└──╼ [★]$  cat flag.txt 
3c0e87a0396cb26d5b80dc03eeef8ea0
```

### Cómo descifrar protocolos de enlace inalámbricos (WPA y WPA2) con Hashcat

**Realice el craqueo del MIC utilizando el archivo .cap adjunto.**



**Extraiga el hash PMKID del archivo .cap adjunto y descifrelo.**