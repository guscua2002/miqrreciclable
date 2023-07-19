import Swal from 'sweetalert2';

export const ConsultaAccion = (handler, title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    color: "red",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "No",
    focusCancel: true,
  }).then((result) => {
    if (result.isConfirmed) {
      handler();
    }
  });
  }