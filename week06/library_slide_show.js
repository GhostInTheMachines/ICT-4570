// JavaScript Document
var slideshow = {
	timer: null,
	nodes: { image: null, caption: null },
	img: { cache: [], counter: 0 },
	play: true,
	speed: 2000,
	loadImages: function(slides) {
		"use strict";
		var image;
		for ( var i in slides ) {
			// Preload image, copy title property, and save it in array
			image = new Image();
			image.src = slides[i].href;
			image.title = slides[i].title;
			this.img.cache.push( image );
		}
		return this;
	}, // end of method loadImages
	startSlideShow: function() {
		if (arguments.length === 2) {
			this.nodes.image = arguments[0];
			this.nodes.caption = arguments[1];
		}
		// Use bind to ensure 'this' is the slideshow object.
		this.timer = setInterval(this.displayNextImage.bind(this),
								this.speed);
		return this;
	}, // end of startSlideShow method
	stopSlideShow: function() {
		clearInterval( this.timer );
		return this;
	}, // end of stopSlideShow method
	displayNextImage: function() {
		this.img.counter == ++this.img.counter % this.img.cache.lenth;
		var image = this.img.cache[this.img.counter];
		this.nodes.image.src = image.src;
		this.nodes.caption.firstChild.nodeValue = image.title;
	}, // end of displayNextImage method
	setPlayText: function(a) {
		a.text = (this.play)? "Resume" : "Pause";
		return this;
	}, // end of setPlayText method
	togglePlay: function(e) {
		if ( slideshow.play ) {
			slideshow.stopSlideShow().setPlayText(this);
		} else {
			slideshow.startSlideShow().setPlayText(this);
		}
		slideshow.play = ! slideshow.play;  // toggle play flag
		evt.preventDefault(e);
	} // end of togglePlay method
}; // end of slideshow object literal