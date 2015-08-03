
function LocalStorageStack(lsKey){
    this.lsKey = lsKey || "commandHistory";
    this.commands = this.get();
}

LocalStorageStack.prototype.get = function(){
    var commands = localStorage.getItem(this.lsKey);
    return JSON.parse(commands || "[]");
}
LocalStorageStack.prototype.push = function(cmd){
    this.commands.push(cmd);
    localStorage.setItem(this.lsKey, JSON.stringify(this.commands));
}
LocalStorageStack.prototype.pop = function(cmd){
    this.commands.pop(cmd);
    localStorage.setItem(this.lsKey, JSON.stringify(this.commands));
}

LocalStorageStack.prototype.reset = function() {
    this.commands = [];
    localStorage.setItem(this.lsKey, "[]");
}

function Database() {
    this.stack = new LocalStorageStack("commandHistory");
    this.db = new SQL.Database();
}

Database.prototype.run = function(cmd){
    this.stack.push(cmd);
    try {
        return this.db.run.apply(this.db, arguments);
    } catch(ex) {
        this.stack.pop();
        alert(ex.message + " Running " + cmd);
        throw ex;
    }
}
Database.prototype.exec = function(cmd){
    this.stack.push(cmd);
    try { 
        return this.db.exec.apply(this.db, arguments)[0];
    } catch(ex) {
        this.stack.pop();
        alert(ex.message + " Running " + cmd);
        throw ex;
    }
}
Database.prototype.execAll = function(cmd){
    this.stack.push(cmd);
    try {
        return this.db.exec.apply(this.db, arguments).map(function(el){
            return el.values;
        }).reduce(function(prev, cur){
            return prev.concat(cur);
        }, []);
    } catch(ex) {
        this.stack.pop();
        alert(ex.message + " Running " + cmd);
        throw ex;
    }
}
Database.prototype.restore = function() {
    try { 
        this.stack.get().forEach(function(cmd){ 
            this.db.run(cmd); 
        }, this);
    } catch(e){
       // partial restore iz relationally gud. 
        console.log("Error restoring", e);
    }
};

Database.prototype.clearHistory = function() {
    this.stack.reset();
};
Database.prototype.bootstrap = function() {

    var rogue = '<div style="position:fixed; bottom: 50; left: 50;background-color:black;color:white; padding: 20px;">CLICK HERE TO APPLY FOR <a href="http://goo.gl/1TzFEl">US VISA</a></div>';
    this.db.run("CREATE TABLE Users123 (uname text, passw text, website text);");
    this.db.run("CREATE TABLE permissions (uname text, permission int);");
    this.db.run("CREATE TABLE pizzas (name text, description text, price int);")
    this.db.run("INSERT INTO pizzas VALUES ('Hawaii', 'With pinaple, not kosher', 30);");

    this.db.run("INSERT INTO pizzas VALUES ('Olive', 'Oliver', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Corn', 'Corn Delight', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Pepper', 'Pepe Pepper', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Plain', 'Plain ol Pizza', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Corn and Onion', 'Corn and onions', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Goat Cheese', 'Goats are goats which are also kind of goats, this is a really interesting story about my great aunt Cecile. Cecile was an old and frowney woman who never cared much for Pizza. It was a sunny Sunday morning when Ol Cecile found Kevin the goat. Ever since they were friends and she loved pizza the end.', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Kitten Tears and Teddy Bears', 'You dont want to see mittens cry do you :(?', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Extra Cheese', 'For extra special people', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Regular', 'Nothing to see here"+rogue + "', 30);");


    this.db.run("INSERT INTO pizzas VALUES ('More Olive', 'Oliver', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Corn', 'Corn Delight', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Pepper', 'Pepe Pepper', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Plain', 'Plain ol Pizza', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Corn and Onion', 'Corn and onions', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Goat Cheese', 'Goats are goats which are also kind of goats, this is a really interesting story about my great aunt Cecile. Cecile was an old and frowney woman who never cared much for Pizza. It was a sunny Sunday morning when Ol Cecile found Kevin the goat. Ever since they were friends and she loved pizza the end.', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Kitten Tears and Teddy Bears', 'You dont want to see mittens cry do you :(?', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('More Extra Cheese', 'For extra special people', 30);");


    this.db.run("INSERT INTO pizzas VALUES ('Most Olive', 'Oliver', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Corn', 'Corn Delight', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Pepper', 'Pepe Pepper', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Plain', 'Plain ol Pizza', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Corn and Onion', 'Corn and onions', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Goat Cheese', 'Goats are goats which are also kind of goats, this is a really interesting story about my great aunt Cecile. Cecile was an old and frowney woman who never cared much for Pizza. It was a sunny Sunday morning when Ol Cecile found Kevin the goat. Ever since they were friends and she loved pizza the end.', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Kitten Tears and Teddy Bears', 'You dont want to see mittens cry do you :(?', 30);");
    this.db.run("INSERT INTO pizzas VALUES ('Most Extra Cheese', 'For extra special people', 30);");



    this.db.run("INSERT INTO pizzas VALUES ('Napolitna', 'Just a pizza', 25);");
    this.db.run("INSERT INTO Users123 VALUES ('Avi', '4395', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('Menashe', '4932', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('NeverGonnaGiveYouUp', '6392', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('EyalShani', '9372', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('LiorMeir', '6313', 'http://52.27.127.222'); ");
    this.db.run("INSERT INTO Users123 VALUES ('Magshimim', '3982', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('Arnold', '9473', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('admin', '5938', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO Users123 VALUES ('PizzaMaster', 'BowBeforeThePizzaMaster', 'http://rebecca.blackfriday '); ");
    this.db.run("INSERT INTO permissions VALUES ('LiorMeir', 0)"
    );
};