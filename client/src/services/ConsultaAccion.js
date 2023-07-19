import Swal from 'sweetalert2';

export const ConsultaAccion = (handler, title, text) => {
  Swal.fire({
    title: title,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Sí',
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      handler();
    } else if (result.isDenied) {
      Swal.fire("No se eliminó QR")
    }
  })
  }

  