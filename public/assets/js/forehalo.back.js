$(function(){
    $(".button-collapse").sideNav();

    $(':checkbox.put-chk').on('change', function () {
        var part = $('meta[name="page"]').attr('content');
        var id = $(this).attr('value');
        var name = $(this).attr('name');
        var self = $(this);
        var label = self.parent().children('label');
        var token = $('input[name="_token"]').val();

        self.hide();
        label.hide();
        self.parent().append('<i class="material-icons mi-refresh">refresh</i>');

        $.ajax({
            url: '/' + part + '/' + id + '/' + name,
            type: 'put',
            data: '_token=' + token + '&' + name + '=' + this.checked
        }).done(function () {
            $('.mi-refresh').remove();
            self.show();
            label.show();
        }).fail(function () {
            $('.mi-refresh').remove();
            self.show().prop('checked', self.is(':checked') ? null : 'checked');
            label.show();
            Materialize.toast('Toggle failed', 3000);
        });
    });
});
