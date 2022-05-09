# Modal a11y Proof of Concept

This repository exists to illustrate an accessibility issue with the InstUI Modal
component. The a11y issue is as follows:

If you try to show an alert to a user immediately after closing the Modal, the
alert will not be read by screenreaders, or at least VoiceOver on macOS. This
is likely due to the Modal returning focus to the element that caused it to open.
This focus change seems to "steamroll" the alert, likely making the screenreader
think the user has tabbed away almost as soon as it starts reading out the alert.

To test this issue, clone the repository, install the dependencies, and then
open http://localhost:3000 in Safari on macOS.

```bash
git clone https://github.com/Hawkbawk/modal-a11y-poc
npm install
npm start
```

Next, enable screenreader, tab into the web page, activate the modal,
and try and submit the form, either unsuccessfully
or successfully (both options are available simply for illustration purposes).
You'll notice that after the Modal closes, the screenreader only reads out the
"Open the modal" button, not the alerts that just appeared on the screen, which
breaks a major rule of accessibility.
