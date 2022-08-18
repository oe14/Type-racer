const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("scrh1");
let s = "0";
let score = 0;
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 65) {
		document.getElementById("audio").play();
	}
});
quoteInputElement.addEventListener("input", () => {
	const arrayQuote = quoteDisplayElement.querySelectorAll("span");
	const arrayValue = quoteInputElement.value.split("");

	let correct = true;
	arrayQuote.forEach((characterSpan, index) => {
		const character = arrayValue[index];
		if (character == null) {
			characterSpan.classList.remove("correct");
			characterSpan.classList.remove("incorrect");
			correct = false;
		} else if (character === characterSpan.innerText) {
			characterSpan.classList.add("correct");
			characterSpan.classList.remove("incorrect");
		} else {
			characterSpan.classList.remove("correct");
			characterSpan.classList.add("incorrect");
			correct = false;
		}
	});
	if (correct) {
		score += 1;
		s = score.toString();
		renderNewQuote();
	}
});
let reset = false;
function resetclicked() {
	reset = true;
	return reset;
}
let maxn = 0;
function quoteenable() {
	document.getElementById("quoteInput").disabled = false;
	document.getElementById("quoteInput").focus();
}
function getRandomQuote() {
	return fetch(RANDOM_QUOTE_API_URL)
		.then((response) => response.json())
		.then((data) => data.content);
}

async function renderNewQuote() {
	const quote = await getRandomQuote();
	scoreElement.innerHTML = "score " + s;
	quoteDisplayElement.innerHTML = "";
	quote.split("").forEach((character) => {
		const characterSpan = document.createElement("span");
		characterSpan.innerText = character;
		quoteDisplayElement.appendChild(characterSpan);
	});
	quoteInputElement.value = null;
}
let i = 0;
let startTime;

function getTimerTime() {
	return Math.floor((new Date() - startTime) / 1000);
}

function max(n) {
	if (n == 30) {
		maxn = 30;
		document.getElementById("quoteInput").focus();
		timerElement.innerText = 0;
		startTime = new Date();
		var loop = setInterval(() => {
			i++;
			timer.innerText = maxn - getTimerTime();

			if (i >= maxn) {
				clearInterval(loop);
				alert("time's up!");
				timerElement.innerText = 0;
			}
			if (reset == true) {
				clearInterval(loop);

				timerElement.innerText = 0;
			}
		}, 1000);
	}
	if (n == 60) {
		maxn = 60;
		document.getElementById("quoteInput").focus();
		timerElement.innerText = 0;
		startTime = new Date();
		var loop = setInterval(() => {
			i++;
			timer.innerText = maxn - getTimerTime();

			if (i >= maxn) {
				clearInterval(loop);
				alert("time's up!");
				timerElement.innerText = 0;
			}
			if (reset == true) {
				clearInterval(loop);

				timerElement.innerText = 0;
			}
		}, 1000);
	}
	if (n == 120) {
		maxn = 120;
		document.getElementById("quoteInput").focus();
		timerElement.innerText = 0;
		startTime = new Date();
		var loop = setInterval(() => {
			i++;
			timer.innerText = maxn - getTimerTime();

			if (i >= maxn) {
				clearInterval(loop);
				alert("time's up!");
				timerElement.innerText = 0;
			}
			if (reset == true) {
				clearInterval(loop);

				timerElement.innerText = 0;
			}
		}, 1000);
	}
}
renderNewQuote();
