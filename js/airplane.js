(function() {
    const arenaSize = [900, 700];
    const playerInitialPosition = [450, 620];

    airplaneGame.AirplaneGame = class {
        constructor() {
            this._enemiesPosition = {};
            this._playerPosition = playerInitialPosition;
            this._missilePositions = [];
        }

        addEnemy(name, left, top) {
            this._enemiesPosition[name] = [left, top];
        }

        getPositionOf(name) {
            if (name === 'player') {
                return this._playerPosition;
            } else {
                return this._enemiesPosition[name];
            }
        }

        getPositionsOfMissiles() {
            return this._missilePositions;
        }

        getEnemies() {
            let enemies = [];
            Object.keys(this._enemiesPosition).forEach((enemy) => {
                let enemyObj = {};
                enemyObj.name = enemy;
                enemyObj.left = this._enemiesPosition[enemy][0];
                enemyObj.top = this._enemiesPosition[enemy][1];
                enemies.push(enemyObj);
            });

            return enemies;
        }

        moveEnemies() {
            let enemies = this.getEnemies();
            for (let i = 0; i < enemies.length; i++) {
                this.movePlane(enemies[i].name, enemies[i].left, enemies[i].top + 3);
            }
        }

        moveMissiles() {
           for (let i = 0; i < this._missilePositions.length; i++) {
               this._missilePositions[i][1] -= 5;
           }
        }

        movePlane(name, left, top) {
           if (name === 'player' && left >= 10 && left <= 830 && top >= 470) {
               this._playerPosition = [left, top];
           } else if (name !== 'player') {
               this._enemiesPosition[name] = [left, top];
           }
        }

        fireMissile() {
            let playerPosition = this.getPositionOf('player');
            this._missilePositions.push([playerPosition[0] + 34, playerPosition[1] - 8]);
        }

        static getArenaSize() {
           return arenaSize;
        }
    }
})();