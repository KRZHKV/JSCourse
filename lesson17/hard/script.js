'use strict';
   const body = document.querySelector('body');
   const div = document.createElement('div');
   div.style.cssText = 'width: 150px; height: 150px; background-color: #669955; position: absolute; left: 0px; top: 100px;';


   const reset = document.querySelector('.reset');
   const start = document.querySelector('.start');
   const pause = document.querySelector('.pause');

   let count = 0;
   let animateInterval;

   let animate = function() {
       animateInterval = requestAnimationFrame(animate);
       count++;
       if ( count < 500) {
           div.style.left = count + 'px';
       }
   }

body.append(div);


pause.addEventListener('click', () => {
    cancelAnimationFrame(animateInterval);
   
})

reset.addEventListener('click', () => {
    count = 0;
    div.style.left = count +'px';
    
    cancelAnimationFrame(animateInterval);
    
})

start.addEventListener('click', function() {
    animate();
})
