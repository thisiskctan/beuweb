jq(function() {
	
	if (opc_isIE) {
		jq("#uploader").pluploadQueue({
			// General settings
			runtimes : 'html5,flash,silverlight,html4',
			url : opc_Upload_Imgfile_path,
			max_file_size : opc_Max_file_size,
			chunk_size : opc_Chunk_Image_Size,
			unique_names : opc_UploadImg_Unique_Names,
			multi_selection : Opc_UploadImg_Multi_Selection,

			// Specify what files to browse for
			filters : [{
				title : "Image files",
				extensions : opc_Upload_File_Extension
			}],
			// Flash settings
			flash_swf_url : 'assets/Library/plupload.flash.swf',
			silverlight_xap_url : 'assets/Library/plupload.silverlight.xap'
		});
		
	} else {
		jq("#uploader").pluploadQueue({
			// General settings
			runtimes : 'html5,flash,silverlight,html4',
			url : opc_Upload_Imgfile_path,
			max_file_size : opc_Max_file_size,
			chunk_size : opc_Chunk_Image_Size,
			unique_names : opc_UploadImg_Unique_Names,
			multi_selection : Opc_UploadImg_Multi_Selection,
			// Specify what files to browse for
			filters : [{
				title : "Image files",
				extensions : opc_Upload_File_Extension
			}],
			// Flash settings
			flash_swf_url : 'assets/Library/plupload.flash.swf',
			silverlight_xap_url : 'assets/Library/plupload.silverlight.xap'
		});
		
	}
	
	uploader = jq("#uploader").pluploadQueue();
	
	uploader.bind('UploadFile', function(up, file, res) {
		opc_Show_Loader();
		jq(".loaderimg").show();
	});
	
});
