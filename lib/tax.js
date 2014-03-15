//


var cityData = require('./cities.json');

var cities = {};

cityData.forEach(function(ele) {
    // body...
    cities[ele.name] = ele;

});


exports.cities = cities;

exports.calculator = function() {


    var calor = function(city, salary) {

        var ret = {};
        console.log("按照" + city + "的标准" + "  你的个税是: " + salary);

        var standard = cities[city].tax;

        ret.standard = standard;


        var insuranceBase = 0;

        insuranceBase = salary < standard.insuranceMax ? salary : standard.insuranceMax;
        if (insuranceBase < standard.insuranceMin) {
            insuranceBase = standard.insuranceMin
        }
        ret.insuranceBase = insuranceBase;



        var fundBase = 0;

        fundBase = salary < standard.fundMax ? salary : standard.fundMax;
        if (fundBase < standard.minWage) {
            fundBase = standard.minWage
        }
        ret.fundBase = fundBase;


        var f = salary;
        ret.pension = standard.pension * insuranceBase / 100;
        ret.medicare = standard.medicare * insuranceBase / 100 + standard.medicarePlan;
        ret.unemploymentInsurance = standard.unemploymentInsurance * insuranceBase / 100;
        ret.fund = standard.fund * fundBase / 100;
        ret.threshold = standard.threshold;

        ret.personalTotal = ret.pension + ret.medicare + ret.unemploymentInsurance + ret.fund;

        // 计算个人所得税
        function calcGeSui(total) {

            var c = total;

            if (c <= 1500) {
                return (c * .03).toFixed(2)
            } else if (c > 1500 && c <= 4500) {
                return (c * .1 - 105).toFixed(2)
            } else if (c > 4500 && c <= 9e3) {
                return (c * .2 - 555).toFixed(2)
            } else if (c > 9e3 && c <= 35e3) {
                return (c * .25 - 1005).toFixed(2)
            } else if (c > 35e3 && c <= 55e3) {
                return (c * .3 - 2755).toFixed(2)
            } else if (c > 55e3 && c <= 8e4) {
                return (c * .35 - 5505).toFixed(2)
            } else if (c > 8e4) {
                return (c * .45 - 13505).toFixed(2)
            }

            return 0;
        }

        var pretaxTotal = salary - ret.personalTotal - standard.threshold;

        if (pretaxTotal < 0) pretaxTotal = 0;

        ret.tax = calcGeSui(pretaxTotal);
        ret.aftertax = salary - ret.tax - ret.personalTotal;

        ret.pensionFirm = standard.pensionFirm * insuranceBase / 100;
        ret.medicareFirm = standard.medicareFirm * insuranceBase / 100;
        ret.unemploymentInsuranceFirm = standard.unemploymentInsuranceFirm * insuranceBase / 100;
        ret.fundFirm = standard.fundFirm * fundBase / 100;
        ret.industrialInjuryFirm = standard.industrialInjuryFirm * insuranceBase / 100;
        ret.maternityInsuranceFirm = standard.maternityInsuranceFirm * insuranceBase / 100;
        ret.firmTotal = ret.pensionFirm + ret.medicareFirm + ret.unemploymentInsuranceFirm + ret.fundFirm + ret.industrialInjuryFirm + ret.maternityInsuranceFirm;

        ret.firmExpenseTotal = ret.firmTotal + salary;


        return ret;

    };

    return calor;
}