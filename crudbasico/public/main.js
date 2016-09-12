var appCrud =  angular.module('appCrud', ['kendo.directives']);

appCrud.controller('indexController', function($scope, $http){ 

   var dataSource ;
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
            
          dataSource.add(res.data);
        
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
   
   
    
    function findAllQuotes(){
        
         $http({ method: "GET", url: "quotes" })
                .success(function(result){
                     dataSource = new kendo.data.DataSource({
                        data: new kendo.data.ObservableArray(result)
                    });
                
            $scope.gridOptions = {
              dataSource: dataSource,
              columns: [{
                    field: "name",
                    title: "Name",
                    width: "120px"
                    },{
                    field: "quote",
                    title: "Quote",
                    width: "120px"
                    }
                ]
            
            };
          });
        
    }
    
    findAllQuotes();
    

    
   
});

