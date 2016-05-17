var id = 0;

function addProduct(product) {
    addToStorage(product);
    product = '<div class="product" index="' + id++ + '">' +
            '<div class="product-title" contenteditable>' + product + '</div>' +
            '<div class="quantity">' +
                '<button class="decrease" disabled>-</button>' +
                '<span>1</span>' +
                '<button class="increase">+</button>' +
            '</div>' +
            '<div class="control">' +
                '<button class="unbuy">Не куплено</button>' +
                '<button class="buy">Куплено</button>' +
                '<button class="remove">x</button>' +
            '</div>' +
        '</div>';
    $('.add-product input').val('');
    $('.add-product input').focus();
    product = $('.products').append(product).children(':last');
    product.find('.remove').click(function(){
        remove($(this).closest('.product'));
    });
    product.find('.buy').click(function(){
        buy($(this).closest('.product'));
    });
    product.find('.unbuy').click(function(){
        unbuy($(this).closest('.product'));
    });
    product.find('.increase').click(function(){
        increase($(this).closest('.product'));
    });
    product.find('.decrease').click(function(){
        decrease($(this).closest('.product'));
    });    
    product.find('.product-title').on('focus', function(){
         var $this = $(this);
        $this.data('before', $this.html());
        return $this;
    }).on('blur keyup paste input', function() {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        $('#in-storage .n'+product.attr('index')+' .name').text($this.text());
    }
        return $this;
    });
}


function addToStorage(product) {
    $('#in-storage').append("<div class='storage-product n" + id + "'><span class='name'>" + product + "</span><span class='quantity'>1</span></div>");
}

function remove(product){
    if(product.hasClass('bought')){
        $('#sold').find('.n'+product.attr('index')).remove();
    }else{
        $('#in-storage').find('.n'+product.attr('index')).remove();
    }
    product.remove();
}

function buy(product){
    product.find('.product-title').removeAttr('contenteditable');
    product.addClass('bought');
    product = $('#in-storage .n'+product.attr('index'));
    product.remove();
    $('#sold').append(product);
}

function unbuy(product){
    product.find('.product-title').attr('contenteditable', true);
    product.removeClass('bought');
    product = $('#sold .n'+product.attr('index'));
    product.remove();
    $('#in-storage').append(product);
}

function increase(product){
    if(product.find('.quantity span').text()==1){
       product.find('.quantity .decrease').removeAttr('disabled');
       }
    var q = parseInt(product.find('.quantity span').text());
    product.find('.quantity span').text(q+1);
    $('#in-storage .n'+product.attr('index')).find('.quantity').text(q+1);
}

function decrease(product){
    var q = parseInt(product.find('.quantity span').text());
    product.find('.quantity span').text(q-1);
    $('#in-storage .n'+product.attr('index')).find('.quantity').text(q-1);
    if(product.find('.quantity span').text()==1){
       product.find('.quantity .decrease').attr('disabled', true);
       }
}

$(document).ready(function () {
    addProduct("Помідори");
    addProduct("Сир");
    addProduct("Печиво");
    $('.add-product button').click(function(){
        addProduct($('.add-product').find("input").val());
    });
    $('.add-product input').keypress(function(event){
        if(event.which==13){
            addProduct($('.add-product').find("input").val());
        };
    });
})


