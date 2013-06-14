$(function() {
	var codeEditor;

	var theme = localStorage.getItem("theme");
	if(theme == null) {
		theme = "solarized dark";
		localStorage.setItem("theme", theme);
	}

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

	var setTheme = function(selectedTheme) {
		theme = selectedTheme;
		localStorage.setItem("theme", selectedTheme);
		codeEditor.setOption("theme", theme);
	}

	$("#theme-selector a").click(function() {
		setTheme($(this).data("theme"));
	});
});