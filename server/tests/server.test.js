const expect=require("expect");
const request = require('supertest');

const {app}=require("./../server");
const {Todo}=require("./../models/todo");


// describe("Simple Test",()=>{
// it("dx",(done)=>{
//   done(new Error("dx1"));
// });
// });




  describe('POST /todos', () => {

    beforeEach((done)=> {
        Todo.remove({}).then(()=>{
            console.log("Happened");
            done();
        })
      });
    it('should create a new todo', (done) => {
        var text="from testing";
        request(app)
        .post("/todos")
        .send({text})
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
        })
        .end((err, res) =>{
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
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
              console.log("GOT here on expect fail");  
              return done(err);
            }
    
            Todo.find().then((todos) => {
              expect(todos.length).toBe(0);
              done();
            }).catch((e) => done(e));
          });
      });

  });

  describe('GET /todos', () => {
      var text="Testing input";
    before((done)=> {
       var newTodo=new Todo({
            text
       });
       newTodo.save().then(doc=>done());
      });

      after((done)=>{
        Todo.remove({}).then(()=>{
            done();
        })
      });

      it("should return one todo",(done)=>{
        request(app)
        .get("/todos")
        .expect(200)
        .expect((res)=>{
           expect(res.body.todos.length).toBe(1);
           expect(res.body.todos[0].text).toBe("Testing input")
        }).end(done);
      })
  });