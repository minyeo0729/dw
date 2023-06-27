/*
 * File       : js/main.js
 * Author     : STUDIO-JT (JDY)
 * Guideline  : JTstyle.1.0
 *
 * SUMMARY:
 * 1) INIT
 * 2) Functions
 */

jQuery(function($) {

	/* **************************************** *
	 * INIT
	 * **************************************** */
	search_highlight();
	init_tootips();
	init_datatable();
	//action_tooltip();
	
	vscode_config();
	project_modal();
	
	
	/* **************************************** *
	 * Functions
	 * **************************************** */
	function init_tootips(){
		$('.main_container [data-toggle="tooltip"]').tooltip()
	}
	
	function init_datatable(){
		// DataTable
		var last_index = $('.dataTable thead th').index();
	
		var table = $('.table').DataTable( {
			initComplete: function(){
				$('.main_container').addClass('finished_loading')
				$('.table th').each(function(index){
					 $('.table tr:not(:first-child)').find('> :eq('+index+')').width($(this).width())
				})
			},
	
			dom: 'Bfrtip',
			columnDefs: [
			  { width: "30px", targets: 0},
			  { width: "170px", targets: 1},
			  { width: "50px", targets: 2},
			  { width: "50px", targets: 3},
			  { width: "50px", targets: 4},
			  { width: "50px", targets: last_index}
			],
			buttons: [
				{
					text: '옵션',
					extend: 'colvis',
					postfixButtons: [
						{
							text: 'Reset',
							extend: 'colvisRestore'
						}
					]
				}
			],
			scrollResize : true,
			scrollY : '100',
			scrollX : true,
			scrollCollapse : true,
			paging : false,
			scrollCollapse: true,
			paging:         false,
			fixedColumns:   {
				rightColumns: 1,
				leftColumns: 0
			},
			order: [[ 3, "asc" ]],
			rowsGroup: [0,1,2,3,last_index]
	
		} );
	
		//text click auto select
		function SelectText(element) {
			var doc = document,
				range,
				selection;
	
			if (doc.body.createTextRange) {
				range = document.body.createTextRange();
				range.moveToElementText(element);
				range.select();
			} else if (window.getSelection) {
				selection = window.getSelection();
				range = document.createRange();
				range.selectNodeContents(element);
				selection.removeAllRanges();
				selection.addRange(range);
			}
	
		}
		
	
		$(function() {
			$('.dataTables_scrollBody .autoselect').click(function () {
				SelectText(this);
				document.execCommand( 'Copy' );
				bootoast.toast({
					"message": "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
					"type": "info",
					"position": "right-bottom",
					"timeout": "2.5",
					"animationDuration": "300",
					"dismissable": false
				});
			});
	
	
			$( '.jt-vscode-config' ).on( 'click', function () {
	
				var $this = $( this );
				var $target = $this.find( '.jt-vscode-value' );
	
				$target.select();
				document.execCommand( 'Copy' );
				bootoast.toast({
					"message": "<p><i class='fas fa-paste'></i>복사되었습니다!</p>",
					"type": "info",
					"position": "right-bottom",
					"timeout": "2.5",
					"animationDuration": "300",
					"dismissable": false
				});
	
				return false;
	
	
			} );
		});
	
	}
	
	/*
	function action_tooltip() {
	
		$('.list_action a i').each(function(){
			var $target = $(this).attr('class');
			var $container = $('.action_tooltip')
	
			$(this).hover(function(){
				$container.addClass($target)
			},function(){
				$container.removeClass($target)
			})
	
		})
	}
	*/
	
	function search_highlight(){
	
		//$('.jt_list_nothing_found_js').hide();
	
		$('.jt_highlight_search').closest('form').on('submit',function(e){
			e.preventDefault();
		});
	
		$('.jt_highlight_search').keyup(function(){
	
			var val = $(this).val();
			var $target = $('#DataTables_Table_0');
			$('.highlight_row').show()
	
			if(val.length !== 0){
				$target.addClass('highlight_result');
			}else{
				$target.removeClass('highlight_result');
			}
	
			$target.find('td.highlight_column').each(function(){
	
				var $this = $(this);
				var text =  $this.text();
				var $parent =  $this.parent();
				var text_lower_case = text.toLowerCase();
	
				$this.removeHighlight().highlight(val);
	
	
				if(text.indexOf(val) >= 0 || text_lower_case.indexOf(val) >= 0){
					$this.show();
					if($this.children(':visible').length > 0){
						$this.closest('.highlight_row').show();
					}
				}else{
					 $this.hide();
					if($this.children(':visible').length <= 0){
						 $this.closest('.highlight_row').hide();
					}
				}
	
		   });
	
		   // Display No result message
		   //if(!$('.highlight_row').is(':visible')){
				//$('.jt_list_result_nothing_found_keyword').text($('.jt_highlight_search').val());
				//$('.jt_list_nothing_found_js').show();
				//$target.addClass('highlight_noresult');
		   //}else{
				//$('.jt_list_nothing_found_js').hide();
				//$target.removeClass('highlight_noresult');
		   //}
	
		   return false;
		});
	
	}
	
	
	function vscode_config() {
	
	
	}
	
	
	function project_modal(){
	
		if($('#DataTables_Table_0').length <= 0) return;
	
		var page_url = window.location.href;
	
		$('body').append('<div class="modal fade" id="single_project_modal" tabindex="-1" role="dialog" aria-labelledby="aaa" aria-hidden="true"><div class="modal-dialog modal-xl" role="document"><div class="modal-close-btn"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button></div><div class="modal-content"></div></div></div>');
	
		$('#DataTables_Table_0 td.sorting_2 a').attr('data-target','#single_project_modal');
		$('#DataTables_Table_0 td.sorting_2 a').attr('data-toggle','modal');
	
		$('#DataTables_Table_0 td.list_action a[title="상세보기"]').attr('data-target','#single_project_modal');
		$('#DataTables_Table_0 td.list_action a[title="상세보기"]').attr('data-toggle','modal');
	
	
		$('#DataTables_Table_0 td.sorting_2 a').on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			var $overlay = $('.project_modal_overlay');
			var $content = null;
			var url = $this.attr('href');
	
			$.get(url, function(response){
				var $response = $(response);
				$content = $response.filter('#single_project_wrap');
	
				$('.modal-content').html($content.html());
	
				nodata_text();
			});
	
		});
	
		$('#DataTables_Table_0 td.list_action a[title="상세보기"]').on('click', function(e){
			e.preventDefault();
			var $this = $(this);
			var $overlay = $('.project_modal_overlay');
			var $content = null;
			var url = $this.attr('href');
			
			$.get(url, function(response){
				var $response = $(response);
				$content = $response.filter('#single_project_wrap');
	
				$('.modal-content').html($content.html());
	
				nodata_text();
			});
		});
	}
	
	function nodata_text(){
	
		$('.single_project_container div, .single_project_container span.autoselect').each(function(){
	
			if($(this).is(':empty')){
	
				$(this).append('<p class="nodata">데이터 없음</p>');
			}
		})
	
	}
	/*
	//memo_tooltip();
	function memo_tooltip(){
	
		$('#DataTables_Table_0 tr').each(function(e){
			var $this = $(this);
			var $content = null;
			var $domain = $this.children('td.server_domain');
	
			$domain.append('<i class="memo_tooltip hide"></i>');
	
			var $tooltip = $this.find('.memo_tooltip');
	} );
	}*/
	
	});