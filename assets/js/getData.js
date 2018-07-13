
$(document).ready(function(){ 

    //Get All Employees
    loadEmployees();
    

    //Add new Employee
    $('#submit').click(function(){
        let emp = {
            "Id": $('#id_id').val(),
            "Name": $('#name_id').val(),
            "Mobile": $('#mobile_id').val(),
            "Telephone": $('#telephone_id').val(),
            "address": $('#address_id').val(),
            "UserName": $('#userName_id').val(),
            "Password": $('#password_id').val()
        };
        $.ajax({
            type: "POST",
            url: "http://employeesintern.azurewebsites.net/api/employees",
            data: JSON.stringify(emp),
            contentType: "application/json",
            success:function(emp){
                console.log(emp);
                loadEmployees();
            },
            error:function(err){
                console.log('err', err.responseText);
            }
        });
    });


    //Delete an Employee
    $(".t-body").on('click', '.delete', function(){
        // alert($(this).attr("id"));
        $.ajax({
            type: 'DELETE',
            url: 'http://employeesintern.azurewebsites.net/api/employees/' + $(this).attr("id"),
            success: function(){
                console.log("sucssese")
            }
        });
        $(this).parent().parent().remove();
    });


    //Update an Employee
    $(".t-body").on('click', '.update', function(){
        $('.add').text("Update Employee");
        // console.log($(this).parent().parent().find('td')[1]);

        // an array of emp. data
        let empData = $(this).parent().parent().find('td');
        $("#id_id").val(empData[0].textContent);
        $("#name_id").val(empData[1].textContent);
        $("#mobile_id").val(empData[2].textContent);
        $("#telephone_id").val(empData[3].textContent);
        $("#address_id").val(empData[4].textContent);
        $("#userName_id").val(empData[5].textContent);
        $("#password_id").val(empData[6].textContent);
        
    });

    $('#update').click(function(){
        // alert('clicked');
        let emp = {
            "Name": $('#name_id').val(),
            "Mobile": $('#mobile_id').val(),
            "Telephone": $('#telephone_id').val(),
            "address": $('#address_id').val(),
            "UserName": $('#userName_id').val(),
            "Password": $('#password_id').val()
        };
        $.ajax({
            type: "PUT",
            url: 'http://employeesintern.azurewebsites.net/api/employees/' + $('#id_id').val(),
            data: JSON.stringify(emp),
            contentType: "application/json",
            success:function(emp){                
                loadEmployees();
            },
            error:function(err){
                console.log('err', err);
            }
        });
    })

});



function loadEmployees(){
    $.ajax({
        type: 'GET',
        url:'http://employeesintern.azurewebsites.net/api/employees',
        success: function(employees){
            $('.t-body').empty();
            $.each(employees, function(i, employee){
                $(".t-body").append(`<tr class="align-top">
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.mobile}</td>
                <td>${employee.telephone}</td>
                <td>${employee.address}</td>
                <td>${employee.userName}</td>
                <td>${employee.password}</td>
                <td>
                    <button class="update btn btn-primary" id="${employee.id}"><span><i class="far fa-edit"></i></span></button>
                    <button class="delete btn btn-danger" id="${employee.id}"><span><i class="far fa-trash-alt"></i></span></button>
                </td>
                </tr>`);
            });
        }
    });
}
