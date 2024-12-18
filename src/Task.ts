import _ from "lodash"

class Task {
    public name: string = "";
    public value: string = "";
    public status: boolean = false;
    public items: Task[] = [];
    public total: number = 0;
    public done: number = 0;
    public process: string = "";

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
        const total = _.sum(_.map(res.items, "total"))
        const done = _.sum(_.map(res.items, "done"))
        res.total = total
        res.done = done
        res.process = `${done}/${total}`
        return res
    }

    public static fromLevel2(req: any): Task {
        const res = new Task()
        res.name = _.get(req, "name") || ""
        res.value = _.get(req, "value") || ""
        res.items = _.map(_.get(req, "items"), Task.fromItem)
        const total = _.size(res.items)
        const done = _.size(_.filter(res.items, (i: Task) => i.done))
        res.total = total
        res.done = done
        res.process = `${done}/${total}`
        return res
    }

}

export default Task