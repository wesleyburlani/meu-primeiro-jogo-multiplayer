export default function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };

    function addPlayer(command) {
        const playerId = command.playerId;
        const playerX = command.playerX;
        const playerY = command.playerY;

        state.players[playerId] = {
            x: playerX,
            y: playerY
        };
    }

    function removePlayer(command) {
        const playerId = command.playerId;
        delete state.players[playerId];
    }

    function addFruit(command) {
        const fruitId = command.fruitId;
        const fruitX = command.fruitX;
        const fruitY = command.fruitY;

        state.fruits[fruitId] = {
            x: fruitX,
            y: fruitY
        };
    }

    function removeFruit(command) {
        const fruitId = command.fruitId;
        delete state.fruits[fruitId];
    }

    function movePlayer(command) {
        console.log(`moving ${command.playerId} with ${command.keyPressed}`);

        const acceptedMoves = {
            ArrowUp(player) {
                player.y = Math.max(0, --player.y);
            },
            ArrowDown(player) {
                player.y = Math.min(state.screen.height - 1, ++player.y);
            },
            ArrowRight(player) {
                player.x = Math.min(state.screen.width - 1, ++player.x);
            },
            ArrowLeft(player) {
                player.x = Math.max(0, --player.x);
            }
        };

        const keyPressed = command.keyPressed;
        const playerId = command.playerId;
        const player = state.players[playerId];
        const moveFunction = acceptedMoves[keyPressed];

        if (player && moveFunction) {
            moveFunction(player);
            checkForFruitCollision(playerId);
        }
    }

    function checkForFruitCollision(playerId) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            const fruit = state.fruits[fruitId];
            console.log(`Checking ${playerId} and ${fruitId}`);

            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${playerId} and ${fruitId}`);
                removeFruit({ fruitId: fruitId });
            }
        }
    }

    return {
        state,
        movePlayer,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit
    }
}