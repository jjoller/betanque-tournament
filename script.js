class CurlingTournament {
    constructor() {
        this.players = [];
        this.currentRound = 0;
        this.playerStats = {};
        this.usedPartnerships = new Set();
        this.currentGames = [];
        this.gameResults = [];
    }

    addPlayer(name) {
        if (name && !this.players.includes(name)) {
            this.players.push(name);
            this.playerStats[name] = { wins: 0, losses: 0, points: 0 };
            return true;
        }
        return false;
    }

    removePlayer(name) {
        const index = this.players.indexOf(name);
        if (index > -1) {
            this.players.splice(index, 1);
            delete this.playerStats[name];
            return true;
        }
        return false;
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    getPartnershipKey(player1, player2) {
        return [player1, player2].sort().join('-');
    }

    formTeams() {
        if (this.players.length < 4) {
            throw new Error('Need at least 4 players to form teams');
        }

        const totalPlayers = this.players.length;
        const extraPlayers = totalPlayers % 4;
        let teamsOf3Needed = 0;
        
        if (extraPlayers === 1) {
            teamsOf3Needed = 1;
        } else if (extraPlayers === 2) {
            teamsOf3Needed = 2;
        } else if (extraPlayers === 3) {
            teamsOf3Needed = 1;
        }

        const shuffledPlayers = this.shuffleArray(this.players);
        const teams = [];
        const tempUsedPartnerships = new Set();

        for (let attempts = 0; attempts < 100; attempts++) {
            teams.length = 0;
            tempUsedPartnerships.clear();
            
            const availablePlayers = [...shuffledPlayers];
            let success = true;
            let teamsOf3Created = 0;

            while (availablePlayers.length > 0) {
                if (availablePlayers.length === 3 || 
                    (availablePlayers.length === 5 && teamsOf3Created < teamsOf3Needed) ||
                    (availablePlayers.length >= 3 && teamsOf3Created < teamsOf3Needed && teams.length >= Math.floor(totalPlayers / 4) * 2 - teamsOf3Needed)) {
                    
                    const player1 = availablePlayers.shift();
                    const player2 = availablePlayers.shift();
                    const player3 = availablePlayers.shift();
                    teams.push([player1, player2, player3]);
                    teamsOf3Created++;
                } else if (availablePlayers.length >= 2) {
                    const player1 = availablePlayers.shift();
                    let partner = null;
                    
                    for (let i = 0; i < availablePlayers.length; i++) {
                        const potentialPartner = availablePlayers[i];
                        const partnershipKey = this.getPartnershipKey(player1, potentialPartner);
                        
                        if (!this.usedPartnerships.has(partnershipKey) && !tempUsedPartnerships.has(partnershipKey)) {
                            partner = potentialPartner;
                            availablePlayers.splice(i, 1);
                            tempUsedPartnerships.add(partnershipKey);
                            break;
                        }
                    }

                    if (partner) {
                        teams.push([player1, partner]);
                    } else {
                        success = false;
                        break;
                    }
                } else {
                    break;
                }
            }

            if (success && availablePlayers.length === 0) {
                tempUsedPartnerships.forEach(key => this.usedPartnerships.add(key));
                return teams;
            }

            this.shuffleArray(shuffledPlayers);
        }

        this.usedPartnerships.clear();
        return this.formTeams();
    }

    createGames(teams) {
        const games = [];
        const shuffledTeams = this.shuffleArray(teams);
        
        for (let i = 0; i < shuffledTeams.length; i += 2) {
            if (i + 1 < shuffledTeams.length) {
                games.push({
                    id: games.length,
                    team1: shuffledTeams[i],
                    team2: shuffledTeams[i + 1],
                    result: null
                });
            }
        }
        
        return games;
    }

    recordGameResult(gameId, team1Score, team2Score) {
        const game = this.currentGames.find(g => g.id === gameId);
        if (!game) return false;

        game.result = { team1Score: parseInt(team1Score), team2Score: parseInt(team2Score) };
        
        const winningTeam = team1Score > team2Score ? game.team1 : game.team2;
        const losingTeam = team1Score > team2Score ? game.team2 : game.team1;
        
        winningTeam.forEach(player => {
            this.playerStats[player].wins++;
            this.playerStats[player].points += parseInt(team1Score > team2Score ? team1Score : team2Score);
        });
        
        losingTeam.forEach(player => {
            this.playerStats[player].losses++;
            this.playerStats[player].points += parseInt(team1Score > team2Score ? team2Score : team1Score);
        });

        this.gameResults.push({
            round: this.currentRound,
            ...game
        });

        return true;
    }

    allGamesCompleted() {
        return this.currentGames.every(game => game.result !== null);
    }

    startNewRound() {
        this.currentRound++;
        const teams = this.formTeams();
        this.currentGames = this.createGames(teams);
        return this.currentGames;
    }

    getStandings() {
        return Object.entries(this.playerStats)
            .map(([name, stats]) => ({ name, ...stats }))
            .sort((a, b) => b.points - a.points || b.wins - a.wins);
    }
}

const tournament = new CurlingTournament();

function addPlayer() {
    const input = document.getElementById('playerName');
    const name = input.value.trim();
    
    if (tournament.addPlayer(name)) {
        input.value = '';
        updatePlayersDisplay();
        updateStartButton();
    } else {
        alert('Please enter a valid, unique player name');
    }
}

function removePlayer(name) {
    tournament.removePlayer(name);
    updatePlayersDisplay();
    updateStartButton();
}

function updatePlayersDisplay() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = tournament.players.map(player => 
        `<div class="player-item">
            <span>${player}</span>
            <button onclick="removePlayer('${player}')" class="remove-btn">Remove</button>
        </div>`
    ).join('');
}

