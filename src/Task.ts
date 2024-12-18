import _ from "lodash"

class Task {
    public name: string = "";
    public value: string = "";
    public status: boolean = false;
    public items: Task[] = [];

    public static fromItem(req: any): Task {
        const res = new Task()
        res.name = _.get(req, "name") || ""
        res.value = _.get(req, "value") || ""
        res.status = _.get(req, "status") || false
        return res
    }

    public static fromLevel1(req: any): Task {
        const res = new Task()
        res.name = _.get(req, "name") || ""
        res.value = _.get(req, "value") || ""
        res.items = _.map(_.get(req, "items"), Task.fromLevel2)
        return res
    }

    public static fromLevel2(req: any): Task {
        const res = new Task()
        res.name = _.get(req, "name") || ""
        res.value = _.get(req, "value") || ""
        res.items = _.map(_.get(req, "items"), Task.fromItem)
        return res
    }

}

export default Task