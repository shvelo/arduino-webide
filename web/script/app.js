$(function() {
	var codeEditor;

	$.get("misc/default_code.txt", function(data) {
		codeEditor = CodeMirror($("#code")[0], {
		  value: data,
		  mode:  "clike",
		  theme: "solarized",
		  indentWithTabs: true,
		  indentUnit: 4
		});
	});
});