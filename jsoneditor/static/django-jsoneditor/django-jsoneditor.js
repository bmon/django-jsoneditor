var jsonEditors = {};

django.jQuery(function () {
    if (typeof(jsoneditor) == "undefined")
        jsoneditor = {JSONEditor: JSONEditor};
    setInterval(function () {
        var fields = django.jQuery(".for_jsoneditor");
        for (var i = 0; i < fields.length; i++) {
            var $f = django.jQuery(fields[i]);
            var id = $f.attr("id") + "_jsoneditor";
            var name = $f.attr("name") + "_jsoneditor";
            var $nxt = $f.parent().find('#' + id);
            if ($nxt.attr("name") == name) {
                continue;
            }

            $nxt.detach();
            $nxt = django.jQuery('<div cols="40" rows="10" id="' + id + '" name="' + name + '"></div>');
            $f.parent().append($nxt);
            var fnc = function (f, nxt) {
                var editor = new jsoneditor.JSONEditor(nxt, {
                    onChange: function () {
                        f.value = editor.getText();
                    },
                    mode: 'code',
                });
                editor.setText(f.value);
                return editor;
            };
            jsonEditors[id] = fnc($f[0], $nxt[0]);
        }
    }, 10);
});
