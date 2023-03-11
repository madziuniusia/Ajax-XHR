let modalForm = false;
let updateRecordID;
let tableForm = document.getElementById("tableForm");
let underAddRecordDiv = document.getElementById("underAddRecord");
let outDiv = document.getElementById("out");

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

  if (!modalForm) {
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
  } else {
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(
      "acc=update&country=" +
        country +
        "&denomination=" +
        denomination +
        "&category=" +
        category +
        "&alloy=" +
        alloy +
        "&year=" +
        year +
        "&id=" +
        updateRecordID
    );
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        modalForm = false;
        underAddRecordDiv.appendChild(tableForm);
        while (outDiv.firstChild) {
          outDiv.removeChild(outDiv.firstChild);
        }
        get();
      }
    };
  }
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
  for (let i = 0; i < contentDiv.children.length - 1; i++) {
    contentDiv.children[i].addEventListener("click", (e) => {
      if (!modalForm) {
        modalForm = true;
        updateRecordID = contentDiv.lastChild.id;
        document.getElementById("country").value = json[i][0];
        document.getElementById("denomination").value = json[i][1];
        document.getElementById("category").value = json[i][2];
        document.getElementById("alloy").value = json[i][3];
        document.getElementById("year").value = json[i][4];
        contentDiv.replaceChildren(tableForm);
      }
    });
  }
  outDiv.appendChild(contentDiv);
  contentDiv.appendChild(RemoveRecord);

  RemoveRecord.addEventListener("click", (e) => {
    deleteRecord(e); // send info about deleted record to ajax
    outDiv.removeChild(contentDiv);
  });
}

function get() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "ajax.php");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let json = JSON.parse(this.responseText);
      while (outDiv.firstChild) {
        outDiv.removeChild(outDiv.firstChild);
      }
      for (let i = 0; i < json.length; i++) {
        createTable(json, i);
      }
    }
  };

  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("acc=get");
}
