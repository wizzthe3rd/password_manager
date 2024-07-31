from flask import request, jsonify
from config import app, db
from models import Account


@app.route("/accounts", methods=["GET"])
def get_accounts():
    accounts = Account.query.all()
    json_accounts = list(map(lambda x: x.to_json(), accounts))
    return jsonify({"accounts": json_accounts})


@app.route("/remove_account/<int:user_id>", methods=["DELETE"])
def remove_account(user_id):
    account = Account.query.get(user_id)

    if not account:
        return jsonify({"message": "Account not found!"}), 404

    db.session.delete(account)
    db.session.commit()

    return jsonify({"message": "Account deleted successfully!"}), 200


@app.route("/update_account/<int:user_id>", methods=["PATCH"])
def update_account(user_id):
    account = Account.query.get(user_id)

    if not account:
        return jsonify({"message": "Account not found!"}), 404

    data = request.json
    account.site_name = data.get("siteName", account.siteName)
    account.email = data.get("email", account.email)
    account.password = data.get("password", account.password)

    db.session.commit()

    return jsonify({"message": "Account successfully updated!"}), 200


@app.route("/add_account", methods=["POST"])
def create_account():
    site_name = request.json.get("siteName")
    email = request.json.get("email")
    password = request.json.get("password")

    if not email or not password:
        return jsonify({"message": "You must include a site name, email and a password!"}), 400

    new_account = Account(site_name=site_name, email=email, password=password)
    try:
        db.session.add(new_account)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Account added!"}), 201


if __name__ == "__main__":
    app.run(debug=True)