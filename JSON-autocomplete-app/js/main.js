const search = document.getElementById("search");
const matchList = document.getElementById("match-list");

// Search states.json and filter it
const searchStates = async (searchText) => {
	const response = await fetch("../data/states.json");
	const states = await response.json();

	// console.log(states);
	// Get matches to current text input
	let matches = states.filter((state) => {
		const regex = new RegExp(`^${searchText}`, "gi");
		return state.name.match(regex) || state.abbr.match(regex);
	});
	if (searchText.length === 0) {
		// Stops the return of all 50 states when the search box text is deleted
		matches = [];
		// Clears the matchList html when search box text is deleted
		matchList.innerHTML = "";
	}

	// console.log(matches);

	outputHtml(matches);
};

// Show results in HTML
const outputHtml = (matches) => {
	if (matches.length > 0) {
		const html = matches
			.map(
				(match) => `
            <div class="card card-body mb-4">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `
			)
			.join("");

		// console.log(html);
		matchList.innerHTML = html;
	}
};
search.addEventListener("input", () => searchStates(search.value));
