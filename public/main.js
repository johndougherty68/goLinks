$(document).ready(function () {

    //click of edit icon for goLink
    $("body").on("mouseover", ".tooltippable", function (event) {
        $(this).tooltip('show');
    })

    $("body").on("click", ".editable", function (event) {
        hideAll();
        var id = event.target.attributes[0].value;
        $("#hidden-" + id).show();
    })

    //exit of newGoLink input box
    $("body").on("blur","#newGoLink", function(){
        var goLink = $("#newGoLink").val();
        if(!goLink) return;
        $.ajax({ url: "/admin/" + goLink, method: "GET" })
        .then(function(response){
            console.log(response);
            if(response.result=='noexist'){
                //goLink does not exist
            }
            else{
                //goLink exists
                bootbox.alert("<i class='fas fa-exclamation-triangle fa-3x'></i><p><p>A GoLink already exists for '" + goLink + "'.<p> Please update the item in the GoLinks list or choose a different word.", function(){
                    clearInputs();
                    $("#newGoLink").focus();
                });
            }
        })    
    })

    //click of new goLink button
    $("body").on("click", "#btnAddNew", function () {
        hideAll();
        $("#newGoLinkRow").show();
        $("#newGoLink").focus();
    })

    //click of save button of add new goLink
    $("body").on("click", "#btnSave", function () {
        event.preventDefault();
        var newUrl = $("#newURL").val();
        var newGoLink = $("#newGoLink").val();
        addLink(newGoLink, newUrl);
        showStatus("GoLink Added",5);
        clearInputs();
    })

    //click of cancel button of add new goLink
    $("body").on("click", "#btnCancel", function () {
        $("#newGoLinkRow").hide();
    });

    //click of update button for goLink (to save changes)
    $("body").on("click", ".update-button", function (event) {
        var id = event.target.attributes[0].value.split('-')[1];
        var goLink = $("#goLink-" + id).text();
        var url = $("#input-" + id).val();
        updateLink(goLink, url);
    })

    //click of cancel button for goLink (to cancel changes)
    $("body").on("click", ".cancel-update-button", function (event) {
        var id = event.target.attributes[0].value.split('-')[1];
        $("#hidden-" + id).hide();
    })

    //click of delete icon for goLink
    $("body").on("click", ".deleteable", function (event) {
        var goLink = event.target.attributes[0].value.split('-')[1];
        //var goLink = $("#goLink-" + id).text();
        bootbox.confirm("Are you sure you want to delete GoLink '" + goLink + "'?", function(result){
            if(result===true){
                deleteLink(goLink);
                showStatus("GoLink Deleted",5);
            }
        });
    })

    function clearInputs(){
        $("#newGoLink").val("");
        $("#newURL").val("");
    }

    function showStatus(message, seconds){
        $("#statusArea").text(message);
        setTimeout(function(){
            $("#statusArea").text("");    
        }, seconds*1000);
    }

    function updateLink(goLink, mappedURL) {
        var data = { 'url': mappedURL };
        $.ajax({
            type: "POST",
            url: "/" + goLink,
            data: data,
            success: function (data) {
                runGoLinkQuery();
            }
        })
    }

    function addLink(goLink, mappedURL) {
        //need to check if link exists and raise error if so
        updateLink(goLink, mappedURL);
    }

    function deleteLink(goLink) {
        var data = { 'goLink': goLink };
        $.ajax({
            type: "DELETE",
            url: "/" + goLink,
            data: data,
            success: function (data) {
                runGoLinkQuery();
            }
        })
    }

    function hideAll() {
        $(".hideable").hide();
    }

    function runGoLinkQuery() {
        $("#GoLinkList").empty();
        var goLinkList = $("#GoLinkList");
        $.ajax({ url: "/links", method: "GET" })
            .then(function (goLinks) {

                for (var i = 0; i < goLinks.length; i++) {

                    var listItem = $("<div class='row'>");
                    var linkName = goLinks[i].golink;
                    listItem.append(
                        $("<div class='col-md-1'><span id='" + i + "' data-goLink='" + linkName + "' data-toggle='tooltip' data-placement='top' title='Click to edit' class='fas fa-edit editable tooltippable'></div>"),
                        $("<div id='goLink-" + i + "' class='col-md-3'>").text(linkName),
                        $("<div id='url-" + i + "' class='col-md-7'>").html("<a id='a-" + i + "' data-toggle='tooltip'class='tooltippable' data-placement='top' title='Click to follow this link'  target='_blank' href='" + goLinks[i].url + "'>" + goLinks[i].url + "</a>"),
                        $("<div class='col-md-1'><span id=delete-" + linkName + " data-goLink='" + linkName + "' data-toggle='tooltip' data-placement='top' title='Click to delete'  class='fas fa-trash deleteable tooltippable'></div>"),
                    );

                    goLinkList.append(listItem);

                    var editItem = $("<div id='hidden-" + i + "' class='row hideable edit-row'>");
                    var inputHTML = "<input data-goLink='" + linkName + "' class='form-control' id='input-" + i + "' value='" + goLinks[i].url + "' required>";
                    inputHTML += "<div class='edit-button-row'>";
                    inputHTML += "<button id='btnUpdate-" + i + "' class='btn btn-primary update-button'>Save</button>";
                    inputHTML += " <div id='btnCancelUpdate-" + i + "' class='btn btn-default cancel-update-button'>Cancel</div>";
                    inputHTML += "</div>";
                    editItem.append(
                        $("<div class='col-md-1'></div>"),
                        $("<div class='col-md-3'></div>"),
                        $("<div id='edit-" + i + "' class='col-md-8'>").html(inputHTML),
                    );

                    goLinkList.append(editItem);
                }
                hideAll();
            });
    }

    // Run Queries!
    // ==========================================
    runGoLinkQuery();
})