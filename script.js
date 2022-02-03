// clois
// daguil 2022
// "bad code that works is just code" - abraham lincoln

palette = {
	PRINT: {
		cmd: "print",
		params: true
	},
	CLS: {
		cmd: "cls()",
		params: false
	},
	WHY: {
		cmd: "print('because making a gui is too damn hard')",
		params: false
	},
	HELP: {
		cmd: "print('commands: '+Object.keys(palette).toString())",
		params: false
	},
	BEEP: {
		cmd: "beep()",
		params: false
	},
	REBOOT: {
		cmd: "print('rebooting'); boot()",
		params: false
	}
}

sound = new Audio('beep.wav');
canGrab = false;
keyInput = "";
currentDir = ""
okKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '\b', ' ']
code2sym = {

}

function beep() {
	sound.play()
}

function print(text) {
	if (document.body.innerHTML !== "" && !text.includes(" -nbr")) {
		console.log(text)
		document.body.innerHTML += "<br>"
		if (!text.includes(" -nbr")) {}
	}
	text = text.replace(" -nbr", "");
	document.body.innerHTML += text
	window.scrollTo(0, document.body.scrollHeight);
}

function cls() {
	document.body.innerHTML = ""
}

function prompt() {
	keyInput = ""
	print(currentDir + "> ")
	canGrab = true
}

function sendCommand() {
	console.log(keyInput)
	canGrab = false
	if (palette.hasOwnProperty(keyInput.split(" ")[0])) {
		console.log("a")
		try {
			if (keyInput.includes(" ")) {
				let param = keyInput.split(" ")
				param[0] = ""
				param = param.join(" ")
				param = param.split("")
				param[0] = ""
				param = param.join("")
				eval(palette[keyInput.split(" ")[0]]["cmd"] + "('" + param + "')")
			} else {
				eval(palette[keyInput]["cmd"])
			}
		} catch (err) {
			print("ERROR! Command " + keyInput + " failed with error: " + err)
			beep()
		}
	} else if (keyInput == "" || keyInput == " ") {

	} else {
		print("ERROR! Command not found: " + keyInput)
		beep()
	}
	prompt()
}

function grabKeys(keyCode) {
	let key = String.fromCharCode(keyCode)
	//console.log(keyCode)
	if (canGrab == true && okKeys.includes(key)) {
		if (key == "" && keyInput !== "") {
			keyInput = keyInput.split("")
			let body = document.body.innerHTML.split("")
			keyInput[keyInput.length - 1] = ""
			body[body.length - 1] = ""
			body = body.join("")
			document.body.innerHTML = body
			keyInput = keyInput.join("")
		} else {
			if (key !== "") {
				keyInput += key
				document.body.innerHTML += key
			}
		}
	} else if (canGrab == true && keyCode == 13) {
		sendCommand()
	}
}

document.addEventListener('keydown', function(event) {
	grabKeys(event.keyCode)
});

function boot() {
	cls()
	setTimeout(function() {
		cls()
		beep()
		print("WELCOME TO CLOIS")
		prompt()
	}, 1000)
}