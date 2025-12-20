import { DOM } from "./dom.js";

import { addCardToCardContainer, mergePDFS, checkEmpty } from "./services.js";

export default function initEvents() {
	DOM.uploadBtn.addEventListener("click", (_) => DOM.fileInput.click());

	DOM.fileInput.addEventListener("input", (_) => {
		DOM.layout.classList.add("active");
		let file = DOM.fileInput.files[0];
		const file_name = file.name.split(".");
		if (
			file &&
			file.type == "application/pdf" &&
			file_name[file_name.length - 1] == "pdf"
		) {
			let reader = new FileReader();
			reader.onload = (_) => {
				let url = reader.result;
				addCardToCardContainer(
					file.name,
					file.name.length > 20
						? `${file.name.split("").splice(0, 20).join("")}..`
						: file.name,
					url
				);
				DOM.fileInput.value = "";
				DOM.layout.classList.remove("active");
				checkEmpty();
			};
			reader.readAsDataURL(file);
		} else {
			DOM.layout.classList.remove("active");
		}
	});

	DOM.mergeBtn.addEventListener("click", mergePDFS);

	DOM.clsErrorWindowBtn.addEventListener("click", (_) =>
		DOM.errorWindow.classList.remove("active")
	);
}
