$(function () {
    "use strict"

    // Create hub connection proxy
    var index = $.connection.myHub;

    // Calling hub when need to getting data
    index.client.gettingData = function (data) {
        // remove old data
        $("#tableDataBody").children().remove();

        // inserting new
        $.each(data, function (index) {
            $("<tr id='" + data[index].id + "'>"
                + "<td>" + data[index].CampaignName + "</td>"
                + "<td>" + data[index].date + "</td>"
                + "<td>" + data[index].Clicks + "</td>"
                + "<td>" + data[index].Conversatioion + "</td>"
                + "<td>" + data[index].Impressions + "</td>"
                + "<td>" + data[index].AffiliateName + "</td>"
                + "</tr>")
            .prependTo("#tableDataBody");
        });

        // And we are ready
        //index.server.isReadyForNextStep();
    }

    // After inserting new data 
    index.client.afterInserting = function (data) {
        
        if ($("#tr-createNewElement").length) {
            $("#tr-createNewElement").fadeOut(50, function () {
                $(this).remove();
            })
        }

        $("<tr id='" + data.id + "'>"
                + "<td>" + data.CampaignName + "</td>"
                + "<td>" + data.date + "</td>"
                + "<td>" + data.Clicks + "</td>"
                + "<td>" + data.Conversatioion + "</td>"
                + "<td>" + data.Impressions + "</td>"
                + "<td>" + data.AffiliateName + "</td>"
                + "</tr>")
            .prependTo("#tableDataBody").addClass("ShowAfterInserting").delay(5000).removeClass("ShowAfterInserting");

        prependInChangePage("#" + data.id);
    }

    index.client.afterDeleting = function (data) {
        $("#" + data.id).fadeOut(2500, function () {
            $(this).remove();
        })
    }

    index.client.afterChanging = function (id, data) {
        // remove our created input elem
        $(".changeBox").remove();
        $("#" + id).children().fadeIn(250);

        // upd info
        $("#" + id + " > td:eq(0)").text("" + data.CampaignName);
        $("#" + id + " > td:eq(1)").text("" + data.date);
        $("#" + id + " > td:eq(2)").text("" + data.Clicks);
        $("#" + id + " > td:eq(3)").text("" + data.Conversatioion);
        $("#" + id + " > td:eq(4)").text("" + data.Impressions);
        $("#" + id + " > td:eq(5)").text("" + data.AffiliateName);

        $("#" + id).addClass("ShowAfterChange").delay(5000).removeClass("ShowAfterChange");
    }

    // opening connection
    $.connection.hub.start().done(function () {
        index.server.getDataFromTable($("#title").text());
    });
});