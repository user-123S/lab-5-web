from flask import Flask, jsonify, request
from flask_cors import CORS 
import uuid

app = Flask(__name__)
CORS(app) 

shoes = [
    {
        "id": "1",
        "name": "Adidas Campus",
        "size": "39",
        "color": "Gray",
        "price": "120",
        "image": "images/campus.jpg" 
    },
    {
        "id": "2",
        "name": "Asics Tiger",
        "size": "42",
        "color": "Black",
        "price": "100",
        "image": "images/tiger.jpg"
    }
]


@app.route('/shoes', methods=['GET'])
def getShoes():
    return jsonify(shoes), 200

@app.route('/shoes', methods=['POST'])
def add_shoe():
    data = request.json 
    
    new_shoe = {
        "id": str(uuid.uuid4()),
        "name": data.get("name"),
        "size": data.get("size"),
        "color": data.get("color"),
        "price": data.get("price"),
        "image": data.get("image")
    }
    
    shoes.append(new_shoe)
    
    return jsonify(new_shoe), 201 

@app.route('/shoes/<string:shoe_id>', methods=['PUT'])
def update_shoe(shoe_id):
    data = request.json
    
    index = next((i for i, shoe in enumerate(shoes) if shoe["id"] == shoe_id), None)
    
    if index is None:
        return jsonify({"message": "Shoe not found"}), 404
    
    shoes[index].update(data)
    
    return jsonify(shoes[index]), 200

@app.route('/shoes/<string:shoe_id>', methods=['DELETE'])
def delete_shoe(shoe_id):
    global shoes 
    
    initial_length = len(shoes)
    shoes = [shoe for shoe in shoes if shoe["id"] != shoe_id]
    
    if len(shoes) < initial_length:
        return '', 204 
    else:
        return jsonify({"message": "Shoe not found"}), 404
    
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
    