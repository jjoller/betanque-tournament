const translations = {
    fr: {
        title: "Tournoi de Pétanque",
        addPlayer: "Ajouter un joueur",
        playerName: "Nom du joueur",
        playersCount: "joueurs",
        minPlayersError: "Il faut au moins 4 joueurs pour former des équipes",
        fieldCount: "Nombre de terrains",
        start: "Commencer le tournoi",
        newTournament: "🔄 Nouveau tournoi",
        confirmNewTournament: "🔄 Êtes-vous sûr de vouloir commencer un nouveau tournoi? Tous les résultats actuels seront perdus.",
        round: "Manche",
        field: "Terrain",
        against: "contre",
        result: "Résultat",
        points: "Points",
        record: "🏁 Enregistrer",
        nextRound: "Manche suivante",
        enterBothScores: "Veuillez entrer les points pour les deux équipes",
        validPlayerError: "Veuillez entrer un nom de joueur valide et unique",
        remove: "Retirer",
        rank: "Rang",
        player: "Joueur",
        wins: "Victoires",
        avgMargin: "Marge Moy.",
        totalPoints: "Points",
        defeats: "Défaites",
        podium: "Podium",
        share: "Partager",
        copy: "📋 Copier",
        copySuccess: "📋 Résultats copiés dans le presse-papiers!",
        copyError: "❌ Erreur lors de la copie",
        standings: "Classement",
        setup: "Configuration du Tournoi",
        players: "Joueurs",
        tournament: "Progression du Tournoi",
        downloadCSV: "📊 Télécharger Tableau"
    },
    en: {
        title: "Pétanque Tournament",
        addPlayer: "Add player",
        playerName: "Player name",
        playersCount: "players",
        minPlayersError: "At least 4 players are needed to form teams",
        fieldCount: "Number of fields",
        start: "Start tournament",
        newTournament: "🔄 New tournament",
        confirmNewTournament: "🔄 Are you sure you want to start a new tournament? All current results will be lost.",
        round: "Round",
        field: "Field",
        against: "vs",
        result: "Result",
        points: "Points",
        record: "🏁 Record",
        nextRound: "Next round",
        enterBothScores: "Please enter points for both teams",
        validPlayerError: "Please enter a valid and unique player name",
        remove: "Remove",
        rank: "Rank",
        player: "Player",
        wins: "Wins",
        avgMargin: "Avg. Margin",
        totalPoints: "Points",
        defeats: "Defeats",
        podium: "Podium",
        share: "Share",
        copy: "📋 Copy",
        copySuccess: "📋 Results copied to clipboard!",
        copyError: "❌ Copy error",
        standings: "Standings",
        setup: "Tournament Setup",
        players: "Players",
        tournament: "Tournament Progress",
        downloadCSV: "📊 Download Table"
    },
    de: {
        title: "Pétanque Turnier",
        addPlayer: "Spieler hinzufügen",
        playerName: "Spielername",
        playersCount: "Spieler",
        minPlayersError: "Mindestens 4 Spieler sind nötig um Teams zu bilden",
        fieldCount: "Anzahl Felder",
        start: "Turnier starten",
        newTournament: "🔄 Neues Turnier",
        confirmNewTournament: "🔄 Sind Sie sicher, dass Sie ein neues Turnier starten möchten? Alle aktuellen Ergebnisse gehen verloren.",
        round: "Runde",
        field: "Feld",
        against: "gegen",
        result: "Ergebnis",
        points: "Punkte",
        record: "🏁 Speichern",
        nextRound: "Nächste Runde",
        enterBothScores: "Bitte geben Sie Punkte für beide Teams ein",
        validPlayerError: "Bitte geben Sie einen gültigen und eindeutigen Spielernamen ein",
        remove: "Entfernen",
        rank: "Rang",
        player: "Spieler",
        wins: "Siege",
        avgMargin: "Durchschn. Marge",
        totalPoints: "Punkte",
        defeats: "Niederlagen",
        podium: "Podium",
        share: "Teilen",
        copy: "📋 Kopieren",
        copySuccess: "📋 Ergebnisse in Zwischenablage kopiert!",
        copyError: "❌ Kopierfehler",
        standings: "Rangliste",
        setup: "Turnier Konfiguration",
        players: "Spieler",
        tournament: "Turnier Fortschritt",
        downloadCSV: "📊 Tabelle Herunterladen"
    },
    it: {
        title: "Torneo di Pétanque",
        addPlayer: "Aggiungi giocatore",
        playerName: "Nome giocatore",
        playersCount: "giocatori",
        minPlayersError: "Servono almeno 4 giocatori per formare le squadre",
        fieldCount: "Numero di campi",
        start: "Inizia torneo",
        newTournament: "🔄 Nuovo torneo",
        confirmNewTournament: "🔄 Sei sicuro di voler iniziare un nuovo torneo? Tutti i risultati attuali andranno persi.",
        round: "Partita",
        field: "Campo",
        against: "contro",
        result: "Risultato",
        points: "Punti",
        record: "🏁 Registra",
        nextRound: "Prossima partita",
        enterBothScores: "Inserisci i punti per entrambe le squadre",
        validPlayerError: "Inserisci un nome giocatore valido e unico",
        remove: "Rimuovi",
        rank: "Posizione",
        player: "Giocatore",
        wins: "Vittorie",
        avgMargin: "Margine Med.",
        totalPoints: "Punti",
        defeats: "Sconfitte",
        podium: "Podio",
        share: "Condividi",
        copy: "📋 Copia",
        copySuccess: "📋 Risultati copiati negli appunti!",
        copyError: "❌ Errore copia",
        standings: "Classifica",
        setup: "Configurazione Torneo",
        players: "Giocatori",
        tournament: "Progresso Torneo",
        downloadCSV: "📊 Scarica Tabella"
    }
};

