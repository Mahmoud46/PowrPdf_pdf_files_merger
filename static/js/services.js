import { DOM } from "./dom.js";

import { STATUS } from "./status.js";

export function addCardToCardContainer(originalName, fileName, code) {
	DOM.cardContainer.innerHTML += `
                            <div class="card" code="${code}">
                                <p title="${originalName}" class="name"><img src="./static/assets/pdf-icon.svg" width="30px" alt="">${fileName}</p>
                                <button class="delete" title="Remove"><span class="material-symbols-outlined">close</span></button>
                            </div>
                        `;
	DOM.fileCount.innerText = ++STATUS.count;
	activateDeleteCard();
}

export function activateDeleteCard() {
	let cards = document.querySelectorAll(".card");
	cards.forEach((card) => {
		card.querySelector(".delete").addEventListener("click", (e) => {
			e.target.parentNode.parentNode.remove();
			DOM.downloadBtn.classList.contains("inactive")
				? null
				: DOM.downloadBtn.classList.add("inactive");
			DOM.fileCount.innerText = --STATUS.count;
			checkEmpty();
		});
	});
}

export function mergePDFS() {
	let filesCode = [],
		cards = document.querySelectorAll(".card");
	cards.forEach((card) => filesCode.push(card.getAttribute("code")));
	sendDataToSurver(filesCode);
}

export function downloadMergedFile(src) {
	if (STATUS.src_pre != src) {
		STATUS.src_pre = src;
		let link = document.createElement("a"),
			lenght = src.split("/").lenght;
		link.href = src;
		link.download = src.split("/")[lenght - 1];
		link.click();
	}
}

export function checkEmpty() {
	if (document.querySelectorAll(".card").length == 0) {
		DOM.downloadBtn.classList.add("inactive");
		DOM.mergeBtn.classList.add("inactive");
	} else {
		DOM.mergeBtn.classList.remove("inactive");
	}
}

export function sendDataToSurver(filesCode) {
	DOM.layout.classList.add("active");
	fetch(`${window.origin}/request`, {
		method: "POST",
		credentials: "include",
		body: JSON.stringify({ codes: filesCode }),
		cache: "no-cache",
		headers: new Headers({
			"content-type": "application/json",
		}),
	}).then((response) => {
		if (response.status !== 200) {
			DOM.layout.classList.remove("active");
			DOM.errorWindow.classList.add("active");
			console.log(`Response status was not 200: ${response.status}`);
			return;
		}
		response.json().then((data) => {
			setTimeout((_) => {
				DOM.layout.classList.remove("active");
				DOM.downloadBtn.classList.contains("inactive")
					? DOM.downloadBtn.classList.remove("inactive")
					: null;
				DOM.downloadBtn.addEventListener("click", (_) => {
					downloadMergedFile(data["path"]);
					setTimeout(
						(_) =>
							DOM.downloadBtn.classList.contains("inactive")
								? null
								: DOM.downloadBtn.classList.add("inactive"),
						1000,
					);
				});
			}, 5000);
		});
	});
}
