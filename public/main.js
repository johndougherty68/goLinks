$(document).ready(function () {

    //click of edit icon for goLink
    $("body").on("click", ".editable", function (event) {
        hideAll();
        var id = event.target.attributes[0].value;
        $("#hidden-" + id).show();
    })

    //click of new goLink button
    $("body").on("click", "#btnAddNew", function () {
        hideAll();
        $("#newGoLinkRow").show();
    })

    //click of save button of add new goLink
    $("body").on("click", "#btnSave", function () {
        event.preventDefault();
        var newUrl = $("#newURL").val();
        var newGoLink = $("#newGoLink").val();
        addLink(newGoLink, newUrl);
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
        var id = event.target.attributes[0].value.split('-')[1];
        var goLink = $("#goLink-" + id).text();
        bootbox.confirm("Are you sure you want to delete GoLink '" + goLink + "'?", function(result){
            if(result===true){
            deleteLink(goLink);
            }
        });
    })


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
                    listItem.append(
                        $("<div class='col-md-1'><span id='" + i + "' data-goLink='" + goLinks[i].golink + "' class='fas fa-edit editable'></div>"),
                        $("<div id='goLink-" + i + "' class='col-md-3'>").text(goLinks[i].golink),
                        $("<div id='url-" + i + "' class='col-md-7'>").html("<a id='a-" + i + "' target='_blank' href='" + goLinks[i].url + "'>" + goLinks[i].url + "</a>"),
                        $("<div class='col-md-1'><span id=delete-" + i + " data-goLink='" + goLinks[i].golink + "' class='fas fa-trash deleteable'></div>"),
                    );

                    goLinkList.append(listItem);

                    var editItem = $("<div id='hidden-" + i + "' class='row hideable edit-row'>");
                    var inputHTML = "<input data-goLink='" + goLinks[i].goLink + "' class='form-control' id='input-" + i + "' value='" + goLinks[i].url + "' required>";
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