function ListStudent() {
    this.list = [];
    
    this.AddStudent = function(sv) {
        this.list.push(sv);
    };

    this.DeleteStudent = function(ID) {
        this.list.splice(ID, 1);
    }

    this.UpdateStudent = function(sv, id){
        this.list[id] = sv;
    }

    this.FindStudent = function(name){
        let rs = new ListStudent();
        rs.list = this.list.filter(student => student.hoten.toLowerCase().search(name.toLowerCase()) != -1);
        return rs;
    }
}
