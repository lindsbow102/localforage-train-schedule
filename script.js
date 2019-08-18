document.getElementById("add-train").addEventListener("click", function(event) {
    event.preventDefault();

    // Variables for user input
    let name = document.getElementById("name-input").value.trim();
    let destination = document.getElementById("destination-input").value.trim();
    let trainTime = moment(document.getElementById("first-train-input").value.trim(), "HH:mm").subtract(1, "years").format("X"); // converts this to unix time
    let frequency = document.getElementById("frequency-input").value.trim();

    var remainder = moment().diff(moment.unix(trainTime), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    // set and get value for train name
    localforage.setItem("name", name).then(function() {
      localforage.getItem("name").then(function(value) {
        console.log("Train name: " + value);

        // set and get value for destination
        localforage.setItem("destination", destination).then(function() {
          localforage.getItem("destination").then(function(dvalue) {
              console.log("Train destination: " + dvalue);

              //set and get value for first train time
              localforage.setItem("trainTime", trainTime).then(function() {
                  localforage.getItem("trainTime").then(function(tvalue) {
                      console.log("First train: " + tvalue);

                      // set and get value for frequency
                      localforage.setItem("frequency", frequency).then(function() {
                          localforage.getItem("frequency").then(function(fvalue) {
                              console.log("Train frequency: " + fvalue);

                              // append train info to new row in the table body
                              document.getElementById("trainTableBody").insertAdjacentHTML(
                                  "beforeend",
                                  "<tr> <td>" +
                                    value +
                                    "</td> <td>" +
                                    dvalue +
                                    "</td> <td>" +
                                    fvalue +
                                    "</td> <td>" +
                                    arrival +
                                    "</td> <td>" +
                                    minutes +
                                    "</td> </tr>"
                                );
                              return fvalue;
                            });
                        });
                      return tvalue;
                    });
                });
              return dvalue;
            });
          return value;
        });
      });
    });

    alert("Train has been added!");

    // Clear user input fiels
    document.getElementById("name-input").value = "";
    document.getElementById("destination-input").value = "";
    document.getElementById("first-train-input").value = "";
    document.getElementById("frequency-input").value = "";
});