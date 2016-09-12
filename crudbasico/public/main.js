var appCrud =  angular.module('appCrud', ['kendo.directives']);

appCrud.controller('indexController', function($scope, $http){ 

  
    $scope.quote ={};
     
    var dataSource =  new  kendo.data.DataSource({
                    type: "json",
                    transport: {
                        read: "quotes"
                    }
                   
    });
    
    
    
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
        
          //arrr = [{} , {} , {}]
      }).then(res => {
            console.log(res)
         })
    }
    
    $scope.delete=function (quote){
     
        
     $http.delete('quotes/'+quote._id).then(res => {
        
        dataSource.remove(res.data);
        window.alert('deletou');
      }).then(res => {
            console.log(re)
      })
     
    }
    
   $scope.handleChange = function(data, dataItem, columns) {
      $scope.data = data;
      $scope.columns = columns;
      $scope.dataItem = dataItem;
       
       //Printar no form
       $scope.quote._id= $scope.dataItem._id;
       $scope.quote.name= $scope.dataItem.name;
       $scope.quote.quote= $scope.dataItem.quote;
       
       
       
    };
     
    $scope.gridOptions={
        
                dataSource: dataSource,
                columns: [{
                    field: "name",
                    title: "Name",
                    width: "120px"
                    },
                    {
                    field: "quote",
                    title: "Quote",
                    width: "120px",
                    }
                    
                  ],
                selectable: "row",
            
        
    };
    

    
   
});

