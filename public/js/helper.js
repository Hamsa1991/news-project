function getStores() {
    var id = $("#store_type").find(":selected").val();
    //remove all options from stores seletc
    $('#stores')
        .find('option')
        .remove()
        .end()
        .append('<option >--Please Select--</option>')
    ;
    $.ajax({
        type: "GET",
        url: "/stores",
        data: { id: id},
        cors: true ,
        contentType:'application/json',
        secure: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    })
        .done(function( data ) {
            data = JSON.parse(data);
            for(var i=0; i < data.length; i++){
                let optionHTML = `
                    <option value=`+data[i].id + `>` +
                        data[i].name +
                    `</option>`;
                $('#stores').append(optionHTML);
            }
            //enable selection of stores
            $("#stores").prop("disabled", false);
        });
}
