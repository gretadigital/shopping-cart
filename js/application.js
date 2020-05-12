var sum = function (acc, val) {
  return acc + val;
};

$(document).ready(function () {
  addTotal();
  // Remove an Item:
  $(document).on('click', '.btn.remove', function (event) {
    $(this).closest('tr').remove();
    addTotal();
  });
  // Update the item using the input:
  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      addTotal();
    }, 200);
  });
  // Add a new item:
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var price = $(this).children('[name=price]').val();

    $('tbody').append(
      '<tr>' +
        '<td class="item pr-5">' +
        item +
        '</td>' +
        '<td class="price pr-5">' +
        price +
        '</td>' +
        '<td class="quantity pr-5"><input type="number" value="1" /></td>' +
        '<td class="subtotal pr-5"></td>' +
        '<td><button class="btn btn-danger btn-sm remove">Remove Item</button>' +
        '</tr>'
    );
    addTotal();
    $(this).children('[name=item]').val('');
    $(this).children('[name=price]').val('');
  });
});

// Add up the values:
var addTotal = function () {
  var subtotalValues = [];
  $('tbody tr').each(function (i, ele) {
    var price = parseFloat($(ele).children('.price').text());
    var quantity = parseFloat($(ele).find('.quantity input').val());
    var subtotal = parseFloat((price * quantity).toFixed(2));
    $(ele).children('.subtotal').html(subtotal);
    subtotalValues.push(subtotal);
  });
  var total = subtotalValues.reduce(sum, 0).toFixed(2);
  $('#total').html(total);
};
