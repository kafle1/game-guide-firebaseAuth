//Make admin to a user
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");

  addAdminRole({ email: adminEmail }).then((result) => {
    M.toast({
      html: `${result.message}`,
      classes: "rounded green darken-1 white-color",
    });
  });
});

//Listen for authenticaton state changed
auth.onAuthStateChanged((user) => {
  if (user) {
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    });
    //When user is logged in
    db.collection("guides").onSnapshot(
      (snapshot) => {
        setupGuide(snapshot.docs);
      },
      (err) => {
        console.log(err);
      }
    );
  } else {
    //When user is logged out
    setupGuide([]);
    setupUI();
  }
});

//Create new guide
const createGuideForm = document.querySelector("#create-guide");
createGuideForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = createGuideForm.title.value;
  let content = createGuideForm.content.value;

  db.collection("guides")
    .add({
      title: title,
      content: content,
    })
    .then(() => {
      //Close the create new guide form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      //Clear the previous values of form
      createGuideForm.reset();
      M.toast({
        html: `New guide added successfully !`,
        classes: "rounded blue darken-1 white-color",
      });
    })
    .catch((error) => {
      M.toast({
        html: `${error.message}`,
        classes: "rounded red darken-1 white-color",
      });
    });
});

//Signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get user input data
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const bio = signupForm.bio.value;

  //Signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: bio,
      });
    })
    .then(() => {
      //Close the signup form
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      //Clear the previous values of form
      signupForm.reset();
      M.toast({
        html: `Signed up Successfully !`,
        classes: "rounded green darken-1 white-color",
      });
    })
    .catch((error) => {
      M.toast({
        html: `${error.message}`,
        classes: "rounded red darken-1 white-color",
      });
    });
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();

  auth
    .signOut()
    .then(() => {
      M.toast({
        html: `Logged out successfully !`,
        classes: "rounded blue darken-1 white-color",
      });
    })
    .catch((error) => {
      M.toast({
        html: `${error.message}`,
        classes: "rounded red darken-1 white-color",
      });
    });
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Get user input data
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  //Login the user
  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      //Close the login form
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      //Clear the previous values of form
      loginForm.reset();
      M.toast({
        html: `Logged in successfully !`,
        classes: "rounded green darken-1 white-color",
      });
    })
    .catch((error) => {
      M.toast({
        html: `${error.message}`,
        classes: "rounded red darken-1 white-color",
      });
    });
});
