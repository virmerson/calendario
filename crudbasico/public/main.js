var appCrud =  angular.module('appCrud', ['kendo.directives']);

appCrud.controller('indexController', function($scope, $http){ 

  
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
            
          var dataSource = $('#grid').data('kendoGrid').dataSource;
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
    
   findAllQuotes=function (){
            $scope.gridOptions={
        
                dataSource: {
                    type: "json",
                    transport: {
                        read: "quotes"
                    }
                },
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
    
    };
    
    findAllQuotes();
});

