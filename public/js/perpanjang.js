$(document).ready(function () {
  $("#submit").click(function (e) {
    e.preventDefault();
    const id = $("#member").val();
    const quantity = $("#quantity").val();
    if (!id || !quantity) {
      const message = "Harap Semua Fild Di isi";
      demo.showNotification({ color: "danger", message });
    } else {
      $.ajax({
        type: "PUT",
        url: "/perpanjang",
        data: { id, quantity },
        success: function (response) {
          const data = response.data;
          const message = `Masa Aktif ${data.name} Berhasil Di perpanjang`;
          demo.showNotification({ color: "success", message });
          console.log(data.member ? "Member" : "Non Member");
          $("#name").text(data.name);
          $("#address").text(data.address);
          $("#phone").text(data.phone);
          $("#expired").text(data.expired);
          $("#uid").text(data.uid);
          $("#memberTd").text(data.member ? "Member" : "Non Member");

          $("#detail").removeClass("d-none");
        },
      });
    }
  });
});
