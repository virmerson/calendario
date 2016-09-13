var appCrud =  angular.module('appCrud', ['kendo.directives']);

appCrud.controller('indexController', function($scope, $http){ 

    $scope.quote ={};
     
    $scope.gridOptions={
        
                dataSource: {
                    type: 'json',
                    transport: {
                        read: function (o) {
                            $http.get('quotes')
                              .success(function (response) {
                                  o.success(response);
                              })
                              .error(function (data) {
                                  o.error(data);
                              });
                        },
                        create: function (o){
                            $http.post('quotes', o.data)
                             .success(function (response) {
                                 o.success(response);
                             })
                            .error(function (data, status, headers, config) {                 o.error(data);
                            });
                        },
                        update: function (o){
                            $http.put('quotes', o.data)
                                .success(function (response) {                       
                                    o.success(response);
                                })
                                .error(function (data, status, headers, config) {                           
                                    o.error(data);
                                });
                        }, 
                        destroy: function (o) {
                            $http.delete('quotes/' + o.data._id)
                                 .success(function (response) {
                                     o.success(response);
                                 })
                                 .error(function (data, status, headers, config) {
                                     o.error(data);
                                 });
                        },
                        parameterMap: function (options, operation) {
                            if (operation !== "read" && options.models) {
                                return { models: kendo.stringify(options.models)};
                            }
                        }
                       
                    },schema: {
                        data: function (data) {
                            return data;
                        },
                        total: function (data) {
                            return data.length;
                        },  //!important for the CRUD operation!
                        model: {
                            id: "_id",
                            fields: {
                                name: { type: "string" }, 
                                quote: { type: "string" }, 
                            }
                        }
                    }  
                     
                },
               
                toolbar: ["create"],
                databound: function () {
                        this.expandRow(this.tbody.find("tr.k-master-row").first());
                },
                columns: [
                    {
                       field: "name",
                       title: "Name",
                       width: "120px"
                    },
                    {
                        field: "quote",
                        title: "Quote",
                        width: "120px",
                    },
                    { 
                        command: ["edit", "destroy"], 
                        title: "&nbsp;", 
                        width: "250px" 
                    }
                ]
            ,   editable:'inline'
          
    };
    

    
   
});

