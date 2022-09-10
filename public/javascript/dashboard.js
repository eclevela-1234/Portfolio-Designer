const updateHandler = async function (event) {
//   event.preventDefault();
  const bio = document.querySelector("#bio-form").value.trim();
  const social = document.querySelector("#social-url").value.trim();

  const response = await fetch(`/api/users/update`, {
    method: "PUT",
    body: JSON.stringify({
      bio,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("++++success+++++");
  } else {
    alert(response.statusText);
  }
}


document.querySelector("#update", updateHandler);
