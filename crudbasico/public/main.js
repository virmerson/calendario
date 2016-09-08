var appCrud =  angular.module('appCrud', []);

appCrud.controller('indexController', function($scope, $http){ 

    $scope.quoteList = [];
    $scope.quote ={};
    
    $scope.update=function (){
        $http.put('quotes', {
        'name': 'Darth Vader',
        'quote': 'I find your lack of faith disturbing.'
      }).then(res => {
            return res.data;
      }).then(data => {
            console.log(data)
         })
    };
    
    $scope.save=function (){
      //Data Bind  
      $http.post('quotes', $scope.quote).then(res => {
               $scope.quoteList.push(res.data);
      }).then(res => {
            console.log(res)
         })
    }
    
    $scope.delete=function (quote){
     
        
     $http.delete('quotes/'+quote._id).then(res => {
         window.alert('deletou');
        /* pos = $scope.quoteList.indexOf(quote);
        $scope.quoteList.splice(pos, 1 ); */
      
      }).then(res => {
            console.log(re)
      })
     
    }
    
   findAllQuotes=function (){
        $http.get("quotes").then(res=> {
            $scope.quoteList = res.data 
        }).then (data=> {
            console.log(data);
        });
    };
    
    findAllQuotes();
});


/* var update = document.getElementById('update')


update.addEventListener('click', function () {
  
    fetch('quotes', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': 'Darth Vader',
        'quote': 'I find your lack of faith disturbing.'
      })
    }).then(res => {
        if (res.ok) return res.json()
    }).then(data => {
        console.log(data)
        window.location.reload(true)
    })
    
})


var del = document.getElementById('delete')

del.addEventListener('click', function () {
  fetch('quotes', {
    method: 'delete',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name': 'Darth Vader'
    })
  })
  .then(res => {
    if (res.ok) return res.text()
  }).
  then(data => {
    console.log(data)
    window.location.reload()
  })
})*/