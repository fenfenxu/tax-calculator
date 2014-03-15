//
//
(function() {


	Getopt = require('node-getopt');

	getopt = new Getopt([
	  ['v' , ''                    , 'show version'],
	  [''  , 'long'                , 'long option.'],
	  ['S' , 'short-with-arg=ARG'  , 'option with argument'],
	  ['L' , 'long-with-arg=ARG'   , 'long option with argument'],
	  [''  , 'color[=COLOR]'       , 'COLOR is optional'],
	  ['m' , 'multi-with-arg=ARG+' , 'multiple option with argument'],
	  [''  , 'no-comment'],
	  ['h' , 'help'                , 'display this help']
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

	var opt = getopt.parseSystem();
	// console.info(opt);
	var argv = opt.argv;
	var options = opt.options;
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

	var result = calculator(city, salary);

	console.log(result);

}).call(this);