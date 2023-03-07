function send() {
  const xhttp = new XMLHttpRequest();
  let country = encodeURIComponent(document.getElementById("country").value);
  let denomination = encodeURIComponent(
    document.getElementById("denomination").value
  );
  let category = encodeURIComponent(document.getElementById("category").value);
  let alloy = encodeURIComponent(document.getElementById("alloy").value);
  let year = encodeURIComponent(document.getElementById("year").value);
  xhttp.open("POST", "ajax.php");

  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      get();
    }
  };

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(
    "acc=add&country=" +
      country +
      "&denomination=" +
      denomination +
      "&category=" +
      category +
      "&alloy=" +
      alloy +
      "&year=" +
      year
  );
}

function get() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "ajax.php");

  xhttp.onreadystatechange = function () {
    // console.log(this.readyState);
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText);
      console.log(json);
      document.getElementById("out").innerText = "";
      for (let i = 0; i < json.length; i++) {
        let contentDiv = document.createElement("div");
        contentDiv.classList.add("contentDiv");
        let RemoveRecord = document.createElement("button");
        RemoveRecord.classList.add("checkOrDelete");
        for (let j = 0; j < 5; j++) {
          let div = document.createElement("div");
          div.innerText = json[i][j];
          div.classList.add("innerDiv");
          contentDiv.appendChild(div);
        }
        contentDiv.appendChild(RemoveRecord);
        document.getElementById("out").appendChild(contentDiv);
      }
    }
  };

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("acc=get");
}
