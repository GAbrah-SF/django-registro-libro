$(document).ready(function () {
    let url_relative_guardar = $("#url_relative_guardar").val()
    let hidde_csrf_token = $("#hidde_csrf_token").val()

    $(".guardar_datos").on("click", function () {

        let data = {
            "autor": $("#autor").val(),
            "libro": $("#libro").val(),
            "editorial": $("#editorial").val(),
            "csrfmiddlewaretoken": hidde_csrf_token,
        }

        $.ajax({
            url: url_relative_guardar,
            type: "POST",
            data: data,
            success: function (success) {
                swal.fire({
                    position: 'center',
                    icon: success.icon,
                    background: "#000",
                    title: success.message,
                    showConfirmButton: false,
                    timer: 2500
                }).then(
                    setTimeout('document.location.reload()', 1000)
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
                // console.log(xhr.responseJSON.error)
            }
        })

    })
})
