// JavaScript Document
(function( $ ){

	// TODO:
	// Date: 15-05-2011
	// If there's only one gallery on a page. Enable keyboard navigation.
	// Slide effect: left - right, right - left, top - down, down - top.
	// CSS 3 timer icon
	// Canvas timer icon
	// CSS sprite animation timer icon

  $.fn.multiGallery = function( options ) {  

    var settings = {
		'autoRun'			: false,
		'autoRunTimer' 		: 5000,
		'idleTimer'			: 8000,
		'showNavigation' 	: false,
		'showMarkers' 		: true,
		'showMarkerNumbers' : false,
		'width' 			: 200,
		'height'		 	: 200
    };

    return this.each(function() {        
		// If options exist, lets merge them
		// with our default settings
		if ( options ) { 
			$.extend( settings, options );
		}
		var $this = $(this),
			numSlides = $(".slides li", this).length,
			counter = 0,
			navPosVertical = (settings.height - $(".navNextArrow").height()) / 2;

		//Append Back and Forth Navigation
		var naviMarkup = '<div class="navNextArrow"></div>' +
						 '<div class="navBackArrow"></div>';
		$this.append(naviMarkup);
		
		// Show Back and Forth Navigation
		if(settings.showNavigation){
			$(".navNextArrow").css({'display':'block', 'top':navPosVertical});
			$(".navBackArrow").css({'display':'block', 'top':navPosVertical});
		}
		
		// Navigate to Next Slide
		var $next = $(".navNextArrow",$this);
		$next.click(function(event){
			if(event.originalEvent){
				clearInterval(runningTimer);
				var idleTimer = setTimeout(function(){
					runningTimer = setInterval(function(){
						$next.click();
					},settings.autoRunTimer);	
				},settings.idleTimer);
			}
			event.stopPropagation();
			var numActiveSlide = $(".slides li[class='active']",$this).index();
			if(numActiveSlide === numSlides-1){
				counter = 0;
			}
			else
			{
				counter++;
			}
			setActiveMarker($this, counter);
			setActiveImage(counter);
		});
		
		// Navigate to Previous Slide
		var $back = $(".navBackArrow",$this);
		$back.click(function(event){
			if(event.originalEvent){
				clearInterval(runningTimer);
				setTimeout(function(){
					runningTimer = setInterval(function(){
						$next.click();
					},settings.autoRunTimer);	
				},settings.idleTimer);
			}
			event.stopPropagation();
			var numActiveSlide = $(".slides li[class='active']",$this).index();
			if(numActiveSlide === 0){
				counter = numSlides-1;
			}
			else
			{
				counter--;
			}
			setActiveMarker($this, counter);
			setActiveImage(counter);
		});
		
		// Init Gallery CSS
		$this.css({
			'width' : settings.width + 'px',
			'height' : settings.height + 'px'
		});
		
		// Add Class to First Slide
		$(".slides li:first",$this).addClass("active");
		
		// Show First Slide
		$(".slides li:first",$this).fadeIn();
		
		// Attach Marker Navigation to $this Collection
		if(numSlides > 0){
			$this.append('<ul class="navSlider"></ul>');
			
			for(var x = 0; x < numSlides; x++){
				$(".navSlider",$this).append('<li></li>');
			}
			
			// Add Class to First Marker
			$(".navSlider li:first",$this).addClass("active");
			
			// Bind Click Function to All Markers
			$(".navSlider li",$this).click(function(){
				var activeIndex = $(this).index();
				setActiveMarker($this, activeIndex);
				setActiveImage(activeIndex);
			});
		}
		
		// Reset and Set Active Marker
		var setActiveMarker = function($ParentObj,$index){
			$(".navSlider li[class='active']",$ParentObj).removeClass("active");
			$(".navSlider li:eq(" + $index + ")",$ParentObj).addClass("active");
		}
		
		// Reset and Set Active Image
		var setActiveImage = function(numIndex){
			$(".slides li[class='active']",$this).removeClass("active").fadeOut();
			$(".slides li:eq(" + numIndex + ")",$this).addClass("active").fadeIn();
		}
		
		// AutoRun
		if(settings.autoRun){
			var runningTimer = setInterval(function(){
				$next.click();
			},settings.autoRunTimer);
		}
		
		

    });

  };
})( jQuery );

