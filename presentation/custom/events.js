// brbrbrbrbrbrbrbr
(function () {
	var timer;

	function clearNext (e) {
		// One shots only plz
		Reveal.removeEventListener('slidechanged', clearNext);
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}

	// Doing this in a separate function because ugh copy/pasting
	// also because slidechanged fires after state events
	// soemthing something race conditions
	function setupNextClear () {
		setTimeout(function () {
			Reveal.addEventListener('slidechanged', clearNext);
		}, 10);
	}

	// I want these things to happen one time
	function onceOnState (state, callback) {
		// We'll create an internal function to be used as our listener
		function callMeMaybe () {
			Reveal.removeEventListener(state, callMeMaybe);
			setupNextClear();
			return callback.apply(this, arguments);
		}

		// Then bind away wooooooo
		Reveal.addEventListener(state, callMeMaybe);
	}

	// lololol
	onceOnState('outline', function () {
		timer = setTimeout(Reveal.nextFragment, 1000);
	});
	onceOnState('babby-pees', function (e) {
		timer = setTimeout(Reveal.next, 2000);
	});
})();
