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
function deleteRecord(e) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "ajax.php");
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("acc=delete&deleteRecord=" + e.target.id);
}

function createTable(json, i) {
  let contentDiv = document.createElement("div");
  contentDiv.classList.add("contentDiv");
  let RemoveRecord = document.createElement("button");
  RemoveRecord.classList.add("checkOrDelete");
  RemoveRecord.setAttribute("id", json[i][5]);
  for (let j = 0; j < 5; j++) {
    let div = document.createElement("div");
    div.classList.add("innerDiv");
    if (j === 0) {
      let img = document.createElement("img");
      img.src = `gfx/${json[i][0]}.jpg`;
      img.height = "25";
      div.appendChild(img);
    } else {
      div.innerText = json[i][j];
    }
    contentDiv.appendChild(div);
  }
  contentDiv.appendChild(RemoveRecord);
  document.getElementById("out").appendChild(contentDiv);
  RemoveRecord.addEventListener("click", (e) => {
    deleteRecord(e); // send info about deleted record to ajax
    document.getElementById("out").removeChild(contentDiv);
  });
}

function get() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "ajax.php");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText);
      if (document.getElementById("out").children.length == json.length - 1) {
        createTable(json, json.length - 1);
      } else {
        for (let i = 0; i < json.length; i++) {
          createTable(json, i);
        }
      }
    }
  };

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("acc=get");
}
