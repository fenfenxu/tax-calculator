//
//
(function() {

	var Getopt = require('node-getopt');

	var getopt = new Getopt([
	  ['f' , 'fund=ARG'                			, 'reset personal fund rate(0-100)'],
	  ['p' , 'pension=ARG'  					, 'reset personal pension rate(0-100)'],
	  ['m' , 'medicare=ARG'  	 				, 'reset personal medicare rate(0-100)'],
	  ['F' , 'fundFirm=ARG'       				, 'reset firm fund rate(0-100)'],
	  ['P' , 'pensionFirm=ARG' 					, 'reset firm pension rate(0-100)'],
	  ['M' , 'medicareFirm=ARG'					, 'reset firm medicare rate(0-100)'],
	  ['I' , 'industrialInjuryFirm=ARG'			, 'reset firm industrialInjury rate(0-100)'],
	  ['M' , 'maternityInsuranceFirm=ARG'		, 'reset firm maternityInsurance rate(0-100)'],
	  ['U' , 'unemploymentInsuranceFirm=ARG'	, 'reset firm unemploymentInsurance rate(0-100)'],
	  ['v' , 'version'							, 'show version'],
	  ['h' , 'help'                				, 'display this help']
	]);

	// Use custom help template instead of default help
	// [[OPTIONS]] is the placeholder for options list
	getopt.setHelp(
	  "Usage: tax [OPTION] city total\n\n" +
	  "OPTIONS:\n" +
	  "[[OPTIONS]]\n" +
	  "\n" 
	);

	function showHelpAndExit(code) {
		getopt.showHelp();
		process.exit(code || -1);
	}


	var opt = getopt.parseSystem(); // console.info(opt);
	var argv = opt.argv;
	var options = opt.options;

	// check args
	if (options.help) {

		showHelpAndExit(0);
	}

	if(options.version) {

		console.log(require('../package.json').version);
		process.exit(0);
	}

	if (argv.length != 2) {

		showHelpAndExit();
	}



	var city = argv[0];
	var salary = parseFloat(argv[1], 10);

	var tax = require('./tax.js');

	var calculator = tax.calculator();

	var cities = tax.cities;

	if(!salary) {

		showHelpAndExit();
	}



	if (!(city in cities)) {

		console.warn("警告:: 您输入的城市：【" + city + "】不存在， 按照普通公用标准计算");

		city = '其它';
	}

	var result = calculator(city, salary, options);


	for(item in result) {

		if(item == 'standard') continue;

		console.log(item + ': ' + result[item]);
	}
	

}).call(this);
