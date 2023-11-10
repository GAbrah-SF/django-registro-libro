$(document).ready(function () {
    let id_update = [], id_show_autor = [], id_show_libro = [], id_show_editorial = []
    let hidde_csrf_token_update = $("#hidde_csrf_token_update").val()
    let url_relative_actualizar = $("#url_relative_actualizar").val()

    $('.show_modal_update').each(function () {
        id_update.push($(this).attr('id'))
    })

    $('.show_autor').each(function () {
        id_show_autor.push($(this).attr('id'))
    })

    $('.show_libro').each(function () {
        id_show_libro.push($(this).attr('id'))
    })

    $('.show_editorial').each(function () {
        id_show_editorial.push($(this).attr('id'))
    })

    for (let i = 0, j = 0, k = 0, l = 0;
         i < id_update.length, j < id_show_autor.length, k < id_show_libro.length, l < id_show_editorial.length;
         i++, j++, k++, l++) {
        let id_number = id_update[i].replace("update_", "")

        let update_autor = $(`#update_autor_${id_number}`)
        let update_libro = $(`#update_libro_${id_number}`)
        let update_editorial = $(`#update_editorial_${id_number}`)

        $(`#${id_update[i]}`).on("click", function () { // Click al botón de actualizar para cada fila de la tabla
            let autor = $(`#${id_show_autor[j]}`).text()
            let libro = $(`#${id_show_libro[k]}`).text()
            let editorial = $(`#${id_show_editorial[l]}`).text()

            $(`#update_id_${id_number}`).val(id_number)
            update_autor.val(autor)
            update_libro.val(libro)
            update_editorial.val(editorial)
        })

        $(`#updateData_${id_number}`).on("click", function () {
            let data_update = {
                "id": id_number,
                "autor": update_autor.val(),
                "libro": update_libro.val(),
                "editorial": update_editorial.val(),
                "csrfmiddlewaretoken": hidde_csrf_token_update
            }

            // Realiza la solicitud AJAX
            $.ajax({
                url: url_relative_actualizar,
                type: "POST",
                data: data_update,
                success: function (response) {
                    swal.fire({
                        position: 'center',
                        icon: response.icon,
                        background: "#000",
                        title: response.message,
                        showConfirmButton: false,
                        timer: 2500
                    }).then(
                        setTimeout(function () {
                            location.reload();
                        }, 1000)
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
                    console.log(xhr.responseJSON.error)
                }
            })
        })
    }
})
