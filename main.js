$(document).ready(function(){
    $('.product').each(function(){
                       $('.in-storage').append("<div class='storage-product'>" + $(this).find('.product-title').text() + "<span>"+$(this).find('.quantity').find('span').text()+"</div>");
                       })
});