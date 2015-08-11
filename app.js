window.addEventListener("load", function() {
  console.log("Hello World!");
  if (!("Notification" in window)) {
    console.log("No notifications")
  } else {
    console.log("We have notifications!")
  }
});

function createNotification(title, message) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support notifications.");
  }
  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification

    // show the notification
    var notification = new Notification(title, { body: message });
    // And vibrate the device if it supports vibration API
    window.navigator.vibrate(500);
  }
  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure Chrome stores the information
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {

        // show the notification
        var notification = new Notification('Battery status', { body: message });
        // And vibrate the device if it supports vibration API
        window.navigator.vibrate(500);
      }
    });
  }
}

function Foo() {
  console.log("Foo called!")
  createNotification("This is FooButton", "You called Foo, but nobody answers!")
}