var appCrud =  angular.module('appCrud', ['kendo.directives']);

appCrud.controller('indexController', function($scope, $http){ 

    $scope.quote ={};
     
    $scope.gridOptions={
        
               
                dataSource: {
                    type: "json",
                    transport: {
                        read: "quotes",
                        create: "quotes",
                        update: "quotes", 
                        destroy: "quotes"
                    },
                    autoSync: true,
                    pageSize: 20
                   
                },
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
                    
                  ]
            ,   editable:true
          
    };
    

    
   
});

