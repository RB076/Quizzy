const dutchNames = [
    "Daan", "Bram", "Sophie", "Noah", "Sanne", "Lars", "Emma", "Jasper", "Mila", "Thomas",
    "Jan", "Sjoerd", "Hendrik", "Willem", "Joris", "Koen", "Bas", "Timo", "Rick", "Sven",
    "Martijn", "Ruben", "Niels", "Gijs", "Thijs", "Maarten", "Stijn", "Floris", "Joost", "Bram",
    "Diederik", "Luuk", "Jesse", "Cas", "Sebastiaan", "Anne", "Laura", "Marieke", "Lotte", "Iris",
    "Eva", "Julia", "Femke", "Lieke", "Lisa", "Bo", "Fleur", "Esmee", "Karlijn", "Ilse"
];


function getRandomNames(array, count) {
    let shuffled = [...array].sort(() => 0.5 - Math.random()); 
    return shuffled.slice(0, count);
}

function generateLeaderboard() {
    const leaderboard = document.getElementById("leaderboard");

    // Get 15 random names
    const selectedNames = getRandomNames(dutchNames, 15);

    // Create player objects with random scores
    const players = selectedNames.map(name => ({
        name,
        score: Math.floor(Math.random() * 16)
    }));

    players.sort((a, b) => b.score - a.score);

    players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${index + 1}</td><td>${player.name}</td><td>${player.score}</td>`;
        leaderboard.appendChild(row);
    });
}

generateLeaderboard();