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

	var out = {
//		insuranceMax: '最大保险基数',
//		fundMax: '最大公积金基数',
		pension: '社保',
		medicare: '医保',
		unemploymentInsurance: '失业保险',
		fund: '公积金',
//		threshold: '个人所得税起征点',
		pensionFirm: '公司社保',
		medicareFirm: '公司医保',
		unemploymentInsuranceFirm: '失业保险',
		fundFirm: '公司公积金',
		industrialInjuryFirm: '工伤保险',
		maternityInsuranceFirm: '生育保险',
//		minWage: '最低公积金基数',
//		medicarePlan: '医保补助',
//		insuranceMin: '最低社保基数'
	};


	for(item in out) {
		if (item in result) {
			console.log(out[item]+ ': ' + result[item]);
		} else {
			console.warn(out[item] + '(' + item + '): missed');
		}
	}
	

}).call(this);
