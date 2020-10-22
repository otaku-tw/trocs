/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler", {
	schema: {
		enabled: { default: true },
		rotationFactor: { default: 5 },
		moveFactor: { default: 0.6 },
		minScale: { default: 0.25 },
		maxScale: { default: 2.0 },
	},

	init: function () {
		this.handleScale = this.handleScale.bind(this);
		this.handleRotation = this.handleRotation.bind(this);
		this.handleMove = this.handleMove.bind(this);

		this.isVisible = true;
		this.initialScale = this.el.object3D.scale.clone();
		this.scaleFactor = 1;

		// this.el.sceneEl.addEventListener("markerFound", (e) => {
		//   this.isVisible = true;
		// });

		// this.el.sceneEl.addEventListener("markerLost", (e) => {
		//   this.isVisible = false;
		// });
	},

	update: function () {
		if (this.data.enabled) {
			this.el.sceneEl.addEventListener("onefingermove", this.handleMove);
			this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
		} else {
			this.el.sceneEl.removeEventListener("onefingermove", this.handleMove);
			this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
		}
	},

	remove: function () {
		this.el.sceneEl.removeEventListener("onefingermove", this.handleMove);
		this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
	},

	handleRotation: function (event) {
		if (this.isVisible) {
			this.el.object3D.rotation.y +=
				event.detail.positionChange.x * this.data.rotationFactor;
			this.el.object3D.rotation.x +=
				event.detail.positionChange.y * this.data.rotationFactor;
		}
	},

	handleScale: function (event) {
		if (this.isVisible) {
			clickLock = true;
			this.scaleFactor *=
				1 + event.detail.spreadChange / event.detail.startSpread;

			this.scaleFactor = Math.min(
				Math.max(this.scaleFactor, this.data.minScale),
				this.data.maxScale
			);

			this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
			this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
			this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
		}
	},

	handleMove: function(e){
		if(this.isVisible){
			if( Math.abs(e.detail.positionChange.x) + Math.abs(e.detail.positionChange.y) < 0.0005) return;
			clickLock = true;
			this.el.object3D.position.x +=
				e.detail.positionChange.x * this.data.moveFactor;
			this.el.object3D.position.y -=
				e.detail.positionChange.y * this.data.moveFactor;
		}
	},
});
