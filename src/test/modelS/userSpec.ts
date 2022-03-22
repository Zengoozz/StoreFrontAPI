import { User, UserModel } from "../../model/userModel";

const model = new UserModel();

describe("User Model Test:", (): void => {
  it("Index method is existed.", () => {
    expect(model.index).toBeDefined();
  });

  it("Show method is existed.", (): void => {
    expect(model.show).toBeDefined();
  });

  it("Create method is existed.", (): void => {
    expect(model.create).toBeDefined();
  });

  it("Create & Show methods functionality: created and showd usernames and passwords to be matched.", async (): Promise<void> => {
    const user: User = {
      username: "u1",
      first_name: "first",
      last_name: "last",
      password: "pass"
    };
    const newUser = await model.create(user);
    const listedUser = await model.show(newUser.id as number);


    expect(listedUser.username).toEqual(user.username);
  });

  it("Index method functionality: listed users to be matched by username and indexed.", async (): Promise<void> => {
    const user: User = {
      username: "u2",
      first_name: "first2",
      last_name: "last2",
      password: "pass2"
    };
    const newUser = await model.create(user);
    const listedUser = await model.index();

    expect(listedUser[1].username).toEqual('u1');
    expect(listedUser[2].username).toEqual('u2');
  });

});
