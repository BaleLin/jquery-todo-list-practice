$(document)
    .ready(function () {
        let todoList = {
            status:'all',
            todos:
                [{
                    id:'1',
                    name: 'Parking Lot APP Refactor',
                    isComplete:false
                },
                    {
                        id:'2',
                        name: 'Parking Lot APP 时序图 ',
                        isComplete:true
                    },
                    {
                        id:'3',
                        name: 'Parking Lot APP 中类的流程图',
                        isComplete:false
                    },{
                    id:'4',
                    name: '总结Java和面向对象相关的概念和知识',
                    isComplete:true
                },
                    {
                        id:'5',
                        name: '总结Parking Lot APP开发过程中的问题和经验',
                        isComplete:false
                    }]
        }

        function bulidHTML(todoList){
            let buildTodoList = (item) =>
                `<li class="${item.isComplete ? 'checked':''}" ondblclick="editContent(event,'${item.id}')">
            <input name="done-todo" type="checkbox" class="done-todo" ${item.isComplete ? 'checked':''} onclick="changeCheck('${item.id}')"> ${item.name} </li>`;

            let template=`
        <div>
            <input class="input-text" type="text" name="ListItem" data-com.agilebits.onepassword.user-edited="yes">
            <div id="button" onclick="addItem()">Add</div>
        </div>
        <br>
        <ol id="list-content">
            ${filterTodos(todoList.todos,todoList.status).map(buildTodoList).join("")}
        </ol>
        <div>
            <ul id="filters" >
                <li onclick="showStatus('all')">
                    <a href="#" data-filter="all" class="${todoList.status === 'all' ? 'selected':''}" >ALL</a>
                </li>
                <li onclick="showStatus('active')">
                    <a href="#" data-filter="active" class="${todoList.status === 'active' ? 'selected':''}">Active</a>
                </li>
                <li onclick="showStatus('complete')">
                    <a href="#" data-filter="complete" class="${todoList.status === 'complete' ? 'selected':''}">Complete</a>
                </li>
            </ul>
        </div>`
            return template;
        }



        function filterTodos(todos,status){
            const filterExecuters = {
                all() {
                    return true;
                },
                active(item) {
                    return !item.isComplete;
                },
                complete(item) {
                    return item.isComplete;
                }
            }
            return todos.filter(filterExecuters[status]);
        }

        const render = () =>{
            $('#todoForm').html(bulidHTML(todoList));
        }

        render();

        window.addItem = function(){
            var toAdd = $('input[name=ListItem]').val();
            if(toAdd === ''){
                alert('Can not empty')
                return;
            }
            todoList.todos.push({id:generateUUID(),name:toAdd,isComplete:false});
            render();

        }

        window.changeCheck = function(eventId){
            let target = todoList.todos.find(item => item.id === eventId);
            target.isComplete = !target.isComplete;
            render();
        }

        window.showStatus = (status) => {
            todoList.status = status;
            render();
        }

        window.editContent = (event,eventId) => {
            $(event.target).attr('contentEditable', 'true')
                .focus()
                .keypress(e => {
                    if(e.keyCode == '13'){
                        todoList.todos.find(element => element.id === eventId).name = $(event.target).text();
                        render();
                    }
                })
        }

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
    });