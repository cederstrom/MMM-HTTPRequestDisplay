/* Module */

/* Magic Mirror
 * Module: MMM-HTTPRequestDisplay
 *
 * By Eunan Camilleri eunancamilleri@gmail.com
 * v1.0 23/06/2016
 * MIT Licensed.
 */

Module.register("MMM-HTTPRequestDisplay",{

	// Default module config.
	defaults: {
		urls: {}
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.loaded = false;
		this.nodeNames = "";
	},

	sendRequest: function(id) {
		var self = this;

		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", this.config.urls[id], true);
		xhttp.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status !== 200) {
					self.sendNotification("SHOW_ALERT", {
						title: "HTTP Status: " + this.status,
						message: "Something went wrong during the request",
						timer: 3000
					});
				}
			}
		};
		xhttp.send();
	},

	// Override socket notification handler.
    socketNotificationReceived: function(notification, payload) {
        if (notification === "BACKGROUND_HTTP_REQUEST")
        {
        	this.sendRequest(payload.id);
        }
    },

});
