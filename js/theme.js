if (localStorage.getItem('theme') == 'light') {
	$('#theme-css').attr('href', 'css/light.css');
	$('#theme-btn').html('light_mode');
}

function changeTheme(){
	if ($('#theme-css').attr('href') == 'css/dark.css') {
		$('#theme-css').attr('href', 'css/light.css');
		if(localStorage.getItem("acceptUse") == "true") localStorage.setItem('theme', 'light');
		$('#theme-btn').html('light_mode');
	} else {
		$('#theme-css').attr('href', 'css/dark.css');
		if(localStorage.getItem("acceptUse") == "true") localStorage.setItem('theme', 'dark');
		$('#theme-btn').html('dark_mode');
	}
}