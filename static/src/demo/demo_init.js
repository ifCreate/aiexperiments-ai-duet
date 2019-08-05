/* Variable declaration statement. All the parameters that can be
adjusted on the right side can be adjusted in the following statement. */

// The value range of the parameter pattern ranges from 1 to 32,
// and preferably be a multiple of 4. The value range of the parameter
// tempo ranges from 20 to 240, and preferably be an integer.
// The value range of the parameter time(second) ranges from 4 to 10.
// The value range of the parameter model is 'attention_rnn' or 'basic_rnn'.
var pattern = 4
var tempo = 120
var time = 10
var model = 'attention_rnn'

/* Ajax requests the backend server to modify the model parameters and
will generate a new melody on your next input */
var req_url = 'http://localhost:9898/setparament'
var dd = {
	'pattern': pattern,
	'tempo': tempo,
	'time': time,
	'model': model
}
$.ajax({
	url: req_url,
	type: 'POST',
	data: dd,
	dataType: 'json',
	success: function(data) {
		console.log(data)
	}
})
