$(document).ready(function() {
        mostrarTareas();

        $("#id_nuevatarea").on("click", mostrarFormulario);
        $("#id_cancelartarea").on("click", mostrarFormulario);

        $("#id_formulariotarea").on("submit", function(e) {
                e.preventDefault();
                insertTarea($("#id_titulo").val(), $("#id_descripcion").val(), 0, mostrarTareas);
                mostrarFormulario();
        })
});

//insertar
function insertTarea(titulo, descripcion, hecha, mostrar) {
	$.ajax({
		type: 'POST',
		url: 'php/insertTarea.php',
		data: {
			Titulo: titulo,
			Descripcion: descripcion,
			Hecha: hecha
		},
		success: mostrar,
		error: function(e) {
			console.error(e);
		}
	});
}

//actualizar
function actualizarTareas(id, titulo, descripcion, hecha, mostrar){
    $.ajax({
        type: 'POST',
        url: 'php/updateTarea',
        data:{
            id:id,
            titulo:titulo,
            descripcion: descripcion,
            hecha: hecha,
        }
        ,
        success: mostrar,
        error: function (error) {
            console.log("Error al cambiar la lista de tareas: " + error);
        }
    })
}

//eliminar
function eliminarTarea(id, mostrar) {
	$.ajax({
		type: 'POST',
		url: 'php/deleteTarea.php',
		data: {
			id: id,
		},
		success: mostrar,
		error: function(e) {
			console.error(e);
		}
	});
}

//seleccionar
function mostrarTareas() {
        $.ajax({
        type: 'GET',
        url: 'php/selectTarea.php',
        dataType: 'json',
        success: mostrar,
        error: function (error) {
            console.log("Error al obtener la lista de tareas: " + error);
        }
    });
}

function mostrar(res){
        var tareas = $("#tareas")
        tareas.children('.tarea').remove();

        res.forEach((tarea) => {
                var contenedor= $("<div>").addClass("tarea");
                var titulo = $("<h3>").text(tarea.Titulo);
                var descripcion = $("<p>").text(tarea.Descripcion);
                var hecha = $("<label>").text("Tarea completada: ").append($("<input type='checkbox'>"));
                var botonmodificar = $($("<button>")).text("Modificar").addClass("editartarea");
                var borrartarea = $($("<button>")).text("Borrar").addClass("borrartarea").on("click", function(){
                    eliminarTarea(tarea.ID, mostrarTareas);
                });

                contenedor.append(borrartarea);
                contenedor.append(botonmodificar);
                contenedor.append(titulo);
                contenedor.append(descripcion);
                contenedor.append(hecha);

                tareas.append(contenedor);


        });
}

function mostrarFormulario() {
	let _mostrado = $("#id_formulariotarea").toggleClass('esconder').hasClass('esconder');
        $("#id_nuevatarea").toggleClass('esconder', !_mostrado);
	if (!_mostrado) {
		$("#id_formulariotarea")[0].reset();
	}
}
