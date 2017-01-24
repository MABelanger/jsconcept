var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
  // We fulfill the promise !
  reject('error');
  }, 2000);
});

p1.then( function(val) {
      console.log('ok');
}).catch(function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});
