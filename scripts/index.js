const guideList = document.querySelector(".guides");
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");

//Toggle different UI elements according to the logged in state of the user
const setupUI = (user) => {
  //When user is logged in

  if (user) {
    if (user.admin) {
      adminItems.forEach(item => {
        item.style.display = "block";
      });
    }
    //Show user's account details
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
      <div> Logged in as ${user.email} </div>
      <div> Bio: ${doc.data().bio} </div>
      <div class="pink-text"> ${user.admin ? "Admin" : ""} </div>
      `;
        accountDetails.innerHTML = html;
      });

    //Toggle nav bar elements
    loggedIn.forEach((menu) => {
      menu.style.display = "block";
    });
    loggedOut.forEach((menu) => {
      menu.style.display = "none";
    });
  } else {
    //When user is logged out

    adminItems.forEach(item => {
      item.style.display = "none";
    });
    //Hide user's account details
    accountDetails.innerHTML = "";

    //Toggle nav bar elements
    loggedIn.forEach((menu) => {
      menu.style.display = "none";
    });
    loggedOut.forEach((menu) => {
      menu.style.display = "block";
    });
  }
};

//Setup guide
const setupGuide = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      const li = `
      <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
      </li>
   `;
      html += li;
      guideList.innerHTML = html;
    });
  } else {
    guideList.innerHTML = `<h5 style="text-align: centre;">Login to view guides! <h5>`;
  }
};

// Setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