let currentLanguage = 'fr';

function t(key) {
    return translations[currentLanguage][key] || translations.fr[key] || key;
}

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('petanqueLanguage', lang);
        updateAllText();
    }
}

function updateAllText() {
    document.title = t('title');
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(el => {
        const key = el.getAttribute('data-translate');
        if (el.tagName === 'INPUT' && (el.type === 'button' || el.type === 'submit')) {
            el.value = t(key);
        } else if (el.hasAttribute('placeholder')) {
            el.placeholder = t(key);
        } else {
            el.textContent = t(key);
        }
    });
    
    if (tournament.currentRound > 0) {
        updateTournamentDisplay();
    }
}

class PetanqueTournament {
    constructor() {
        this.players = [];
        this.currentRound = 0;
        this.playerStats = {};
        this.usedPartnerships = new Set();
        this.usedOpponents = new Set();
        this.currentGames = [];
        this.gameResults = [];
        this.fieldCount = 2;
    }

    addPlayer(name) {
        if (name && !this.players.includes(name)) {
            this.players.push(name);
            this.playerStats[name] = { wins: 0, losses: 0, points: 0, totalMargin: 0, gamesPlayed: 0 };
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

    getOpponentKey(team1, team2) {
        const sortedTeam1 = [...team1].sort();
        const sortedTeam2 = [...team2].sort();
        return [sortedTeam1.join('&'), sortedTeam2.join('&')].sort().join(' vs ');
    }

    formTeams() {
        if (this.players.length < 4) {
            throw new Error(t('minPlayersError'));
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
        this.usedOpponents.clear();
        return this.formTeams();
    }

    setFieldCount(count) {
        this.fieldCount = Math.max(1, parseInt(count));
    }

    createGames(teams) {
        const games = [];
        const maxGames = this.fieldCount;
        const availableTeams = [...teams];
        
        for (let attempts = 0; attempts < 100 && games.length < maxGames && availableTeams.length >= 2; attempts++) {
            let bestMatch = null;
            let bestMatchIndex = -1;
            let foundNewOpponent = false;
            
            for (let i = 0; i < availableTeams.length - 1; i++) {
                for (let j = i + 1; j < availableTeams.length; j++) {
                    const team1 = availableTeams[i];
                    const team2 = availableTeams[j];
                    const opponentKey = this.getOpponentKey(team1, team2);
                    
                    if (!this.usedOpponents.has(opponentKey)) {
                        bestMatch = { team1, team2, i, j };
                        foundNewOpponent = true;
                        break;
                    } else if (!bestMatch) {
                        bestMatch = { team1, team2, i, j };
                    }
                }
                if (foundNewOpponent) break;
            }
            
            if (bestMatch) {
                games.push({
                    id: games.length,
                    team1: bestMatch.team1,
                    team2: bestMatch.team2,
                    field: (games.length % this.fieldCount) + 1,
                    result: null
                });
                
                availableTeams.splice(Math.max(bestMatch.i, bestMatch.j), 1);
                availableTeams.splice(Math.min(bestMatch.i, bestMatch.j), 1);
            } else {
                break;
            }
        }
        
        return games;
    }

    recordGameResult(gameId, team1Score, team2Score) {
        const game = this.currentGames.find(g => g.id === gameId);
        if (!game) return false;

        const t1Score = parseInt(team1Score);
        const t2Score = parseInt(team2Score);
        game.result = { team1Score: t1Score, team2Score: t2Score };
        
        const winningTeam = t1Score > t2Score ? game.team1 : game.team2;
        const losingTeam = t1Score > t2Score ? game.team2 : game.team1;
        const winningScore = Math.max(t1Score, t2Score);
        const losingScore = Math.min(t1Score, t2Score);
        const margin = winningScore - losingScore;
        
        winningTeam.forEach(player => {
            this.playerStats[player].wins++;
            this.playerStats[player].points += winningScore;
            this.playerStats[player].totalMargin += margin;
            this.playerStats[player].gamesPlayed++;
        });
        
        losingTeam.forEach(player => {
            this.playerStats[player].losses++;
            this.playerStats[player].points += losingScore;
            this.playerStats[player].totalMargin -= margin; // Negative margin for losses
            this.playerStats[player].gamesPlayed++;
        });

        this.gameResults.push({
            round: this.currentRound,
            ...game
        });

        const opponentKey = this.getOpponentKey(game.team1, game.team2);
        this.usedOpponents.add(opponentKey);

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
            .map(([name, stats]) => ({ 
                name, 
                ...stats,
                avgMargin: stats.gamesPlayed > 0 ? stats.totalMargin / stats.gamesPlayed : 0
            }))
            .sort((a, b) => {
                if (a.wins !== b.wins) return b.wins - a.wins;
                if (a.avgMargin !== b.avgMargin) return b.avgMargin - a.avgMargin;
                return b.points - a.points;
            });
    }

    saveToLocalStorage() {
        const data = {
            players: this.players,
            currentRound: this.currentRound,
            playerStats: this.playerStats,
            usedPartnerships: Array.from(this.usedPartnerships),
            usedOpponents: Array.from(this.usedOpponents),
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
            this.usedOpponents = new Set(data.usedOpponents || []);
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

window.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('petanqueLanguage') || 'fr';
    currentLanguage = savedLang;
    document.getElementById('languageSelect').value = savedLang;
    updateAllText();
    
    console.log('Loading tournament data...');
    if (tournament.loadFromLocalStorage()) {
        console.log('Tournament data loaded:', tournament.players.length, 'players, round', tournament.currentRound);
        updatePlayersDisplay();
        updateStartButton();
        if (tournament.currentRound > 0) {
            document.getElementById('fieldCount').value = tournament.fieldCount;
            document.getElementById('tournamentSection').style.display = 'block';
            document.getElementById('standingsSection').style.display = 'block';
            document.getElementById('newTournamentBtn').style.display = 'inline-block';
            document.getElementById('startBtn').style.display = 'none';
            updateTournamentDisplay();
        }
    } else {
        console.log('No saved tournament data found');
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
        alert(t('validPlayerError'));
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
            <button onclick="removePlayer('${player}')" class="remove-btn">${t('remove')}</button>
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
    document.getElementById('startBtn').style.display = 'none';
    tournament.startNewRound();
    tournament.saveToLocalStorage();
    updateTournamentDisplay();
}

function newTournament() {
    if (confirm(t('confirmNewTournament'))) {
        tournament.clearLocalStorage();
        location.reload();
    }
}

function updateTournamentDisplay() {
    document.getElementById('roundInfo').innerHTML = `<h3>🎲 ${t('round')} ${tournament.currentRound}</h3>`;
    
    const gamesHtml = tournament.currentGames.map(game => 
        `<div class="game" id="game-${game.id}">
            <div class="field-header">🏟️ ${t('field')} ${game.field}</div>
            ${game.result ? 
                `<div class="teams">
                    <span class="team">${game.team1.join(' & ')}</span>
                    <span class="vs">${t('against')}</span>
                    <span class="team">${game.team2.join(' & ')}</span>
                </div>
                <div class="result">🎯 ${t('result')}: ${game.result.team1Score} - ${game.result.team2Score}</div>` :
                `<div class="score-input">
                    <div class="score-team">
                        <span class="score-team-name">${game.team1.join(' & ')}</span>
                        <input type="number" id="team1-${game.id}" placeholder="${t('points')}" min="0">
                    </div>
                    <div class="vs-score">${t('against')}</div>
                    <div class="score-team">
                        <span class="score-team-name">${game.team2.join(' & ')}</span>
                        <input type="number" id="team2-${game.id}" placeholder="${t('points')}" min="0">
                    </div>
                    <button onclick="recordResult(${game.id})">${t('record')}</button>
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
        alert(t('enterBothScores'));
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
    
    const rankedStandings = calculateRanks(standings);
    
    const standingsHtml = `
        <table>
            <thead>
                <tr>
                    <th>🏆 ${t('rank')}</th>
                    <th>👤 ${t('player')}</th>
                    <th>✅ ${t('wins')}</th>
                    <th>📊 ${t('avgMargin')}</th>
                    <th>🎯 ${t('totalPoints')}</th>
                    <th>❌ ${t('defeats')}</th>
                </tr>
            </thead>
            <tbody>
                ${rankedStandings.map((player) => {
                    const trophy = getTrophyIcon(player.rank, player.points);
                    return `<tr class="rank-${player.rank}">
                        <td>${trophy} ${player.rank}</td>
                        <td>${player.name}</td>
                        <td>${player.wins}</td>
                        <td>${player.avgMargin.toFixed(1)}</td>
                        <td>${player.points}</td>
                        <td>${player.losses}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('standings').innerHTML = standingsHtml;
}

function generateShareText() {
    const standings = tournament.getStandings();
    const rankedStandings = calculateRanks(standings);
    let text = `🎯 ${t('title')} - ${t('round')} ${tournament.currentRound}\n\n🏆 ${t('standings')}:\n`;
    
    rankedStandings.forEach((player) => {
        let rankEmoji = '';
        switch(player.rank) {
            case 1: rankEmoji = '🥇'; break;
            case 2: rankEmoji = '🥈'; break;
            case 3: rankEmoji = '🥉'; break;
            default: rankEmoji = `${player.rank}.`; break;
        }
        
        const marginText = player.gamesPlayed > 0 ? ` (${player.avgMargin > 0 ? '+' : ''}${player.avgMargin.toFixed(1)}avg)` : '';
        text += `${rankEmoji} ${player.name} - ${player.wins}${t('wins').charAt(0)}/${player.losses}${t('defeats').charAt(0)} - ${player.points}pts${marginText}\n`;
    });
    
    text += `\n🎲 ${tournament.players.length} ${t('playersCount')} • ${tournament.fieldCount} ${t('fieldCount').toLowerCase()}`;
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
        case 'whatsapp':
            url = `https://wa.me/?text=${encodedText}`;
            break;
    }
    
    window.open(url, '_blank');
}

function copyResults() {
    const text = generateShareText();
    navigator.clipboard.writeText(text).then(() => {
        alert(t('copySuccess'));
    }).catch(() => {
        alert(t('copyError'));
    });
}

function downloadCSV() {
    const standings = tournament.getStandings();
    
    // CSV headers
    const headers = [
        t('rank'),
        t('player'), 
        t('wins'),
        t('avgMargin'),
        t('totalPoints'),
        t('defeats')
    ];
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    // Add data rows with proper ranking
    const rankedStandings = calculateRanks(standings);
    rankedStandings.forEach(player => {
        const row = [
            player.rank,
            `"${player.name}"`, // Quote name in case of commas
            player.wins,
            player.avgMargin.toFixed(1),
            player.points,
            player.losses
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    // Generate filename with current date and round
    const date = new Date().toISOString().split('T')[0];
    const filename = `petanque-leaderboard-round${tournament.currentRound}-${date}.csv`;
    link.setAttribute('download', filename);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

document.getElementById('playerName').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addPlayer();
    }
});