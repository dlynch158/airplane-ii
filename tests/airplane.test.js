require('../js/airplanedom.js');
require('../js/airplane.js');

window = global;

describe('Airplane', () => {
    it('can be instantiated', () => {
        expect(new airplaneGame.AirplaneGame).toBeTruthy();
    });

    it('can return the size of the playing area', () => {
        expect(airplaneGame.AirplaneGame.getArenaSize()).toBeTruthy();
    });

    it('can add an enemy to a specific position', () => {
        let ap = new airplaneGame.AirplaneGame();
        ap.addEnemy('foo', 350, 200);
        expect(ap.getPositionOf('foo')).toEqual([350, 200]);
    });

    it('can return a list of enemies and their positions', () => {
        let enemies = [
            {left: 350, top: 200},
            {left: 450, top: 250},
        ]

        let ap = new airplaneGame.AirplaneGame();
        for (let i = 0; i < enemies.length; i++) {
            ap.addEnemy(`enemy${i}`, enemies[i].left, enemies[i].top);
        }

        let enemiesList = ap.getEnemies();

        expect(enemiesList.length).toBe(2);

        let expected = [
            { name: 'enemy0', left: 350, top: 200 },
            { name: 'enemy1', left: 450, top: 250 }
        ]

        expect(enemiesList).toEqual(expect.arrayContaining(expected));
    });

    it('can move a plane to a different position', () => {
        let ap = new airplaneGame.AirplaneGame();
        ap.movePlane('player', 300, 490);

        expect(ap.getPositionOf('player')).toEqual([300, 490]);
    });

    it('will keep player from moving below 470 in height', () => {
        let ap = new airplaneGame.AirplaneGame();
        ap.movePlane('player', 300, 490);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
        ap.movePlane('player', 300, 469);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
    });

    it('will keep player from moving beyond 10px to the left', () => {
        let ap = new airplaneGame.AirplaneGame();
        ap.movePlane('player', 300, 490);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
        ap.movePlane('player', 9, 490);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
    });

    it('will keep player from moving beyond 830px to the right', () => {
        let ap = new airplaneGame.AirplaneGame();
        ap.movePlane('player', 300, 490);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
        ap.movePlane('player', 891, 490);
        expect(ap.getPositionOf('player')).toEqual([300, 490]);
    });
});