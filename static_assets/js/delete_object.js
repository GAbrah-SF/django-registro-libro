$(document).ready(function () {
    let id_delete = [], id_show_libro = []
    let hidde_csrf_token_delete = $("#hidde_csrf_token_delete").val()
    let url_relative_eliminar = $("#url_relative_eliminar").val()

    $('.delete_data').each(function () {
        id_delete.push($(this).attr('id'))
    })

    $('.show_libro').each(function () {
        id_show_libro.push($(this).attr('id'))
    })

    for (let i = 0, j = 0;
         i < id_delete.length, j < id_show_libro.length;
         i++, j++) {

        let id = id_delete[i].replace("delete_", "")
        let libro = $(`#${id_show_libro[j]}`).text()

        $(`#${id_delete[i]}`).on("click", function () {
            swal.fire({
                background: "#000",
                position: 'center',
                icon: 'warning',
                title: `¿Eliminar libro\n${libro}?`,
                showConfirmButton: true,
                confirmButtonColor: '#19980b',
                confirmButtonText: 'SÍ',
                showCancelButton: true,
                cancelButtonColor: '#910018',
                cancelButtonText: 'NO',
                // timer: 2000
            }).then((result) => {
                if (result.value) {
                    $.ajax({
                        url: url_relative_eliminar,
                        type: 'POST',
                        data: {"id": id, "csrfmiddlewaretoken": hidde_csrf_token_delete},
                        success: function (response) {
                            swal.fire({
                                position: response.icon,
                                icon: 'success',
                                background: "#000",
                                title: response.message,
                                showConfirmButton: false,
                                timer: 2500
                            }).then(
                                setTimeout(function () {
                                    location.reload();
                                }, 2000) // 2000 milisegundos (2 segundos)
                            )
                        },
                        error: function (xhr, status, error) {
                            swal.fire({
                                position: 'center',
                                icon: xhr.responseJSON.icon,
                                background: "#000",
                                title: xhr.responseJSON.error,
                                showConfirmButton: false,
                                timer: 2500
                            })
                        }
                    })
                }
            })
        })
    }
})
