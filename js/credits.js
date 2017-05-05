function shareApp(){
	if (webview){
		var text = "Check out Daily Programmer! A free app for coders, developers or students: daily coding challenges for learning, refreshing or just for fun! https://play.google.com/store/apps/details?id=avivace.daily_programmer";
		Android.sharer(text);
	}
	else {
		$('#modal1').modal('open');
	}
}