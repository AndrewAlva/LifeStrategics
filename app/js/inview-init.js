function initInView() {
    var inviewObjects = document.getElementsByClassName('motion-cascade');

    // Cascade animation timing values
    for (var i = 0; i < inviewObjects.length; i++) {
        var inview = InView(inviewObjects[i], function(isInView, data) {
            if ((this.el.getBoundingClientRect().top - window.innerHeight) < 0) {
                this.el.classList.add('animate');

                if(this.el.querySelector('#services-animation')) {
                    this.el.querySelector('#services-animation').classList.add('drawn');
                }

                if(this.el.querySelector('#blog-animation')) {
                    this.el.querySelector('#blog-animation').classList.add('drawn');
                }

                if(this.el.querySelector('#talks-animation')) {
                    this.el.querySelector('#talks-animation').classList.add('drawn');
                }

                if(this.el.querySelector('#help-animation')) {
                    this.el.querySelector('#help-animation').classList.add('drawn');
                }

            } else {
                this.el.classList.remove('animate');

                if(this.el.querySelector('#services-animation')) {
                    this.el.querySelector('#services-animation').classList.remove('drawn');
                }

                if(this.el.querySelector('#blog-animation')) {
                    this.el.querySelector('#blog-animation').classList.remove('drawn');
                }

                if(this.el.querySelector('#talks-animation')) {
                    this.el.querySelector('#talks-animation').classList.remove('drawn');
                }

                if(this.el.querySelector('#help-animation')) {
                    this.el.querySelector('#help-animation').classList.remove('drawn');
                }

            }
        })
    }
}