var LazyFakeHeight = {
    enabled: false,
    images: [],

    init: function() {
        // console.log('LazyFakeHeight');

        LazyFakeHeight.getImages();

        if (LazyFakeHeight.enabled) {
            LazyFakeHeight.addListeners();
        } else {
            console.warn('LazyFakeHeight failed to initialize');
            return
        }
    },

    getImages: function() {
        LazyFakeHeight.images = document.getElementsByClassName('lazyload');
        (LazyFakeHeight.images.length > 0) ? LazyFakeHeight.enabled = true : console.warn('no lazyload images found');
    },

    addListeners: function() {
        for (var i = 0; i < LazyFakeHeight.images.length; i++) {
            var el = LazyFakeHeight.images[i];
            
            if (PageSmoothScroll) el.addEventListener('load', PageSmoothScroll.setFakeHeight);
        }
    }
    
}