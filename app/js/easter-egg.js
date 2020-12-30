const EasterEgg = {
    created: false,

    init: function() {
        // console.log('Easter egg listeners ready');
        this.addListeners();
    },
    
    addListeners: function() {
        let _eggTriggers = document.getElementsByClassName('egg-trigger');
        
        for (var i = 0; i < _eggTriggers.length; i++) {
            _eggTriggers[i].addEventListener('click', EasterEgg.toggleHandler);
        }
    },

    toggleHandler: function() {
        // console.log('Easter egg toggleHandler');
        if (!EasterEgg.created) {
            // console.log('Easter egg created');
            RAF.add(Canvas);
            EasterEgg.created = true;
            return
        }

        // console.log('Easter egg canvas behavior updating');

        if (Canvas.ready) {
            Canvas.ready = false;
            Mouse.cursor.enableSVGAnimations();
            Mouse.cursor.cleanHistory();
            
        } else {
            Canvas.ready = true;
            Mouse.cursor.disableSVGAnimations();
        }

        Canvas.ctx.clearRect(0, 0, Canvas.element.width, Canvas.element.height);
    }
}