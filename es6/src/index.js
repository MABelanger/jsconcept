function doAsync() {
  let p = new Promise(function(resolve, reject){
    setTimeout(function () {
      resolve('ok');
    }, 2000);
  });
  return p;
}
let promise = doAsync();
doAsync().then(function (value) {
  console.log('Fulfilled! with value:' + value ); // Fulfilled! with value:ok
  return 'For Sure';
}).then(function(value) {
  console.log(value);
},
function (reason) {
  console.log('Rejected! with reason:' + reason);
});
