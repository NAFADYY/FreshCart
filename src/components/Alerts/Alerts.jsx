import Swal from "sweetalert2";

export const SuccessAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: "success",
    didClose: true,
    timer: 2000,
  });
};
