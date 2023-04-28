
const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskApi {
  #request(method, data = {}){
    const {body, params} = data;
    const req = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if(body){
      req.body = JSON.stringify(body);
    }
    let url = taskApiUrl;
    if(params){
      url = `${url}/${params}`;
    }
    return fetch(url, req)
    .then((result) => result.json())
    .then((data) => {
      if(data.error){
        throw data.error;
      }
      return data;
    });
  }

  getAll() {
      return this.#request("GET");
  }
  add(task) {
    return this.#request("POST", {body: task});
  };

  update(editedTask) {
    return this.#request("PUT", {body: editedTask, params: editedTask._id});
  };
  delete(taskId) {
    return this.#request("DELETE", {params: taskId});
  };
  deleteMany(taskIds) {
    return this.#request("PATCH", {body: {tasks: taskIds}});
  }
}