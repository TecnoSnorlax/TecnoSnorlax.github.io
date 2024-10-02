var canvas = document.getElementById("starsCanvas");
var flr = Math.floor;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

var halfw = canvas.width / 2,
	halfh = canvas.height / 2,
	step = 2,
	warpZ = 3,
	speed = 0.075;
var stampedDate = new Date();

var ctx = canvas.getContext("2d");

ctx.fillStyle = "transparent";
ctx.fillRect(0, 0, canvas.width, canvas.height);

function rnd(num1, num2) {
	return flr(Math.random() * num2 * 2) + num1;
}

function getColor() {
	return "hsla(200,100%, " + rnd(50, 100) + "%, 1)";
}

var star = function () {
	var v = vec3.fromValues(
		rnd(0 - halfw, halfw),
		rnd(0 - halfh, halfh),
		rnd(1, warpZ)
	);

	this.x = v[0];
	this.y = v[1];
	this.z = v[2];
	this.color = getColor();

	this.reset = function () {
		v = vec3.fromValues(
			rnd(0 - halfw, halfw),
			rnd(0 - halfh, halfh),
			rnd(1, warpZ)
		);

		this.x = v[0];
		this.y = v[1];
		this.color = getColor();
		vel = this.calcVel();
	};

	this.calcVel = function () {
		return vec3.fromValues(0, 0, 0 - speed);
	};

	var vel = this.calcVel();

	this.draw = function () {
		vel = this.calcVel();
		v = vec3.add(vec3.create(), v, vel);
		var x = v[0] / v[2];
		var y = v[1] / v[2];
		var x2 = v[0] / (v[2] + speed * 0.5);
		var y2 = v[1] / (v[2] + speed * 0.5);

		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.moveTo(x, y);
		ctx.lineTo(x2, y2);
		ctx.stroke();

		if (x < 0 - halfw || x > halfw || y < 0 - halfh || y > halfh) {
			this.reset();
		}
	};
};

var starfield = function () {
	var numOfStars = 500;

	var stars = [];

	function _init() {
		for (var i = 0, len = numOfStars; i < len; i++) {
			stars.push(new star());
		}
	}

	_init();

	this.draw = function () {
		ctx.translate(halfw, halfh);

		for (var i = 0, len = stars.length; i < len; i++) {
			var currentStar = stars[i];

			currentStar.draw();
		}
	};
};

var mStarField = new starfield();

function draw() {
	var millSeconds = 1000 * 20;

	var currentTime = new Date();

	speed = 0.025;

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.fillStyle = "rgba(0,0,0,0.2)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	mStarField.draw();

	window.requestAnimationFrame(draw);
}

draw();

window.onresize = function () {
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;

	halfw = canvas.width / 2;
	halfh = canvas.height / 2;
};

function Countdown(elem, seconds) {
	var that = {};

	that.elem = elem;
	that.seconds = seconds;
	that.totalTime = seconds * 100;
	that.usedTime = 0;
	that.startTime = +new Date();
	that.timer = null;

	that.count = function () {
		that.usedTime = Math.floor((+new Date() - that.startTime) / 10);

		var tt = that.totalTime - that.usedTime;
		if (tt <= 0) {
			that.elem.innerHTML = "00:00.00";
			clearInterval(that.timer);
		} else {
			var mi = Math.floor(tt / (60 * 100));
			var ss = Math.floor((tt - mi * 60 * 100) / 100);
			var ms = tt - Math.floor(tt / 100) * 100;

			that.elem.innerHTML =
				that.fillZero(mi) + ":" + that.fillZero(ss) + "." + that.fillZero(ms);
		}
	};

	that.init = function () {
		if (that.timer) {
			clearInterval(that.timer);
			that.elem.innerHTML = "00:00.00";
			that.totalTime = seconds * 100;
			that.usedTime = 0;
			that.startTime = +new Date();
			that.timer = null;
		}
	};

	that.start = function () {
		if (!that.timer) {
			that.timer = setInterval(that.count, 1);
		}
	};

	that.stop = function () {
		console.log("usedTime = " + countdown.usedTime);
		if (that.timer) clearInterval(that.timer);
	};

	that.fillZero = function (num) {
		return num < 10 ? "0" + num : num;
	};

	return that;
}

$(".spaceshipAlert").css("visibility", "hidden");
$("#meteorites").css("visibility", "hidden");

$("#failMsg").hide();
$("#successMsg").hide();
$("#score").hide();
$("#question2").hide();
$("#question3").hide();
$(".endGame").hide();

