var request;
$.getJSON('//api.ipify.org?format=jsonp&callback=?', function (data) {
    $("#ip").html(data.ip);
});
$("#foo").submit(function (event) {
    event.preventDefault();
    if (request) {
        request.abort();
    }

    if ($("#noidung").val().length < 20) {
        swal("Lỗi !", "Vui lòng nhập nội dung trên 20 kí tự !", "warning");
    } else {
        var $form = $(this);
        var $inputs = $form.find("input, select, button, textarea");

        var serializedData = $form.serialize();

        $inputs.prop("disabled", true);

        // alert("Bạn chờ một xíu nhé !");

        request = $.ajax({

            url: "https://script.google.com/macros/s/AKfycby0LRQthcnRWSg3GFd621iAV8d43bDWRQ3uLQp6w7kxBZHcDs-kOWH8YrN891TLVAKPqQ/exec",

            type: "post",

            data: serializedData

        });

        request.done(function (response, textStatus, jqXHR) {

            Swal.fire(

                'Okay',

                'Ad nhận được confession của bạn rồi nhé !',

                'success'

            )

            $("#ten").val("");

            $("#noidung").val("");

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {

            console.error(

                "The following error occurred: " +

                textStatus, errorThrown

            );
            Swal.fire({
                type: 'error',
                title: 'OOpps...',
                text: 'Có lỗi rồi bạn liên hệ Admin page để xử lý ngay nhé',
            })
            $("#submit").attr("disabled", false);
        });
        request.always(function () {
            $inputs.prop("disabled", false);
        });
    }
});

