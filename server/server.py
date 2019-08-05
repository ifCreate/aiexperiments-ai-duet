# 
# Copyright 2016 Google Inc.
# 
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
# 
# http://www.apache.org/licenses/LICENSE-2.0
# 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 

from predict import generate_midi
import os
from flask import send_file, request
import pretty_midi
import sys
if sys.version_info.major <= 2:
    from cStringIO import StringIO
else:
    from io import StringIO
import time
import json

from flask import Flask
from flask_cors import *

app = Flask(__name__, static_url_path='', static_folder=os.path.abspath('../static'))
CORS(app, supports_credentials=True)


pattern = 4
tempo = 120
total_time = 6
model = 'attention_rnn'

@app.route('/predict', methods=['POST'])
def predict():
    global pattern
    global tempo
    global total_time
    global model
    now = time.time()
    values = json.loads(request.data)
    midi_data = pretty_midi.PrettyMIDI(StringIO(''.join(chr(v) for v in values)))
    duration = float(request.args.get('duration'))
    ret_midi = generate_midi(midi_data, pattern, tempo, total_time, model)
    return send_file(ret_midi, attachment_filename='return.mid', 
        mimetype='audio/midi', as_attachment=True)


@app.route('/setparament', methods=['POST'])
def setparament():
    global pattern
    global tempo
    global total_time
    global model
    pattern = int(request.form.get('pattern'))
    tempo = int(request.form.get('tempo'))
    total_time = int(request.form.get('time'))
    model = str(request.form.get('model'))
    return 'Done'


@app.route('/', methods=['GET', 'POST'])
def index():
    return send_file('../static/index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9898)
