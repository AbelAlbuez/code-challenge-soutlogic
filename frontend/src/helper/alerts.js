import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function showAlert(message, icons) {
  const mySwal = withReactContent(Swal);
  mySwal.fire({
    title: message,
    icon: icons,
  });
}

function showConfirmAlert(title, message, successCallBack) {
  const mySwal = withReactContent(Swal);
  mySwal
    .fire({
      title: title,
      text: message,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
    .then((result) => {
      if (result.isConfirmed) {
        successCallBack();
      }
    });
}

const onFocus = (focus) => {
  if (focus !== "") {
    document.getElementById(focus).focus();
  }
};

const alert = {
  showAlert,
  showConfirmAlert,
};
export default alert;
