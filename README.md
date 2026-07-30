# Game Guide (Firebase Auth)

A vanilla JS game guide site with email/password login and an admin role, backed by Firebase.

## What it does

- Users sign up and log in with email and password (Firebase Authentication)
- Logged-in users can browse guides, which sync in real time from Firestore
- Admins can create new guides and promote other users to admin, via a callable
  Firebase Cloud Function (`addAdminRole`) that sets a custom `admin` claim

## Tech stack

- HTML, CSS, vanilla JavaScript, Materialize CSS
- Firebase Authentication, Firestore, and Cloud Functions

## How to run

The front end (`index.html`, `scripts/`) needs no build step — open `index.html` in a browser
or serve the folder with any static server. It talks to the Firebase project configured in
`index.html`.

To work on the Cloud Function:

```bash
cd functions
npm install
npm run serve   # run functions in the Firebase emulator
npm run deploy   # deploy to Firebase
```

## License

MIT — see [LICENSE](LICENSE).
