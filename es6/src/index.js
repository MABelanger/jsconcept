let p = new Promise(function(resolve, reject){
  setTimeout(function () {
    resolve('ok');
  }, 2000);
});

p.then(function (value) {
  console.log('Fulfilled! with value:' + value );
  return 'For Sure';
}).then(function(value) {
  console.log(value);
},
function (reason) {
  console.log('Rejected! with reason:' + reason);
});
// Fulfilled! with value:ok
// For Sure
