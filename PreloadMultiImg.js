/**
 * Preload multiple image file.
 * After loading all image files, execute callback.
 * This script is useful with HTML5 canvas etc.
 * 
 * @date 2016-12-7
 * @version 1.0
 * @auther kenji uehara
 * @license MIT
 * 
 * @param option
 * - flg
 */
var PreloadMultiImg =function(option){
	
	
	this.option = option;
	
	this.readed_count = 0; // Number of image files read.
	this.img_file_count = 0; // Number of image files.
	this.imgs = []; // Array of Image Object.
	this.success_count = 0; // Count of successful reads.
	this.fail_count = 0; // Count of failed reads.
	
	
	var myself=this; // Instance of myself.

	/**
	 * initialized.
	 */
	this.constract=function(){
		
		// If Option property is empty, set a value.
		this.option = setOptionIfEmpty(this.option);
		
	};
	
	// If Option property is empty, set a value.
	function setOptionIfEmpty(option){
		
		if(option == undefined){
			option = {};
		}
		
		if(option['flg'] == undefined){
			option['flg'] = 0;
		}
		
		return option;
	};
	
	
	/**
	 * After loading all image files, execute callback.
	 * 
	 * @param filePaths : Array of file paths
	 * @param callback : Execute this callback after reading all image files.
	 */
	this.onload = function(filePaths,callback){
		
		myself.img_file_count = filePaths.length;
		
		for(var i in filePaths){
			var fp = filePaths[i];
			var img1 = new Image();
			img1.src = fp + '?' + new Date().getTime();
			
			img1.onload = function(e){
				receiver(0,callback);
			}
			
			img1.onerror = function() { 
				receiver(1,callback);
			} 
			
			myself.imgs.push(img1);
			
		}
	}

	/**
	 * Receive onload or error.
	 * And after loading all image files, execute callback.
	 * 
	 * @param err_flg :  0:success  1:error
	 * @param callback
	 */
	function receiver(flg,callback){
		myself.readed_count ++;
		
		if(flg==0){
			myself.success_count++;
		}else{
			myself.fail_count++;
		}
		
		if(myself.readed_count == myself.img_file_count){
			var with_data ={
				'success_count':myself.success_count,
				'fail_count':myself.fail_count,
			};
			callback(myself.imgs,with_data);
		}
	}
	
	
	
	// call constractor method.
	this.constract();
};