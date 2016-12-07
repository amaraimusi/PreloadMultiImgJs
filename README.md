# PreloadMultiImgJs
Preload multiple image file.
After loading all image files, execute callback.
This script is useful with HTML5 canvas etc.

Use JQuery.

Even if there is a reading failure file, excute callback.

# Example
<http://amaraimusi.sakura.ne.jp/PreloadMultiImgJs/example1.html>

# Source code

	<script src="jquery.min.js"></script>
	<script src="PreloadMultiImg.js"></script>
	
	---- any codes ----
	
	<script>
	$(function(){
		
		var filePaths =['images/imori_md.jpg',
						'images/toumei1.png',
						'images/toumei2.png',
						'images/toumei3.png',
						'images/toumei4.png',
						'dummy'
						];
		
		var cvs = $('#canvas1');
		var ctx = cvs[0].getContext('2d');
		
		var preloadMultiImg = new PreloadMultiImg();
		preloadMultiImg.onload(filePaths,function(imgList,with_data){
			console.log(with_data);
			ctx.beginPath();
			
			for(var i in imgList){
				var x = i * 30;
				var y = i * 20;
				var img = imgList[i];
				ctx.drawImage(img, x, y);
			}
			
			ctx.stroke();
			
		});
		
	});
	</script>
	
	<canvas id="canvas1" width="400" height="300"></canvas>

# Info
MIT

version 1.0

created 2016-12-7

auther kenji uehara