$("a.wrong").click(function () {
	$("#time").hide();
	$("#failMsg").show();
	$("#score").show();
	var errors = parseInt($("#errorsCount").text());
	$("#errorsCount").text(errors + 1);

	setTimeout(function () {
		$(".spaceshipAlert").css("visibility", "visible");
		$("div.spaceship").toggleClass("spaceshipContainerShaked");
	}, 1000);

	setTimeout(function () {
		$("#meteorites").css("visibility", "visible");
	}, 2000);

	setTimeout(function () {
		$("#meteorites").css("visibility", "visible");
	}, 3000);

	setTimeout(function () {
		var num = parseInt($("#errorsCount").text());
		if (num == 1) {
			$("div.spaceship").css(
				"background-image",
				"url(https://drive.google.com/thumbnail?id=1l-dv7m_4mA7gZersFoVUSCA_YSX_3Wsk&sz=w3000)"
			);
		}
		if (num == 2) {
			$("div.spaceship").css(
				"background-image",
				"url(https://drive.google.com/thumbnail?id=1PFgLMXCR2R6s1jFMyLuSUvmPvJ3nAw2z&sz=w3000)"
			);
		}
		if (num == 3) {
			$("div.spaceship").css(
				"background-image",
				"url(https://drive.google.com/thumbnail?id=1_XBYha4cPemJ3OVY9jbUmIeAM5jGE4R3&sz=w3000)"
			);
		}
	}, 3000);

	setTimeout(function () {
		$("#meteorites").css("visibility", "hidden");
	}, 5000);

	setTimeout(function () {
		$("div.spaceship").toggleClass("spaceshipContainerShaked");
		$(".spaceshipAlert").css("visibility", "hidden");
	}, 6000);
});

$("#startBtn").click(function () {
	$("#start").hide("slow");
	var span = document.getElementById("time");
	var countdown = new Countdown(span, 180);
	countdown.start();
});

$("a.right").click(function () {
	$("#time").hide();
	$("#successMsg").show();
	$("#score").show();

	var num = parseInt($("#yourScore").text());
	$("#yourScore").text(num + 1);
	var span = document.getElementById("time");
});

$("#question1 a.right").click(function () {
	$("#question1").hide();
	setTimeout(function () {
		showQuestion2();
	}, 4000);
});

$("#question1 a.wrong").click(function () {
	$("#question1").hide();
	setTimeout(function () {
		showQuestion2();
	}, 10000);
});

$("#question2 a.right").click(function () {
	$("#question2").hide();
	setTimeout(function () {
		showQuestion3();
	}, 4000);
});

$("#question2 a.wrong").click(function () {
	$("#question2").hide();
	setTimeout(function () {
		showQuestion3();
	}, 10000);
});

$("#question3 a.right").click(function () {
	$("#question3").hide();
	var num = parseInt($("#errorsCount").text());
	if (num == 0) {
		setTimeout(function () {
			$("#perfect").show();
		}, 4000);
	}
	if (num == 1) {
		setTimeout(function () {
			$("#medium").show();
		}, 4000);
	}
	if (num == 2) {
		setTimeout(function () {
			$("#medium").show();
		}, 4000);
	}
});

$("#question3 a.wrong").click(function () {
	$("#question3").hide();
	var num = parseInt($("#errorsCount").text());
	if (num == 1) {
		setTimeout(function () {
			$("#medium").show();
		}, 4000);
	}
	if (num == 2) {
		setTimeout(function () {
			$("#medium").show();
		}, 4000);
	}
	if (num == 3) {
		setTimeout(function () {
			$("#fail").show();
		}, 1000);
		setTimeout(function () {
			$(".mini-explosion").hide();
		}, 3300);
	}
});

function showQuestion2() {
	$("#successMsg").hide();
	$("#failMsg").hide();
	$("#score").hide();
	$("#question2").show();
	$("#time").show();
}

function showQuestion3() {
	$("#successMsg").hide();
	$("#failMsg").hide();
	$("#score").hide();
	$("#question3").show();
	$("#time").show();
}

consoleText(
	[
		"Join the ultimate space race in AstroQuiz! Dodge asteroids by answering questions on time and lead your team to victory!"
	],
	"text",
	["white", "white", "white"]
);

function consoleText(words, id, colors) {
	if (colors === undefined) colors = ["#fff"];
	var visible = true;
	var con = document.getElementById("console");
	var letterCount = 1;
	var x = 1;
	var waiting = false;
	var target = document.getElementById(id);
	target.setAttribute("style", "color:" + colors[0]);
	window.setInterval(function () {
		if (letterCount === 0 && waiting === false) {
			waiting = true;
			target.innerHTML = words[0].substring(0, letterCount);
			window.setTimeout(function () {
				var usedColor = colors.shift();
				colors.push(usedColor);
				var usedWord = words.shift();
				words.push(usedWord);
				x = 1;
				target.setAttribute("style", "color:" + colors[0]);
				letterCount += x;
				waiting = false;
			}, 3000);
		} else if (letterCount === words[0].length + 1 && waiting === false) {
			waiting = true;
			window.setTimeout(function () {
				x = -1;
				letterCount += x;
				waiting = false;
			}, 3000);
		} else if (waiting === false) {
			target.innerHTML = words[0].substring(0, letterCount);
			letterCount += x;
		}
	}, 30);
	window.setInterval(function () {
		if (visible === true) {
			con.className = "console-underscore hidden";
			visible = false;
		} else {
			con.className = "console-underscore";

			visible = true;
		}
	}, 400);
}
