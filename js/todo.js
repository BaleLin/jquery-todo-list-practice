$(document)
    .ready(function () {

        function generateUUID() {
            /*jshint bitwise:false */
            var i,
                random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12
                    ? 4
                    : (i === 16
                        ? (random & 3 | 8)
                        : random)).toString(16);
            }
            return uuid;
        }

    $("#button").on("click",function () {
        var input = $('.input-text').val();
        if (input!=null&&input!=""){
            var content = '<li id='+generateUUID()+'class="">'+
                '<input name="done-todo" type="checkbox" class="done-todo">'+ input +'</li>';
            $('#myList').append(content);
        }else {
            alert("输入不能为空");
        }
    })

        $(".done-todo").on("click",function () {
            var mySingleList = $(this);
            if (mySingleList.is(":checked")){
                mySingleList.parent("li").addClass("checked");
                mySingleList.attr("checked",false);
            }else {
                mySingleList.parent("li").removeClass("checked");
                mySingleList.attr("checked",true);
            }
        })

        // code to be implemented


        //显示完成的
        $("#comp").click(function(){
            $("#myList").find("li").show();
            $("#myList li[class!='checked']").hide();
        })
        //显示所有的
        $("#al").click(function(){
            $("#myList").find("li").show();
        })
        //显示未完成的
        $("#acti").click(function(){
            $("#myList").find("li").show();
            $("#myList li[class='checked']").hide();
        })
        //编辑
        $('#myList').find("li").click(function(){
           $(this).attr("contentEditable",'true')
            $(this).children().attr("contentEditable",'false')
        });
    });