class PetanqueTournament {
    constructor() {
        this.players = [];
        this.currentRound = 0;
        this.playerStats = {};
        this.usedPartnerships = new Set();
        this.currentGames = [];
        this.gameResults = [];
        this.fieldCount = 2;
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
            throw new Error('Il faut au moins 4 joueurs pour former des équipes');
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

    setFieldCount(count) {
        this.fieldCount = Math.max(1, parseInt(count));
    }

    createGames(teams) {
        const games = [];
        const shuffledTeams = this.shuffleArray(teams);
        const maxGames = this.fieldCount;
        
        for (let i = 0; i < shuffledTeams.length && games.length < maxGames; i += 2) {
            if (i + 1 < shuffledTeams.length) {
                games.push({
                    id: games.length,
                    team1: shuffledTeams[i],
                    team2: shuffledTeams[i + 1],
                    field: (games.length % this.fieldCount) + 1,
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

    saveToLocalStorage() {
        const data = {
            players: this.players,
            currentRound: this.currentRound,
            playerStats: this.playerStats,
            usedPartnerships: Array.from(this.usedPartnerships),
            currentGames: this.currentGames,
            gameResults: this.gameResults,
            fieldCount: this.fieldCount
        };
        localStorage.setItem('petanqueTournament', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('petanqueTournament');
        if (saved) {
            const data = JSON.parse(saved);
            this.players = data.players || [];
            this.currentRound = data.currentRound || 0;
            this.playerStats = data.playerStats || {};
            this.usedPartnerships = new Set(data.usedPartnerships || []);
            this.currentGames = data.currentGames || [];
            this.gameResults = data.gameResults || [];
            this.fieldCount = data.fieldCount || 2;
            return true;
        }
        return false;
    }

    clearLocalStorage() {
        localStorage.removeItem('petanqueTournament');
    }
}

const tournament = new PetanqueTournament();

window.addEventListener('load', function() {
    if (tournament.loadFromLocalStorage()) {
        updatePlayersDisplay();
        updateStartButton();
        if (tournament.currentRound > 0) {
            document.getElementById('fieldCount').value = tournament.fieldCount;
            document.getElementById('tournamentSection').style.display = 'block';
            document.getElementById('standingsSection').style.display = 'block';
            document.getElementById('newTournamentBtn').style.display = 'inline-block';
            updateTournamentDisplay();
        }
    }
});

function addPlayer() {
    const input = document.getElementById('playerName');
    const name = input.value.trim();
    
    if (tournament.addPlayer(name)) {
        input.value = '';
        updatePlayersDisplay();
        updateStartButton();
        tournament.saveToLocalStorage();
    } else {
        alert('Veuillez entrer un nom de joueur valide et unique');
    }
}

function removePlayer(name) {
    tournament.removePlayer(name);
    updatePlayersDisplay();
    updateStartButton();
    tournament.saveToLocalStorage();
}

function updatePlayersDisplay() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = tournament.players.map(player => 
        `<div class="player-item">
            <span>${player}</span>
            <button onclick="removePlayer('${player}')" class="remove-btn">Retirer</button>
        </div>`
    ).join('');
}

function updateStartButton() {
    const startBtn = document.getElementById('startBtn');
    startBtn.disabled = tournament.players.length < 4;
}

function startTournament() {
    const fieldCount = document.getElementById('fieldCount').value;
    tournament.setFieldCount(fieldCount);
    
    document.getElementById('tournamentSection').style.display = 'block';
    document.getElementById('standingsSection').style.display = 'block';
    document.getElementById('newTournamentBtn').style.display = 'inline-block';
    tournament.startNewRound();
    tournament.saveToLocalStorage();
    updateTournamentDisplay();
}

function newTournament() {
    if (confirm('🔄 Êtes-vous sûr de vouloir commencer un nouveau tournoi? Tous les résultats actuels seront perdus.')) {
        tournament.clearLocalStorage();
        location.reload();
    }
}

function updateTournamentDisplay() {
    document.getElementById('roundInfo').innerHTML = `<h3>🎲 Manche ${tournament.currentRound}</h3>`;
    
    const gamesHtml = tournament.currentGames.map(game => 
        `<div class="game" id="game-${game.id}">
            <div class="field-header">🏟️ Terrain ${game.field}</div>
            ${game.result ? 
                `<div class="teams">
                    <span class="team">${game.team1.join(' & ')}</span>
                    <span class="vs">contre</span>
                    <span class="team">${game.team2.join(' & ')}</span>
                </div>
                <div class="result">🎯 Résultat: ${game.result.team1Score} - ${game.result.team2Score}</div>` :
                `<div class="score-input">
                    <div class="score-team">
                        <span class="score-team-name">${game.team1.join(' & ')}</span>
                        <input type="number" id="team1-${game.id}" placeholder="Points" min="0">
                    </div>
                    <div class="vs-score">contre</div>
                    <div class="score-team">
                        <span class="score-team-name">${game.team2.join(' & ')}</span>
                        <input type="number" id="team2-${game.id}" placeholder="Points" min="0">
                    </div>
                    <button onclick="recordResult(${game.id})">🏁 Enregistrer</button>
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
        alert('Veuillez entrer les points pour les deux équipes');
        return;
    }
    
    if (tournament.recordGameResult(gameId, team1Score, team2Score)) {
        tournament.saveToLocalStorage();
        updateTournamentDisplay();
    }
}

function nextRound() {
    tournament.startNewRound();
    tournament.saveToLocalStorage();
    updateTournamentDisplay();
}

function updateStandings() {
    const standings = tournament.getStandings();
    
    function getTrophyIcon(rank, points) {
        if (points === 0) return '';
        switch(rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '';
        }
    }
    
    function calculateRanks(standings) {
        const rankedStandings = [];
        let currentRank = 1;
        
        for (let i = 0; i < standings.length; i++) {
            if (i > 0 && (standings[i].points !== standings[i-1].points || standings[i].wins !== standings[i-1].wins)) {
                currentRank = i + 1;
            }
            rankedStandings.push({
                ...standings[i],
                rank: currentRank
            });
        }
        
        return rankedStandings;
    }
    
    const rankedStandings = calculateRanks(standings);
    
    const standingsHtml = `
        <table>
            <thead>
                <tr>
                    <th>🏆 Rang</th>
                    <th>👤 Joueur</th>
                    <th>🎯 Points</th>
                    <th>✅ Victoires</th>
                    <th>❌ Défaites</th>
                </tr>
            </thead>
            <tbody>
                ${rankedStandings.map((player) => {
                    const trophy = getTrophyIcon(player.rank, player.points);
                    return `<tr class="rank-${player.rank}">
                        <td>${trophy} ${player.rank}</td>
                        <td>${player.name}</td>
                        <td>${player.points}</td>
                        <td>${player.wins}</td>
                        <td>${player.losses}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('standings').innerHTML = standingsHtml;
}

function generateShareText() {
    const standings = tournament.getStandings().slice(0, 3);
    let text = `🎯 Tournoi de Pétanque - Manche ${tournament.currentRound}\n\n🏆 Podium:\n`;
    
    standings.forEach((player, index) => {
        const trophies = ['🥇', '🥈', '🥉'];
        const trophy = player.points > 0 ? trophies[index] || '🏅' : '🏅';
        text += `${trophy} ${index + 1}. ${player.name} - ${player.points} points (${player.wins}V/${player.losses}D)\n`;
    });
    
    text += `\n🎲 ${tournament.players.length} joueurs • ${tournament.fieldCount} terrains`;
    return text;
}

function shareResults(platform) {
    const text = generateShareText();
    const encodedText = encodeURIComponent(text);
    
    let url;
    switch(platform) {
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodedText}`;
            break;
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodedText}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodedText}`;
            break;
    }
    
    window.open(url, '_blank');
}

function copyResults() {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
        alert('📋 Résultats copiés dans le presse-papiers!');
    }).catch(() => {
        alert('❌ Erreur lors de la copie');
    });
}

document.getElementById('playerName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addPlayer();
    }
});