import 'style/light_window.css'

class LightWindow {

    constructor(container){
        var pattern = 4
        var tempo = 120
        var time = 10
        var model = 'attention_rnn'

        this._container = container

        this._close_btn = document.createElement('button')
        this._close_btn.id = 'close_page'
        this._close_btn.innerHTML = '<i class="material-icons" style="font-size: 36px">close</i>'
        this._close_btn.addEventListener('click', function () {
            document.querySelector('.dark_window').style.display = 'none'
            document.querySelector('.light_window').style.display = 'none'
        },false)
        this._container.appendChild(this._close_btn)

        this._page_all = document.createElement('div')
        this._page_all.className = 'page-all'

        this._page_left = document.createElement('div')
        this._page_left.className = 'page-left'

        this._left_code = document.createElement('div')
        this._left_code.id = 'left_code'
        this._page_left.appendChild(this._left_code)

        this._btn_group = document.createElement('div')
        this._btn_group.className = 'btn_group'

        this._run_code = document.createElement('button')
        this._run_code.id = 'run_code'
        this._run_code.className = 'active btn_left'
        this._run_code.innerHTML = 'Apply code'
        this._btn_group.appendChild(this._run_code)

        this._save_code = document.createElement('button')
        this._save_code.id = 'save_code'
        this._save_code.className = 'btn_left'
        this._save_code.innerHTML = 'Save code to file'
        this._btn_group.appendChild(this._save_code)

        this._load_code = document.createElement('button')
        this._load_code.id = 'load_code'
        this._load_code.className = 'btn_left'
        this._load_code.innerHTML = 'Load code from file'
        this._btn_group.appendChild(this._load_code)

        this._page_left.appendChild(this._btn_group)
        this._page_all.appendChild(this._page_left)


        this._page_middle = document.createElement('div')
        this._page_middle.className = 'page-middle'
        this._page_all.appendChild(this._page_middle)

        this._container.appendChild(this._page_all)

        let editor = ace.edit("left_code")
        editor.setTheme("ace/theme/solarized_dark")
        editor.session.setMode("ace/mode/javascript")

        $.ajax({
            url: 'src/demo/demo_init.js',
            dataType: 'text',
            success: function(data) {
                editor.insert(data)
            }
        })

        let file_count = 0
        this._run_code.addEventListener('click', evt => {
            let el = evt.target
            let final_code = editor.getValue()
            if(document.querySelector('#trick')){
                document.body.removeChild(document.querySelector('#trick'))
            }
            let trick = document.createElement('script')
            trick.setAttribute('id','#trick')
            trick.innerHTML = final_code
            document.body.appendChild(trick)
            document.querySelectorAll('.btn_left').forEach(e => {
                e.classList.remove('active')
            })
            el.classList.add('active')
        })
        this._save_code.addEventListener('click', evt => {
            let el = evt.target
            let final_code = editor.getValue()
            let filename = "demo" + file_count + ".js"
            file_count = file_count + 1
            this._doSave(final_code, "text/latex", filename)
            document.querySelectorAll('.btn_left').forEach(e => {
                e.classList.remove('active')
            })
            el.classList.add('active')
        })
        this._load_code.addEventListener('click', evt => {
            let el = evt.target
            let inputObj=document.createElement('input')
            inputObj.setAttribute('id','_ef')
            inputObj.setAttribute('type','file')
            inputObj.setAttribute("style",'visibility:hidden')
            document.body.appendChild(inputObj)
            inputObj.addEventListener('change', evt => {
                let reader = new FileReader()
                reader.onload = function () {
                    let code = this.result
                    editor.setValue(code)
                }
                reader.readAsText(evt.target.files[0])
            })
            inputObj.click()
            document.body.removeChild(inputObj)
            document.querySelectorAll('.btn_left').forEach(e => {
                e.classList.remove('active')
            })
            el.classList.add('active')
        })


        this._page_right = document.createElement('div')
        this._page_right.className = 'page-right'


        this._right_title = document.createElement('div')
        this._right_title.className = 'right-title'
        this._right_title.innerHTML = '<i  class="material-icons" style="font-size: 2em; vertical-align:middle;">settings</i>' +
            '<h5 class="right-head">Parameter</h5>'
        this._page_right.appendChild(this._right_title)

        this._right_controls = document.createElement('div')
        this._right_controls.className = 'right-controls'


        this._right_control_1 = document.createElement('div')
        this._right_control_1.className = 'right-control'
        this._right_control_1.innerHTML = '<div class="input-field grey-text">' +
            '<p class="right-control-title">Pattern length</p><select id="pattern-length">' +
            '<option selected>4</option><option>8</option><option>16</option><option>32</option></select>' +
            '<p class="right-control-description">The parameter controls how long a pattern of a beatbox will last.</p></div>'
        this._right_controls.appendChild(this._right_control_1)

        this._right_control_2 = document.createElement('div')
        this._right_control_2.className = 'right-control grey-text'
        this._right_control_2.innerHTML = '<p class="right-control-title">Tempo (<span id="tempo_num">120</span>)</p><div class="slider-bar">' +
            '<input type="range" id="tempo" min="20" max="240" value="120" step="1"></div>' +
            '<p class="right-control-description">The parameter controls how long</p>'
        this._right_controls.appendChild(this._right_control_2)

        this._right_control_3 = document.createElement('div')
        this._right_control_3.className = 'right-control grey-text'
        this._right_control_3.innerHTML = '<p class="right-control-title">Time (<span id="time_num">6</span>)</p><div class="slider-bar">' +
            '<input type="range" id="time" class="tooltipped" min="4" max="10" value="6" step="1">' +
            '</div><p class="right-control-description">The parameter controls how long</p>'
        this._right_controls.appendChild(this._right_control_3)

        this._right_control_4 = document.createElement('div')
        this._right_control_4.className = 'right-control'
        this._right_control_4.innerHTML = '<div class="input-field grey-text">' +
            '<p class="right-control-title">Model type</p><select id="model-type">' +
            '<option>Basic RNN</option><option selected>Attention RNN</option></select>' +
            '<p class="right-control-description">The parameter controls how long a pattern of a beatbox will last.</p></div>'
        this._right_controls.appendChild(this._right_control_4)

        this._right_control_apply = document.createElement('div')
        this._right_control_apply.className = 'apply'
        this._right_control_apply.innerHTML = '<button id="apply_btn">Apply</button>'
        this._right_controls.appendChild(this._right_control_apply)

        $(document).ready(function() {
            $('#pattern-length').formSelect()
            $('#model-type').formSelect()
            $('#pattern-length').on('change', evt => {
                pattern = evt.target.value
            })
            $('#model-type').on('change', evt => {
                if(evt.target.value == 'Basic RNN'){
                    model = 'basic_rnn'
                }
                else{
                    model = 'attention_rnn'
                }
            })
            document.querySelector('#tempo').addEventListener('input', evt => {
                document.querySelector('#tempo_num').innerHTML = evt.target.value
                tempo = evt.target.value
            }, false)
            document.querySelector('#time').addEventListener('input', evt => {
                document.querySelector('#time_num').innerHTML = evt.target.value
                time = evt.target.value
            }, false)
            document.querySelector('#apply_btn').addEventListener('click', evt => {
                var req_url = 'http://localhost:9898/setparament'
                var dd = {
                    'pattern': pattern,
                    'tempo': tempo,
                    'time': time,
                    'model': model
                }
                $.ajax({
                    url: req_url,
                    type: 'POST',
                    data: dd,
                    dataType: 'json',
                    success: function(data) {
                        console.log(data)
                    }
                })
            }, false)
        })

        this._add_hover_event(this._right_control_1)
        this._add_hover_event(this._right_control_2)
        this._add_hover_event(this._right_control_3)
        this._add_hover_event(this._right_control_4)

        this._page_right.appendChild(this._right_controls)
        this._page_all.appendChild(this._page_right)


    }

    _doSave(value, type, name) {
        let blob
        if (typeof window.Blob == "function") {
            blob = new Blob([value], {type: type}) 
        } else {
            let BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder
            let bb = new BlobBuilder()
            bb.append(value)
            blob = bb.getBlob(type)
        }
        let URL = window.URL || window.webkitURL
        let bloburl = URL.createObjectURL(blob)
        let anchor = document.createElement("a")
        if ('download' in anchor) {
            anchor.style.visibility = "hidden"
            anchor.href = bloburl
            anchor.download = name
            document.body.appendChild(anchor)
            let evt = document.createEvent("MouseEvents")
            evt.initEvent("click", true, true)
            anchor.dispatchEvent(evt)
            document.body.removeChild(anchor)
        } else if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, name)
        } else {
            location.href = bloburl
        }
    }

    _add_hover_event(tar){
        tar.addEventListener('mouseenter', evt => {
            let el = evt.target
            if(el.querySelector('.right-control-description')){
                el.querySelector('.right-control-description').style.display='block'
            }
        }, false)

        tar.addEventListener('mouseleave', evt => {
            let el = evt.target
            if(el.querySelector('.right-control-description')){
                el.querySelector('.right-control-description').style.display='none'
            }
        },false)
    }
}

export {LightWindow}