"# TP03-01" 

- Crear funcion EsFecha en Evento Controller HECHO

- Paginacion HECHO

- Register HECHO

- PONER IF EN INSERT EVENT

- Token y login HECHO 

- Archivo .env HECHO

- Agregar querys :
    -events HECHO
    -users HECHO
    -provinces HECHO

- Puntos:
    -11 HECHO Y PAGINADO
    -12 HECHO Y PAGINADO
    -13 HECHO Y PAGINADO

- Provincia service HECHO

- Crear error middleware (opcional)


http://localhost:3000/event

INSERT EVENTO: http://localhost:3000/event?name=dillom&description=despues esta caro el bondi&id_event_category=1&id_event_location=1&start_date=2024-03-29 00:00:00&duration_in_minutes=180&price=21000&enabled_for_enrollment=true&max_assistance=8000

INSERT ENROLLMENT: http://localhost:3000/event/2/enrollment?id_event=2&id_user=1&description=cheto&attended=true&observations=nose&rating=5


EVENT LOCATION
{
    "id_location":1,
    "name":"evento locacion",
    "full_address":" OLAYA 1075",
    "max_capacity":98765,
    "latitude":23,
    "longitude":23
}



LOGIN USER
{
    "username":"polshu@polshu.com.ar",
    "password":"pablito"
}


Les falta la documentacion, no veo que tengan ninguna coleccion de Postman ni swagger instalado.
Cuando pongo una cantidad de max assistance igual al capacity del event location obtengo "No pueden asistir más personas de las que admite la localidad"
Cuando quiero editar un evento que si existe me tira error de que no existe el evento.
Cuando quiero eliminar un evento que si existe, me tira error diciendo que el ID no existe.
El event_enrollment no funciona, tiene como requeridos campos que no se piden nunca en la consigna.
Para la paginacion, la coleccion se tiene que llamar "Colection" no cambiar el nombre por cada endpoint.
El endpoint de event-category estaba nombrado como Categoria.
Cuando quiero crear una categoria me tira error de que no existe el nombre. Esto tiene que salir del body, no de la query.
Para editar hicieron un PATCH en lugar de un PUT
Si quiero eliminar una categoria que no existe, me que lo hace bien en lugar de 404.
El endpoint de locations le pusieron localidad.