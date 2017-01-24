let p = new Promise(function(resolve, reject){
  console.log('in promise code');
  setTimeout(function () {
    console.log('resolving...');
    resolve('ok'); //
    reject('error'); // the reject never been call.
  }, 2000);
});

// in promise code
p.then(function (value) {
  // resolving...
  console.log('Fulfilled! with value:' + value ); // Fulfilled! with value:ok
},
function (reason) {
  console.log('Rejected! with reason:' + reason);
});
