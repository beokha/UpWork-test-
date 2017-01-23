function prependInChangePage(elem) {
    $("<td><button class='btn btn-primary change'>Change</button>"
            + "<button class='btn btn-primary delete'>Delete</button></td>")
        .appendTo($(elem));
}

$(function () {
    "use strict"

    // Create hub connection proxy
    var changes = $.connection.myHub;

    changes.client.toTheNextStep = function () {
        // Inserting button 'New'
        $("<th><button id='btn-createNewElement' class='btn btn-primary'>Create new</button></th>").appendTo("#tableHeadTr");
        // Insert 'Change' and 'Del' btn
        $.each($("#tableDataBody > tr"), function (index) {
            $("<td><button class='btn btn-primary change'>Change</button>"
                + "<button class='btn btn-primary delete'>Delete</button></td>")
            .appendTo($(this));
        });
    }

    // Create new tr field for new row in table
    $(document).on('click', '#btn-createNewElement', function () {
        if ($("#tr-createNewElement").length) {
            $("#tr-createNewElement").fadeOut(50, function () {
                $(this).remove();
            })
        }

        $("<tr id='tr-createNewElement'>"
            + "<td><input id='CampaignName' class='form-control' type='text' placeholder='Company Name' /></td>"
            + "<td><input id='date' class='form-control' type='date' disabled /></td>"
            + "<td><input id='Clicks' class='form-control' type='number' min=0 /></td>"
            + "<td><input id='Conversatioion' class='form-control' type='number' min=0 /></td>"
            + "<td><input id='Impressions' class='form-control' type='number' min=0 /></td>"
            + "<td><input id='AffiliateName' class='form-control' type='text' placeholder='Affiliate Name' /></td>"
            + "<td><button class='btn btn-primary createNew-OK'>OK</button>"
                + "<button class='btn btn-primary createNew-Cancel'>Cancel</button></td>")
        .fadeIn(500)
        .prependTo("#tableDataBody");

        $(".createNew-Cancel").on('click', function () {
            $("#tr-createNewElement").fadeOut(500, function () {
                $(this).remove();
            })
        });
    });
})

// Inserting data
$(function () {
    "use strict"

    // Create hub connection proxy
    var inserting = $.connection.myHub;

    $.connection.hub.start().done(function () {
        $(document).on('click', '.createNew-OK', function () {
            inserting.server.inserting($("#CampaignName").val(), $("#date").val(), $("#Clicks").val(), $("#Conversatioion").val(), $("#Impressions").val(), $("#AffiliateName").val());
        });
    });
})

// Deleting data
$(function () {
    "use strict"

    var deleting = $.connection.myHub;
    $.connection.hub.start().done(function () {
        $(document).on('click', '.delete', function () {
            // Getting id of delete element
            var idOfChoosenRow = $(this).parent().parent().attr("id");
            
            if (confirm("Are you sure?")) {
                deleting.server.deleting(idOfChoosenRow);
            }

            
        });
    });
})

// Changing data
$(function () {
    "use strict"

    $(document).on("click", '.change', function () {
        var idOfChoosenRow = $(this).parent().parent().attr("id"); // Id of choosen row to change
        $("#" + idOfChoosenRow).children().fadeOut(250); // Hide existing, but don't delete them (not now)

        // Creating new input for change
        $("<td class='changeBox'><input id='changeCampaignName' class='form-control' type='text' placeholder='" + $("#" + idOfChoosenRow + " > td:eq(0)").text() + "' /></td>"
            + "<td class='changeBox'><input id='changedate' class='form-control' type='date' disabled placeholder='" + $("#" + idOfChoosenRow + " > td:eq(1)").text() + "' /></td>"
            + "<td class='changeBox'><input id='changeClicks' class='form-control' type='number' min=0 value='" + $("#" + idOfChoosenRow + " > td:eq(2)").text() + "' /></td>"
            + "<td class='changeBox'><input id='changeConversatioion' class='form-control' type='number' min=0 value='" + $("#" + idOfChoosenRow + " > td:eq(3)").text() + "' /></td>"
            + "<td class='changeBox'><input id='changeImpressions' class='form-control' type='number' min=0 value='" + $("#" + idOfChoosenRow + " > td:eq(4)").text() + "' /></td>"
            + "<td class='changeBox'><input id='changeAffiliateName' class='form-control' type='text' placeholder='" + $("#" + idOfChoosenRow + " > td:eq(5)").text() + "' /></td>"
            + "<td class='changeBox'><button class='btn btn-primary change-OK'>OK</button>"
                + "<button class='btn btn-primary change-Cancel'>Cancel</button></td>") // and btn to accept or not
        .delay(250).fadeIn(250)
        .appendTo("#" + idOfChoosenRow); // inserting this to the row which we was hided 

        // press on cancle btn
        $(".change-Cancel").on("click", function () {
            // remove our created input elem
            $(".changeBox").fadeOut(100, function () {
                $(this).remove();
            })
            
            $("#" + idOfChoosenRow).children().delay(100).fadeIn(250); // and show our
        });

        // press on OK btn
        $(".change-OK").on("click", function () {

            var changing = $.connection.myHub;
            $.connection.hub.start().done(function () {
                changing.server.changing(idOfChoosenRow, $("#changeCampaignName").val(), $("#changedate").val(), $("#changeClicks").val(), $("#changeConversatioion").val(), $("#changeImpressions").val(), $("#changeAffiliateName").val());
            });

            
        });
    });
})