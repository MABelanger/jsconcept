var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
  reject('error');
  }, 2000);
});
p1.then( function(val) {
}).catch( function(reason) {
  console.log('Handle rejected promise ('+reason+') here.');
});
