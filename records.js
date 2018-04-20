

$(document).ready(function(){


	for ( var i = 0, len = localStorage.length; i < len; ++i ) 
	{
		var json = localStorage.getItem( localStorage.key(i));
		var record = JSON.parse(json);

		$('#body_records').append("<tr><td>" + record.doc + "</td><td><input type='button' class='btn' value='Ver resumen'></td><td>"
			+ "<input type='button' key='" + localStorage.key(i) + "' value='Generar código' class='btn' id='btnShowModal' >"
			+ "<input type='button' value='Eliminar' class='btn'></td> " +
		 "</tr>");
	}


	$('#btnShowModal').click(function(evt)
	{
		$('#modal-code').modal('show');	
		


		var json = localStorage.getItem(evt.target.getAttribute('key'));
		$('#txt_code').val(json);

	});

});
