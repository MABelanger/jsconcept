var p1 = new Promise( function(resolve, reject) {
  setTimeout( function() {
    resolve( 'ok' );
  }, 2000);
});
var p2 = Promise.resolve('ok');

Promise.all([p1, p2]).then(
  function (value) { console.log('Ok'); },
  function (reason) { console.log('No'); }
);
