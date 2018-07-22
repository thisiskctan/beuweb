/* Global Path */

var opc_ToolPath = 'beu.com.my/costumizer/customizer.php';
var opc_ShareImg = 'assets/PHP/share.php';
var opc_get_lang = 'assets/PHP/get_lang.php';

var opc_location_hash = opc_lang_val;
var opc_Clipart_JSON = 'assets/Json/language/' + opc_location_hash + '/clipartData.json';
var opc_Product_JSON = 'assets/Json/language/' + opc_location_hash + '/products.json';
var opc_Design_Color_JSON = 'assets/Json/language/' + opc_location_hash + '/Design_Color.json';
var opc_Text_Effect_JSON = 'assets/Json/language/' + opc_location_hash + '/textEffect.json';

var opc_Multi_Lang_JSON = 'assets/Json/multi_lang.json';
var opc_Cart_URL = 'outputDataView.php';

var opc_Text_Font_JSON = 'assets/Json/language/' + opc_location_hash + '/font.json';
var opc_Font_Data;
var opc_Font_Style = document.createElement("STYLE");

/*
 Global configuration for Upload Image panel.
 */
var opc_Show_Img_No = 12;
//   Total images for slider paging.
var opc_Max_file_size = '10mb';
var opc_Upload_File_Extension = 'png,jpg,jpeg,gif';
var opc_Chunk_Image_Size = '50kb';
var opc_Upload_Imgfile_path = 'assets/PHP/upload.php';
var opc_Store_Info = 'assets/PHP/storeInfo.php';
var Opc_UploadImg_Multi_Selection = true;
//  true or false
var opc_UploadImg_Unique_Names = true;
//  true or false

/*
 Global Config for event Define
 */
var opc_EventType = '';
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

	if ('ontouchend' in document || (/windows phone/i.test(navigator.userAgent.toLowerCase()))) {
		opc_EventType = (document.ontouchstart !== null) ? 'click' : 'touchend';
	}
} else if ('onclick' in document.documentElement) {
	if ((document.ontouchstart !== null) || (document.ontouchstart === null)) {
		if ((document.ontouchstart !== null)) {
			opc_EventType = 'click';
		} else {
			opc_EventType = 'click';
		}
	}
}

/*
 Global Variable
 */
var jq = $.noConflict();
var canvas = '';
// Please don't change this variable name.
//var opc_EventType = 'ontouchend' in document ? 'touchend' : 'click';
opc_lang_check ? jq('.video-wrapper').hide() : jq('.video-wrapper').show();
var opc_flag_show_hide = true;
// true or false   (This is used for change language panel show or hide.)

/*     Object price        */
var opc_text_price = 0;
var opc_upload_img_price = 0;

/*
 This varibale is used for selecting a default tab like as Product, Clipart or Text
 */
var opc_Default_Tab_selection = 'Clipart';

/*
 Default Design variable and object.
 */
var opc_Default_Design = true;
var opc_Default_Design_fun = '';
var opc_Default_Design_obj = 'assets/Json/language/' + opc_location_hash + '/default_design.json';

/*
 Global variable for Draw-Area Rect.
 */

var opc_Stroke_Style = "#ACA585";
var opc_Shadow_Color = "#EDEDED";
var opc_Shadow_Blur = 20;
var opc_Line_Width = 4;
var opc_Rect_Dotted_Style = false;
//  true or false  (This feature is not supported in some broswer).

var opc_Top_RightImg = new Image();
opc_Top_RightImg.src = 'assets/Library/Handler_Image/rotate-clipart.png';
var opc_Left_Resize = new Image();
opc_Left_Resize.src = 'assets/Library/Handler_Image/close-clipart.png';
var opc_Right_Resize = new Image();
opc_Right_Resize.src = "assets/Library/Handler_Image/bottom-left-resizer.png";
var opc_Bottom_up_Resize = new Image();
opc_Bottom_up_Resize.src = "assets/Library/Handler_Image/botom-up-resize.png";
var opc_Left_Right_Resize = new Image();
opc_Left_Right_Resize.src = "assets/Library/Handler_Image/left-right.png";
var opc_Rotate = new Image();
opc_Rotate.src = "assets/Library/Handler_Image/rotate-clipart.png";
var opc_Bottm_RightImg = new Image();
opc_Bottm_RightImg.src = 'assets/Library/Handler_Image/bottom-right-resizer.png';
var opc_Rotate_Cursor = 'assets/Library/Handler_Image/Rotate.cur';

/* Tool */

var opc_Clipart_Data = '';
var opc_Product_Data = '';
var opc_Color_Data = '';
var opc_multi_lang_Data = '';

var previewArr = 0;
var opc_Current_View = 0;
var opc_GetObj = '';
var opc_Font_List = '';
var opc_OverlayImg = '';
var opc_GetPrice = 0;
var opc_Current_View_Price = 0;
var opc_RatioX = '';
var opc_RatioY = '';
var opc_Product_Price = '';
var opc_Size_Price = '';
var opc_Show_Loader = '';
var opc_Hide_Loader = '';
var opc_Change_Lang = '';
var opc_Color_Change = false;
var opc_Add_to_Cart_Check = false;
var opc_redirect_check = true;
var opc_Default_checker = false;
var opc_isIE = /*@cc_on!@*/false || !!document.documentMode;

var opc_Clipart_Slider = jq('.cSlides').bxSlider();
var opc_Product_Slider = jq('.pSlides').bxSlider();
var opc_upload_Slider = jq('.uSlides').bxSlider();

/*	function variable for product load	*/
var opc_Load_Product = '';

/*	function variable for clipart load	*/
var opc_Load_Clipart = '';

/*	function variable for color load	*/
var opc_Load_Color = '';

/*  function variable for default canvas load */
var opc_Load_Multi_Lang = '';

/*  function variable for default canvas load */
var opc_Canvas_Load = '';

/* Image Draw function variable*/
var opc_Img_Draw = '';
var opc_Svg_Draw = '';

/* Text Draw function variable*/
var opc_Text_Draw = '';

/* View change function variable*/
var opc_Change_View = '';

/*Layer update function variable*/
var opc_Update_Layer = '';
var opc_Delete_Layer = '';
var opc_Layer_Up_Down = '';
var opc_Click_Layer = '';
var opc_Layer_Sort = '';
var opc_WebFontConfig = '';
/* */
var opc_DefaultLoad = '';

/* price cal function variable */
var opc_Cal_Price = '';

/*AddTOcart function variable*/
var opc_Add_To_Cart = '';

/*function variable for prize and size panel*/
var opc_Drag = '';

var opc_View = new Array();
var opc_Canvas_arr = new Array();
var opc_Output_SVG = new Array();
var opc_png_Output = new Array();
var opc_Clipart_Price = new Array();
var opc_Product_Size_Price = new Array();
var opc_UserImages = new Array();
var opc_unrenderedViews = new Array();
var opc_view_name = new Array();
/***************Effect change********************/
var opc_charList = new Array();
var opc_text_effect_data;
var opc_text_effect_ui_show = false;
var opc_CurrentGroup;
var opc_spacing = 0;

var opc_disHeight = 0;
var opc_pi = 0;

var opc_disLength = 0;
var opc_arc = 0.1;
var opc_xOffset = 0;
var opc_yOffset = 0;
var opc_distortValue = (Math.PI / 2);
var opc_squashFactor;
var opc_img1 = new Array();
var opc_flag = false;

/*********** for undoRedo-command.js ****************/
var current;
var list = [];
var state = [];
var stateIndex = 0;
var index2 = 0;
var action = false;
var refresh = true;
/************** window width *****************/
var opc_winWidth = 0;