function updateStartButton() {
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = tournament.players.length < 4;
}

function startTournament() {
    document.getElementById('tournamentSection').style.display = 'block';
    document.getElementById('standingsSection').style.display = 'block';
    tournament.startNewRound();
    updateTournamentDisplay();
}

function updateTournamentDisplay() {
    document.getElementById('roundInfo').innerHTML = `<h3>Round ${tournament.currentRound}</h3>`;
    
    const gamesHtml = tournament.currentGames.map(game => 
        `<div class="game" id="game-${game.id}">
            ${game.result ? 
                `<div class="teams">
                    <span class="team">${game.team1.join(' & ')}</span>
                    <span class="vs">vs</span>
                    <span class="team">${game.team2.join(' & ')}</span>
                </div>
                <div class="result">Result: ${game.result.team1Score} - ${game.result.team2Score}</div>` :
                `<div class="score-input">
                    <div class="score-team">
                        <span class="score-team-name">${game.team1.join(' & ')}</span>
                        <input type="number" id="team1-${game.id}" placeholder="Score" min="0">
                    </div>
                    <div class="vs-score">vs</div>
                    <div class="score-team">
                        <span class="score-team-name">${game.team2.join(' & ')}</span>
                        <input type="number" id="team2-${game.id}" placeholder="Score" min="0">
                    </div>
                    <button onclick="recordResult(${game.id})">Record</button>
                </div>`
            }
        </div>`
    ).join('');
    
    document.getElementById('currentGames').innerHTML = gamesHtml;
    
    const allCompleted = tournament.allGamesCompleted();
    document.getElementById('nextRoundBtn').style.display = allCompleted ? 'block' : 'none';
    
    updateStandings();
}

function recordResult(gameId) {
    const team1Score = document.getElementById(`team1-${gameId}`).value;
    const team2Score = document.getElementById(`team2-${gameId}`).value;
    
    if (team1Score === '' || team2Score === '') {
        alert('Please enter scores for both teams');
        return;
    }
    
    if (tournament.recordGameResult(gameId, team1Score, team2Score)) {
        updateTournamentDisplay();
    }
}

function nextRound() {
    tournament.startNewRound();
    updateTournamentDisplay();
}

function updateStandings() {
    const standings = tournament.getStandings();
    const standingsHtml = `
        <table>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Player</th>
                    <th>Points</th>
                    <th>Wins</th>
                    <th>Losses</th>
                </tr>
            </thead>
            <tbody>
                ${standings.map((player, index) => 
                    `<tr>
                        <td>${index + 1}</td>
                        <td>${player.name}</td>
                        <td>${player.points}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                    </tr>`
                ).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('standings').innerHTML = standingsHtml;
}

document.getElementById('playerName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addPlayer();
    }
});