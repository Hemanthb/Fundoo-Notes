import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

let token = "";
let newResetToken = "";
let noteId = "";

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // 1 - Test case for user registration
  describe('UserRegistration', () => {
    const inputBody = {
      "FirstName":"Hemanth",
      "LastName":"B",
      "EmailId":"hb081993@gmail.com",
      "Password":"hemanth123"
    }
    it('Given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  //2 - User registration with Invalid data
  describe('UserRegistration', () => {
    const inputBody = {
      FirstName: "He",
      LastName: "B",
      EmailId: "hem@gmail.com",
      Password: "12345678"
    }
    it('Given Invalid data should throw corresponding error', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  //3 - Test case for User Login
  describe('UserLogin', () => {
    const inputBody = {
      "EmailId":"hb081993@gmail.com",
      "Password":"hemanth123"
    }
    it('Given user Login details should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          token = res.body.data;
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });


  //4 - user Login with Invalid password
  describe('UserLogin', () => {
    const inputBody = {
      "EmailId":"hb081993@gmail.com",
      "Password":"hemant123"
    }
    it('Given Invalid Pwd for login should get an error', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  //5 - Test case for forgot password
  describe('Forgot Password', () => {
    const inputBody = {
      "EmailId":"hb081993@gmail.com",
    }
    it('Given user mailId should check details in DB and send mail with reset link', (done) => {
      request(app)
        .post('/api/v1/users/forgetPwd')
        .send(inputBody)
        .end((err, res) => {
          newResetToken = res.body.data;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });


  //6 - Test case for forgot password with Invalid Emaild
  describe('Forgot Password', () => {
    const inputBody = {
      "EmailId":"hb08199@gmail.com",
    }
    it('Given Invalid user mailId should throw an error', (done) => {
      request(app)
        .post('/api/v1/users/forgetPwd')
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });  


  //7 - Test case for reset password
  describe('Reset Password', () => {
    const inputBody = {
      "Password":"12345678",
    }
    it('Given new password should get updated in the database', (done) => {
      request(app)
        .put('/api/v1/users/resetPwd')
        .set('authorization',`Bearer ${newResetToken}`)
        .send(inputBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  //8 - To test add note function
  describe('AddNote', () => {
    const inputBody = {
      "Title":"Design patterns",
      "Description":"Understanding DP principles",
      "Colour":"white",
      "IsArchived":"true",
      "IsTrashed":"false"
    }
    it('Given new note details should be saved in database', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .set('authorization',`Bearer ${token}`)
        .send(inputBody)
        .end((err, res) => {
          noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  //9 - Create new note without proper authentication
  describe('AddNote', () => {
    const inputBody = {
      "Title":"Design patterns",
      "Description":"Understanding DP principles",
      "Colour":"white",
      "IsArchived":"true",
      "IsTrashed":"false"
    }
    it('Given new note details without authentication should throw error', (done) => {
      request(app)
        .post('/api/v1/notes/add')
        .set('authorization',`${token}`)
        .send(inputBody)
        .end((err, res) => {
          //noteId = res.body.data._id;
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });


  //10 - Test case to get all notes for a respective user
  describe('Get Notes', () => {
    it('Given user login details should fetch saved notes', (done) => {
      request(app)
        .get('/api/v1/notes')
        .set('authorization',`Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
});

//11 - Test case to get all notes without authorization
describe('Get Notes', () => {
  it('Given invalid authorization should throw error', (done) => {
    request(app)
      .get('/api/v1/notes')
      .set('authorization',`${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(400);
        done();
      });
  });
});


//12 - update a note
describe('Update Notes Details', () => {
  it('given the note id of a user should update the note respectively ', (done) => {
    const inputBody = {
      "Colour":"violet"
    };
    request(app)
      .put(`/api/v1/notes/${noteId}`)
      .send(inputBody)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(202);
        done();
      });
    });
  });

  //13 - update a note with invalid id
describe('Update Notes Details', () => {
  it('given no id or invalid id should throw error ', (done) => {
    const inputBody = {
      "Colour":"violet"
    };
    request(app)
      .put(`/api/v1/notes`)
      .send(inputBody)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
  });


  //14 - delete a note
describe('Delete a Note', () => {
  it('given the note id of a user should delete the note respectively ', (done) => {
    request(app)
      .delete(`/api/v1/notes/${noteId}`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    
  });
});

//15 - delete a note without proper Id
describe('Delete a Note', () => {
  it('given the invalid note id or no id should throw error ', (done) => {
    request(app)
      .delete(`/api/v1/notes`)
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    
  });
});