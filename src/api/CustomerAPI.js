function calculateAge(dob) {
    const birth = new Date(dob)
    const today = new Date()

    var years = (today.getFullYear() - birth.getFullYear());

    if ((today.getMonth() < birth.getMonth()) ||
        (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) {
        years--;
    }

    return years;
}

function currentFormatDate() {
    var currentdate = new Date();
    var time = currentdate.getHours() + ':' + currentdate.getMinutes() + ':' + currentdate.getSeconds();
    currentdate = currentdate.toDateString() + " " + time;
    return currentdate;
}

// add customer given name, dob, email
export function addCustomer(users, fName, lname, email, dob) {
    users = JSON.parse(JSON.stringify(users));
    users = users || [];
    users.push({
        "id": users.length + 1,
        "name": fName + " " + lname,
        "email": email,
        "dob": dob.getDate() + '/' + (dob.getMonth() + 1) + '/' + dob.getFullYear(),
        "age": calculateAge(dob),
        "created": currentFormatDate(),
        "updated": currentFormatDate()
    })
    return users;
}

// update customer
export function updateCustomer(users, fName, lname, email, dob) {
    users = JSON.parse(JSON.stringify(users));
    users = users || [];

    // email already exists
    for (var i = 0; i < users.length; i++) {
        if (users[i]["email"] === email) {
            users[i] = {
                "id": users[i]["id"],
                "name": fName + " " + lname,
                "email": email,
                "dob": dob.getDate() + '/' + (dob.getMonth() + 1) + '/' + dob.getFullYear(),
                "age": calculateAge(dob),
                "created": users[i]["created"],
                "updated": currentFormatDate()
            }
            return users;
        }
    }
    return false
}

// check if email exists
export function doesEmailExist(users, email) {
    users = users || [];

    for (var i = 0; i < users.length; i++) {
        if (users[i]["email"] === email) {
            return true;
        }
    }
    return false;
}

// given email that exists, get details
export function getUserDetails(users, email) {
    users = JSON.parse(JSON.stringify(users));
    users = users || [];
    for (var i = 0; i < users.length; i++) {
        if (users[i]["email"] === email) {
            return {
                "firstname": users[i]["name"].split(" ")[0],
                "lastname": users[i]["name"].split(" ")[1],
                "dob": users[i]["dob"]
            }
        }
    }
    return false;
}