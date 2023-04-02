/**
 * Code By EpicYoshiMaster
 * Jump Button
 * 
 * Revolutionary technology, this adds a manual jump button to the game so that players can experience
 * the joys of having to jump!
 */

ig.lang.labels.sc.gui.options.headers['cc-jump-button'] = 'Jump Button';
ig.lang.labels.sc.gui.options.controls.keys['jump-button'] = 'Jump';

sc.manualJump = {
	velocity: 185,
	maxJumpHeight: 0,
	maxVel: null,
	accelSpeed: 0.5,
	ignoreSounds: false
}

sc.Control.inject({
	jumpPress: function () {
		return (ig.input.pressed("jump-button") || ig.gamepad.isButtonPressed(ig.BUTTONS.FACE0));
	},
});

ig.ENTITY.Player.inject({
	update() {
		this.parent();

		if(!sc.inputForcer.isBlocking() && !this.isControlBlocked() && !sc.model.isCutscene()) {
			if((this.coll.pos.z == this.coll.baseZPos) && sc.control.jumpPress()) {

				let groundEntity = ig.EntityTools.getGroundEntity(this);
				let didJump = false;

				if(groundEntity) {
					if(groundEntity.onTopEntityJump) {
						didJump = groundEntity.onTopEntityJump(this);
					}

					if(groundEntity.onTopEntityJumpFar) {
						didJump = groundEntity.onTopEntityJumpFar(this);
					}
				}

				if(!didJump) {
					this.doJump(sc.manualJump.velocity, sc.manualJump.maxJumpHeight, sc.manualJump.maxVel, sc.manualJump.accelSpeed, sc.manualJump.ignoreSounds);
				}
			}
		}
	}
});

ig.ActorEntity.inject({
	update(...args) {
		if(this.isPlayer) {
			this.jumpingEnabled = false;
			
			if(sc.model.isCutscene()) {
				this.jumpingEnabled = true;
			}
		}

		this.parent(...args);
	},

	onFallFromEdge(...args) {
		if(this.isPlayer) {
			this.jumpingEnabled = false;
			
			if(sc.model.isCutscene()) {
				this.jumpingEnabled = true;
			}
		}

		this.parent(...args);
	}
});