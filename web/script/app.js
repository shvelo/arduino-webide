function htmlEncode(value){
  //create a in-memory div, set it's inner text(which jQuery automatically encodes)
  //then grab the encoded contents back out.  The div never exists on the page.
  return $('<div/>').text(value).html();
}

function htmlDecode(value){
  return $('<div/>').html(value).text();
}

$(function() {
	var codeEditor;

	var setTheme = function(selectedTheme) {
		$("#theme-selector li").removeClass("active");
		$('#theme-selector li[data-theme="'+ selectedTheme +'"]').addClass("active");
		
		theme = selectedTheme;
		localStorage.setItem("theme", selectedTheme);
		if(codeEditor)
		codeEditor.setOption("theme", theme);
	}

	var port = "";
	var rate = 19200;

	var setPort = function(selectedPort) {
		$("#port-selector li").removeClass("active");
		$('#port-selector li[data-port="'+ selectedPort +'"]').addClass("active");
		
		port = selectedPort;
	}

	var theme = localStorage.getItem("theme");
	if(!theme) theme = "solarized light";
	setTheme(theme);

	$.get("misc/default_code.txt", function(data) {
		codeEditor = CodeMirror($("#code > div")[0], {
		  value: data,
		  mode:  "clike",
		  theme: theme,
		  indentWithTabs: true,
		  indentUnit: 4,
		  lineNumbers: true
		});
	});

	$("#theme-selector li").click(function() {
		setTheme($(this).data("theme"));
	});

	socket = io.connect('http://localhost:4001');

	socket.on('serial-ports', function(data) {
		data.ports.forEach(function(port) {
			$("#port-selector").append(
				"<li data-port='"+ port.comName +"'><a href=#>"+ port.comName +"</a></li>");
		});
		if(data.ports.length > 0) {
			setPort(data.ports[0].comName);
		}
	});
	socket.emit('serial-list');

	$("#port-selector").on('click', 'li', function(){
		setPort($(this).data("port"));
	});

	$("#rate-selector").on('click', 'li', function(){
		$("#rate-selector li").removeClass('active');
		$(this).addClass("active");
		rate = $(this).data("rate");
	});

	$("#serial-terminal .toggle").click(function(){
		$("#serial-terminal").toggleClass("active");
		if($("#serial-terminal").is(".active")) {
			socket.emit('serial-connect', { rate: 19200, port: port });
		} else {
			socket.emit('serial-disconnect');
		}
	});

	socket.on('serial-output', function(data) {
		console.log(data);
		$("#serial-terminal .output").append(data.data + "<i></i>");
	});

	$("#serial-terminal .input").keydown(function(e) {
		if(e.keyCode == 13) {
			socket.emit('serial-input', {data: $(this).text()});
			$(this).text("");
			return false;
		}
	});
});