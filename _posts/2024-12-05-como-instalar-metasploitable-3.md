---
title: "Como instalar Metasploitable 3 para practicar pentesting"
header:
  image: /assets/images/posts/instalar-metasploitable3/image_featured_metasploitable3.png
  teaser: /assets/images/posts/instalar-metasploitable3/image_featured_metasploitable3.png
excerpt_separator: "<!--more-->"
show_date: true
toc: true
toc_sticky: true
share: true
related: true
categories:
  - guias
tags:
  - metasploitable3
  - vagrant
collection: guias



---

En este post te enseño a instalar Metasploitable 3 en tu equipo para que puedas practicar pentesting en dos maquinas cargadas de vulnerabilidades. 
<!--more-->

## Requisitos previos

- VirtualBox previamente instalado.
- Conexion a internet.

## Pasos:

### Paso 1: Instalar Vagrant 
   
   Descarga Vagrant desde la direccion web: 
   
   https://developer.hashicorp.com/vagrant/install

   ![alt text](/assets/images/instalar-metasploitable3/image-2.png)

   Ejecuta el instalador descargado, acepta la licencia de uso y espera que acabe la instalacion.

   ![alt text](/assets/images/instalar-metasploitable3/image-4.png)
   
   ![alt text](/assets/images/instalar-metasploitable3/image-5.png)
   
   ![alt text](/assets/images/instalar-metasploitable3/image-6.png)

   **Importante**

   Reinicia tu sistema después de la instalación para que las variables de entorno se configuren correctamente.

   ![alt text](/assets/images/instalar-metasploitable3/image-7.png)

   Una vez reiniciado el sistema instala el plugin “Vagrant Reload” ejecutando el siguiente comando en la consola de comandos:
   
   ```
   vagrant plugin install vagrant-reload
   ```

   ![alt text](/assets/images/instalar-metasploitable3/image-18.png)

### Paso 2: Descargar las maquinas con vagrant.

Abre una consola de powershell y ejecuta los siguientes comandos:

```ps
cd \
mkdir metasploitable-workspace
cd metasploitable-workspace
```

![alt text](/assets/images/instalar-metasploitable3/image-22.png)

```ps
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/rapid7/metasploitable3/master/Vagrantfile" -OutFile "Vagrantfile"
```

![alt text](/assets/images/instalar-metasploitable3/image-23.png)

![alt text](/assets/images/instalar-metasploitable3/image-24.png)

```ps
vagrant up
```

![alt text](/assets/images/instalar-metasploitable3/image-25.png)

Este proceso se tomara un tiempo en acabar dependiendo de tu conexion a internet.

![alt text](/assets/images/instalar-metasploitable3/image-27.png)

Cuando acabe el proceso tendremos 2 maquinas nuevas en VirtualBox.

![alt text](/assets/images/instalar-metasploitable3/image-28.png)

## ¡Enhorabuena!

Ahora ya tienes 2 maquinas nuevas llenas de vulnerabilidades para explotarlas.





