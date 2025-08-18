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
        this.partnershipMatrix = {}; // tracks how many times players have been teammates
        this.opponentMatrix = {}; // tracks how many times players have played against each other
        this.currentGames = [];
        this.gameResults = [];
        this.fieldCount = 2;
    }

    addPlayer(name) {
        if (name && !this.players.includes(name)) {
            // Store existing players before adding the new one
            const existingPlayers = [...this.players];
            
            this.players.push(name);
            this.playerStats[name] = { wins: 0, losses: 0, points: 0, totalMargin: 0, gamesPlayed: 0 };
            
            // Initialize matrices for new player
            this.initializePlayerInMatrices(name, existingPlayers);
            return true;
        }
        return false;
    }

    removePlayer(name) {
        const index = this.players.indexOf(name);
        if (index > -1) {
            this.players.splice(index, 1);
            delete this.playerStats[name];
            
            // Remove from matrices
            this.removePlayerFromMatrices(name);
            return true;
        }
        return false;
    }

    initializePlayerInMatrices(newPlayer, existingPlayers = []) {
        // Initialize partnership matrix
        if (!this.partnershipMatrix[newPlayer]) {
            this.partnershipMatrix[newPlayer] = {};
        }
        
        // Initialize opponent matrix
        if (!this.opponentMatrix[newPlayer]) {
            this.opponentMatrix[newPlayer] = {};
        }
        
        // Set relationships with all existing players
        for (const existingPlayer of existingPlayers) {
            this.partnershipMatrix[newPlayer][existingPlayer] = 0;
            this.partnershipMatrix[existingPlayer][newPlayer] = 0;
            this.opponentMatrix[newPlayer][existingPlayer] = 0;
            this.opponentMatrix[existingPlayer][newPlayer] = 0;
        }
    }

    removePlayerFromMatrices(playerToRemove) {
        // Remove player's row
        delete this.partnershipMatrix[playerToRemove];
        delete this.opponentMatrix[playerToRemove];
        
        // Remove player's column from all other players
        for (const player of this.players) {
            if (this.partnershipMatrix[player]) {
                delete this.partnershipMatrix[player][playerToRemove];
            }
            if (this.opponentMatrix[player]) {
                delete this.opponentMatrix[player][playerToRemove];
            }
        }
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }


    formTeams() {
        if (this.players.length < 4) {
            throw new Error(t('minPlayersError'));
        }

        // Calculate optimal team sizes
        const maxFieldCapacity = this.fieldCount * 2;
        const totalPlayers = this.players.length;
        const targetTeamCount = Math.min(maxFieldCapacity, totalPlayers);
        
        // Calculate balanced team sizes (difference at most 1)
        const baseTeamSize = Math.floor(totalPlayers / targetTeamCount);
        const extraPlayers = totalPlayers % targetTeamCount;
        
        const teamSizes = [];
        for (let i = 0; i < targetTeamCount; i++) {
            teamSizes.push(baseTeamSize + (i < extraPlayers ? 1 : 0));
        }
        
        console.log(`Round ${this.currentRound + 1}: Creating ${targetTeamCount} teams with sizes [${teamSizes.join(', ')}]`);
        
        // Use greedy optimization to form teams
        const teams = this.greedyTeamFormation(teamSizes);
        
        // Validate all players are assigned
        const assignedPlayers = teams.flat();
        if (assignedPlayers.length !== totalPlayers) {
            console.error(`Team formation failed: ${assignedPlayers.length}/${totalPlayers} players assigned`);
            console.error('Missing players:', this.players.filter(p => !assignedPlayers.includes(p)));
            return this.fallbackTeamFormation(teamSizes);
        }
        
        // Double-check: verify no duplicate players
        const uniqueAssigned = [...new Set(assignedPlayers)];
        if (uniqueAssigned.length !== assignedPlayers.length) {
            console.error('Duplicate players found in teams');
            return this.fallbackTeamFormation(teamSizes);
        }
        
        console.log(`✅ All ${totalPlayers} players successfully assigned to ${teams.length} teams`);
        return teams;
    }

    greedyTeamFormation(teamSizes) {
        const teams = [];
        const availablePlayers = [...this.players];
        
        // Initialize empty teams
        for (let i = 0; i < teamSizes.length; i++) {
            teams.push([]);
        }
        
        // For each team, greedily select players to minimize partnership costs
        for (let teamIndex = 0; teamIndex < teamSizes.length; teamIndex++) {
            const targetSize = teamSizes[teamIndex];
            
            while (teams[teamIndex].length < targetSize && availablePlayers.length > 0) {
                let bestPlayer = null;
                let minCost = Infinity;
                
                // Try each available player and calculate partnership cost
                for (const candidate of availablePlayers) {
                    const cost = this.calculatePartnershipCost(teams[teamIndex], candidate);
                    if (cost < minCost) {
                        minCost = cost;
                        bestPlayer = candidate;
                    }
                }
                
                // Add best player to team
                if (bestPlayer) {
                    teams[teamIndex].push(bestPlayer);
                    availablePlayers.splice(availablePlayers.indexOf(bestPlayer), 1);
                    
                    // Update partnership matrix
                    for (const teammate of teams[teamIndex]) {
                        if (teammate !== bestPlayer) {
                            this.partnershipMatrix[bestPlayer][teammate]++;
                            this.partnershipMatrix[teammate][bestPlayer]++;
                        }
                    }
                }
            }
        }
        
        // CRITICAL: Ensure all remaining players are assigned
        while (availablePlayers.length > 0) {
            // Find the team with the smallest size to add remaining players
            let smallestTeamIndex = 0;
            let smallestSize = teams[0].length;
            
            for (let i = 1; i < teams.length; i++) {
                if (teams[i].length < smallestSize) {
                    smallestSize = teams[i].length;
                    smallestTeamIndex = i;
                }
            }
            
            // Add remaining player to smallest team
            const remainingPlayer = availablePlayers.shift();
            teams[smallestTeamIndex].push(remainingPlayer);
            
            // Update partnership matrix
            for (const teammate of teams[smallestTeamIndex]) {
                if (teammate !== remainingPlayer) {
                    this.partnershipMatrix[remainingPlayer][teammate]++;
                    this.partnershipMatrix[teammate][remainingPlayer]++;
                }
            }
            
            console.log(`Added remaining player ${remainingPlayer} to team ${smallestTeamIndex}`);
        }
        
        return teams;
    }

    calculatePartnershipCost(currentTeam, candidate) {
        let cost = 0;
        
        // Calculate cost based on existing partnerships
        for (const teammate of currentTeam) {
            cost += this.partnershipMatrix[candidate][teammate] || 0;
        }
        
        // Add small random factor to break ties
        cost += Math.random() * 0.1;
        
        return cost;
    }

    fallbackTeamFormation(teamSizes) {
        const shuffledPlayers = this.shuffleArray([...this.players]);
        const teams = [];
        
        console.log('Using fallback team formation');
        
        let playerIndex = 0;
        for (let i = 0; i < teamSizes.length; i++) {
            const team = [];
            const targetSize = teamSizes[i];
            
            for (let j = 0; j < targetSize && playerIndex < shuffledPlayers.length; j++) {
                team.push(shuffledPlayers[playerIndex++]);
            }
            
            if (team.length > 0) {
                teams.push(team);
                
                // Update partnership matrix for fallback assignments
                for (let p1 = 0; p1 < team.length; p1++) {
                    for (let p2 = p1 + 1; p2 < team.length; p2++) {
                        const player1 = team[p1];
                        const player2 = team[p2];
                        this.partnershipMatrix[player1][player2]++;
                        this.partnershipMatrix[player2][player1]++;
                    }
                }
            }
        }
        
        // CRITICAL: Ensure all remaining players are assigned (fallback safety)
        while (playerIndex < shuffledPlayers.length) {
            // Find the team with the smallest size
            let smallestTeamIndex = 0;
            let smallestSize = teams[0].length;
            
            for (let i = 1; i < teams.length; i++) {
                if (teams[i].length < smallestSize) {
                    smallestSize = teams[i].length;
                    smallestTeamIndex = i;
                }
            }
            
            // Add remaining player to smallest team
            const remainingPlayer = shuffledPlayers[playerIndex++];
            teams[smallestTeamIndex].push(remainingPlayer);
            
            // Update partnership matrix
            for (let k = 0; k < teams[smallestTeamIndex].length - 1; k++) {
                const teammate = teams[smallestTeamIndex][k];
                this.partnershipMatrix[remainingPlayer][teammate]++;
                this.partnershipMatrix[teammate][remainingPlayer]++;
            }
            
            console.log(`Fallback: Added remaining player ${remainingPlayer} to team ${smallestTeamIndex}`);
        }
        
        console.log(`Fallback result: ${teams.length} teams, ${teams.flat().length} players assigned`);
        return teams;
    }

    setFieldCount(count) {
        this.fieldCount = Math.max(1, parseInt(count));
    }

    createGames(teams) {
        const games = [];
        const availableTeams = [...teams];
        const maxGames = this.fieldCount;
        
        // Use greedy algorithm to minimize opponent repetition
        while (availableTeams.length >= 2 && games.length < maxGames) {
            let bestMatch = null;
            let minCost = Infinity;
            
            // Try all possible team pairings
            for (let i = 0; i < availableTeams.length - 1; i++) {
                for (let j = i + 1; j < availableTeams.length; j++) {
                    const team1 = availableTeams[i];
                    const team2 = availableTeams[j];
                    
                    // Calculate opponent cost
                    const cost = this.calculateOpponentCost(team1, team2);
                    
                    if (cost < minCost) {
                        minCost = cost;
                        bestMatch = { team1, team2, i, j };
                    }
                }
            }
            
            if (bestMatch) {
                const fieldNumber = games.length + 1;
                games.push({
                    id: games.length,
                    team1: bestMatch.team1,
                    team2: bestMatch.team2,
                    field: fieldNumber,
                    result: null
                });
                
                // Update opponent matrix
                this.updateOpponentMatrix(bestMatch.team1, bestMatch.team2);
                
                // Remove the teams from available teams
                availableTeams.splice(Math.max(bestMatch.i, bestMatch.j), 1);
                availableTeams.splice(Math.min(bestMatch.i, bestMatch.j), 1);
            } else {
                break;
            }
        }
        
        const playingPlayers = games.flatMap(game => [...game.team1, ...game.team2]).length;
        const totalPlayers = teams.flatMap(team => team).length;
        const fieldsUsed = games.length;
        
        console.log(`Created ${games.length} games using ${fieldsUsed}/${this.fieldCount} fields`);
        console.log(`${playingPlayers}/${totalPlayers} players participating this round`);
        
        if (playingPlayers < totalPlayers) {
            const sittingOutPlayers = totalPlayers - playingPlayers;
            console.log(`${sittingOutPlayers} player(s) sitting out this round`);
        }
        
        return games;
    }

    calculateOpponentCost(team1, team2) {
        let totalCost = 0;
        
        // Sum all opponent relationships between the two teams
        for (const player1 of team1) {
            for (const player2 of team2) {
                totalCost += this.opponentMatrix[player1][player2] || 0;
            }
        }
        
        // Add small random factor to break ties
        totalCost += Math.random() * 0.1;
        
        return totalCost;
    }

    updateOpponentMatrix(team1, team2) {
        // Update opponent counts for all player pairs between the teams
        for (const player1 of team1) {
            for (const player2 of team2) {
                this.opponentMatrix[player1][player2]++;
                this.opponentMatrix[player2][player1]++;
            }
        }
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
            partnershipMatrix: this.partnershipMatrix,
            opponentMatrix: this.opponentMatrix,
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
            this.partnershipMatrix = data.partnershipMatrix || {};
            this.opponentMatrix = data.opponentMatrix || {};
            this.currentGames = data.currentGames || [];
            this.gameResults = data.gameResults || [];
            this.fieldCount = data.fieldCount || 2;
            
            // Initialize matrices for any missing players
            for (const player of this.players) {
                if (!this.partnershipMatrix[player]) {
                    this.initializePlayerInMatrices(player);
                }
            }
            
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
            ${game.result ? 
                `<div class="teams-with-field">
                    <div class="field-header">🏟️ ${t('field')} ${game.field}</div>
                    <div class="teams">
                        <span class="team">${game.team1.join(' & ')}</span>
                        <span class="vs">${t('against')}</span>
                        <span class="team">${game.team2.join(' & ')}</span>
                    </div>
                </div>
                <div class="result">🎯 ${t('result')}: ${game.result.team1Score} - ${game.result.team2Score}</div>` :
                `<div class="score-input-with-field">
                    <div class="field-header">🏟️ ${t('field')} ${game.field}</div>
                    <div class="score-input">
                        <div class="score-team">
                            <span class="score-team-name">${game.team1.join(' & ')}</span>
                            <input type="number" id="team1-${game.id}" placeholder="${t('points')}" min="0" oninput="checkAllScoresEntered()">
                        </div>
                        <div class="vs-score">${t('against')}</div>
                        <div class="score-team">
                            <span class="score-team-name">${game.team2.join(' & ')}</span>
                            <input type="number" id="team2-${game.id}" placeholder="${t('points')}" min="0" oninput="checkAllScoresEntered()">
                        </div>
                    </div>
                </div>`
            }
        </div>`
    ).join('');
    
    document.getElementById('currentGames').innerHTML = gamesHtml;
    
    // Check if next round button should be shown using the new logic
    checkAllScoresEntered();
    
    updateStandings();
}

function checkAllScoresEntered() {
    // Check if all games have both scores entered
    const allScoresEntered = tournament.currentGames.every(game => {
        if (game.result) return true; // Already completed
        const team1Score = document.getElementById(`team1-${game.id}`);
        const team2Score = document.getElementById(`team2-${game.id}`);
        return team1Score && team2Score && team1Score.value !== '' && team2Score.value !== '';
    });
    
    // Show/hide next round button based on whether all scores are entered
    document.getElementById('nextRoundBtn').style.display = allScoresEntered ? 'block' : 'none';
}

function recordResult(gameId) {
    const team1Score = document.getElementById(`team1-${gameId}`).value;
    const team2Score = document.getElementById(`team2-${gameId}`).value;
    
    if (team1Score === '' || team2Score === '') {
        return;
    }
    
    if (tournament.recordGameResult(gameId, team1Score, team2Score)) {
        tournament.saveToLocalStorage();
        updateTournamentDisplay();
    }
}

function nextRound() {
    // First, record all the current game results
    tournament.currentGames.forEach(game => {
        if (!game.result) { // Only if not already recorded
            const team1Score = document.getElementById(`team1-${game.id}`).value;
            const team2Score = document.getElementById(`team2-${game.id}`).value;
            
            if (team1Score !== '' && team2Score !== '') {
                tournament.recordGameResult(game.id, team1Score, team2Score);
            }
        }
    });
    
    // Then start the new round
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