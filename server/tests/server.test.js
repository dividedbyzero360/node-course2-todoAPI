const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var hexId = todos[0]._id.toHexString();
    var text = 'This should be the new text';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var hexId = todos[1]._id.toHexString();
    var text = 'This should be the new text!!';

    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();
      })
      .end(done);
  });
});
















// const expect=require("expect");
// const request = require('supertest');

// const {app}=require("./../server");
// const {Todo}=require("./../models/todo");


// // describe("Simple Test",()=>{
// // it("dx",(done)=>{
// //   done(new Error("dx1"));
// // });
// // });




//   describe('POST /todos', () => {

//     beforeEach((done)=> {
//         Todo.remove({}).then(()=>{
//             console.log("Happened");
//             done();
//         })
//       });
//     it('should create a new todo', (done) => {
//         var text="from testing";
//         request(app)
//         .post("/todos")
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) =>{
//             if (err) {
//                 return done(err);
//             }
//             Todo.find().then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//               }).catch((e) => done(e));
//           });
//     });

//     it('should not create todo with invalid body data', (done) => {
//         request(app)
//           .post('/todos')
//           .send({})
//           .expect(400)
//           .end((err, res) => {
//             if (err) {
//               console.log("GOT here on expect fail");  
//               return done(err);
//             }
    
//             Todo.find().then((todos) => {
//               expect(todos.length).toBe(0);
//               done();
//             }).catch((e) => done(e));
//           });
//       });

//   });

//   describe('GET /todos', () => {
//       var text="Testing input";
//     before((done)=> {
//        var newTodo=new Todo({
//             text
//        });
//        newTodo.save().then(doc=>done());
//       });

//       after((done)=>{
//         Todo.remove({}).then(()=>{
//             done();
//         })
//       });

//       it("should return one todo",(done)=>{
//         request(app)
//         .get("/todos")
//         .expect(200)
//         .expect((res)=>{
//            expect(res.body.todos.length).toBe(1);
//            expect(res.body.todos[0].text).toBe("Testing input")
//         }).end(done);
//       })
//   });