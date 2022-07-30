const RANDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("scrh1");
let score = 0;
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
		reset = true;
		renderNewQuote();
	}
});
let reset = false;
function resetclicked() {
	reset = true;
	return reset;
}
function timelimitfunc() {
	let timelimit = prompt("how long are you going to type for? (in seconds)");

	timerElement.innerText = 0;
	startTime = new Date();
	var loop = setInterval(() => {
		i++;
		timer.innerText = getTimerTime();

		if (i >= timelimit) {
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

function getRandomQuote() {
	return fetch(RANDOM_QUOTE_API_URL)
		.then((response) => response.json())
		.then((data) => data.content);
}

async function renderNewQuote() {
	const quote = await getRandomQuote();
	scoreElement.innerHTML = "score " + score;
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

renderNewQuote();
