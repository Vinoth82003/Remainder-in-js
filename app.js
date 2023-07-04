console.log("app.js");
// localStorage.setItem("id", "0");
// localStorage.clear();
// Check if the ID is null and set it to 0 if it doesn't exist
if (localStorage.getItem("id") === null) {
  localStorage.setItem("id", "0");
}

const ul = document.querySelector("ul");
const add = document.querySelector(".add");

// function setNotification(time) {
//   const currentDate = new Date();
//   const currentTime = currentDate.toLocaleTimeString([], {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   const listTime = time;

//   // Compare only hours and minutes for notification
//   const currentTimeHM = currentTime.substr(0, 5);
//   setInterval(() => {
//     if (listTime === currentTimeHM) {

//     }
//   }, 1000);
// }

function deleteList(delBtn, i) {
  localStorage.removeItem(`list_${i}`);
  delBtn.parentNode.remove();
}

function createList(name, time) {
  const id = localStorage.getItem("id");
  const newId = parseInt(id) + 1;

  let li = document.createElement("li");
  li.className = "list";

  let pId = document.createElement("p");
  pId.className = "id";
  pId.innerText = `${newId}`;
  li.appendChild(pId);

  let pName = document.createElement("p");
  pName.className = "name";
  pName.innerText = name;
  li.appendChild(pName);

  let pTime = document.createElement("p");
  pTime.className = "time";
  pTime.innerText = time;
  li.appendChild(pTime);

  let delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "delete";
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", function () {
    deleteList(delBtn, newId);
  });
  li.appendChild(delBtn);

  localStorage.setItem("id", newId);
  ul.appendChild(li);

  setNotification(time, name);
}

function setItem(name, time) {
  const id = localStorage.getItem("id");
  localStorage.setItem(`list_${id}`, JSON.stringify({ name, time }));
}

add.onclick = function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const time = document.getElementById("time").value;
  // const  = document.getElementById("").value;

  // Validate input
  if (name.trim() === "" || time.trim() === "") {
    alert("Please enter a name and time for the list item.");
    return;
  }
  if (ul.childNodes.length === 0) {
    localStorage.setItem("id", 0);
  }

  createList(name, time);
  setItem(name, time);
  document.getElementById("name").value = "";
  document.getElementById("time").value = "";
};

function createNewList(liname, time, i) {
  let li = document.createElement("li");
  li.className = "list";

  let pId = document.createElement("p");
  pId.className = "id";
  pId.innerText = `${i}`;
  li.appendChild(pId);

  let pName = document.createElement("p");
  pName.className = "name";
  pName.innerText = liname;
  li.appendChild(pName);

  let pTime = document.createElement("p");
  pTime.className = "time";
  pTime.innerText = time;
  li.appendChild(pTime);

  let delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "delete";
  delBtn.innerText = "delete";
  delBtn.addEventListener("click", function () {
    deleteList(delBtn, i);
  });
  li.appendChild(delBtn);

  ul.appendChild(li);
}

var len = localStorage.getItem("id");
console.log(len);

for (let i = 1; i <= parseInt(len); i++) {
  var listItem = JSON.parse(localStorage.getItem(`list_${i}`));
  if (listItem) {
    createNewList(listItem.name, listItem.time, i);
    setNotification(listItem.time, listItem.name);
  }
}

function setNotification(time, message) {
  let interval = setInterval(() => {
    var date = new Date();
    var currentTime = date.getHours() + ":" + date.getMinutes();
    if (time === currentTime) {
      if ("Notification" in window) {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            const notification = new Notification("Remainder!", {
              body: ` this is time for ${message}`,
            });
            if (notification) {
              clearInterval(interval, 0);
            }
            notification.onclick = function () {
              console.log("notified..!");

              interval = new interval();
            };
          }
        });
      }
    }
  }, 1000);
}
