$(document).ready(function () {
  $(".modal-open").click(function (e) {
    console.log("Masuk");
    e.preventDefault();
    const me = $(this),
      id = me.attr("id"),
      url = me.attr("href"),
      title = me.attr("title");
    console.log(url);
    $.ajax({
      url: url,
      data: { id },
      dataType: "html",
      success: (response) => {
        $(".modal-title").text(title);
        $(".modal-body").html(response);
        const uid = $("input[name=uid]").val();
        console.log(uid);
        const message = "Harap Tempelkan Kartu Terlebih Dahulu";
        if (uid === "") {
          return demo.showNotification({ color: "danger", message });
        }
        return $("#modal").modal("show");
      },
    });
  });

  $("#btn-action").click(function (e) {
    e.preventDefault();
    const form = $(".modal-body form"),
      url = form.attr("action"),
      method = form.attr("method");

    const name = $("input[name=name]").val();
    const address = $("input[name=address]").val();
    const phone = $("input[name=phone]").val();
    const expired = $("input[name=expired]").val();
    const member = $("input[name=member]").val();

    const condition = [name, address, phone, expired, member].includes("");
    if (condition) {
      const message = "Harap Di Isi Semua";
      return demo.showNotification({ color: "danger", message });
    }
    $.ajax({
      type: method,
      url: url,
      data: form.serialize(),
      success: function (response) {
        $("#modal").modal("hide");
        console.log(response);
        const message =
          method == "POST"
            ? "Data Berhasil DiTambahkan"
            : "Data Berhasil DiUpdate";
        demo.showNotification({ color: "primary", message });
        setTimeout(function () {
          location.reload();
        }, 2000);
        // $("#table").DataTable().ajax.reload();
      },
    });
  });
});
