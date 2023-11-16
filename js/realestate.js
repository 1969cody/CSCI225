$("#calc").on("click", function(){
    document.getElementById("table").style.visibility = "visible";
});
$("#calc").on("click", function(){
    document.getElementById("monresult").style.visibility = "visible";
});
$("#calc").on("click", function() {
    // Variables
    var display = $("#display").val();
    var amount = parseFloat($("#loanAmnt").val());
    var interest = parseFloat($("#intRate").val()) / 100;
    var termYears = parseInt($("#loanTerm").val());
    var sMonth = parseInt($("#startMonth").val());
    var sYear = parseInt($("#startYear").val());
    var monInt = interest / 12;
    

    // Monthly Payment
    var termMonths = termYears * 12;
    var monPay = ((amount * monInt) / (1 - Math.pow((1 + monInt), -termMonths))).toFixed(2);
    $("#monPayment").text("$" + monPay);

    // Clear table
    var newBal = amount;
    var table = $("#table tbody");
    table.empty();

    // Yearly Pay
    if (display === "yearly") {
        for (var i = sYear; i < sYear + termYears; i++) {
            var paidIntYearly = 0;
            var paidPrinYearly = 0;
            for (var j = (i === sYear ? sMonth : 1); j <= 12; j++) {
                var paidInt = (newBal * monInt).toFixed(2);
                var paidPrin = (monPay - paidInt).toFixed(2);
                newBal -= paidPrin;

                paidIntYearly = (parseFloat(paidIntYearly) + parseFloat(paidInt)).toFixed(2);
                paidPrinYearly = (parseFloat(paidPrinYearly) + parseFloat(paidPrin)).toFixed(2);
            }
            var row = "<tr><td>" + i + "</td><td>$" + paidIntYearly + "</td><td>$" + paidPrinYearly + "</td><td>$" + newBal.toFixed(2) + "</td></tr>";
            table.append(row);
        }
    }
    else{
        document.write("Error, try again");
    }
});

// Click for Calculation
$("#item3").on("click", function() {
    var calculatorElement = document.getElementById("calculator");
    var results = document.getElementById("table");
    var monthlyPayment = document.getElementById("monresult");
    calculatorElement.style.visibility = "visible";
    if(results.style.visibility === "visible"){
        results.style.visibility = "hidden";
    }
    if(monthlyPayment.style.visibility === "hidden"){
        monthlyPayment.style.visibility = "visible";
    }
});