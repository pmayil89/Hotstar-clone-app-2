import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

function FromAws() {
  let initialState = {
    id: "",
    todo: "",
    description: "",
    createdAt: null,
  };
  const [todoList, settodoList] = useState([]);
  const [todo, settodo] = useState("");
  const [description, setdescription] = useState("");
  const [id, setid] = useState("");
  const [updated, setIsUpdated] = useState(true);
  const [url, seturl] = useState(
    "http://ec2-3-110-159-94.ap-south-1.compute.amazonaws.com:8080/todos"
  );

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    axios
      .get(url, config)
      .then((res) => {
        settodoList(res.data);
      })
      .catch((err) => console.log(err));
  }, [updated]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let initialState = {
      id: id,
      todo: todo,
      description: description,
      createdAt: new Date(),
    };

    axios
      .post(url, initialState)
      .then((x) => {
        console.log("submitted");
        setIsUpdated(!updated);
        SetInitialState();
      })
      .catch((e) => console.log("Error", e));
  };

  const SetInitialState = () => {
    setid("");
    settodo("");
    setdescription("");
  };

  return (
    <Container>
      <TodoContent>
        <Tododata>
          <TableHeader>Id</TableHeader>
          <TableHeader>Todo</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader>CreatedAt</TableHeader>
        </Tododata>
        {todoList.map((item, idx) => {
          return (
            <Tododata>
              <TodoDetails>{item.id}</TodoDetails>
              <TodoDetails>{item.todo}</TodoDetails>
              <TodoDetails>{item.description}</TodoDetails>
              <TodoDetails>{item.createdAt}</TodoDetails>
            </Tododata>
          );
        })}
      </TodoContent>
      <form method="post">
        <Formdata>
          <label for="id">Id</label>
          <input
            type="text"
            name="id"
            value={id}
            onChange={(e) => setid(e.target.value)}
            required
          />
          <label for="todo">Todo</label>
          <input
            type="text"
            value={todo}
            name="todo"
            onChange={(e) => settodo(e.target.value)}
            required
          />
          <label for="description">Description</label>
          <input
            name="description"
            value={description}
            type="text"
            onChange={(e) => setdescription(e.target.value)}
            required
          />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </Formdata>
      </form>
    </Container>
  );
}

export default FromAws;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh-250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);
`;

const TodoContent = styled.table`
  padding: 0;
  margin: 0;
  width: 100%;
`;

const Tododata = styled.tr``;
const Formdata = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  row-gap: 10px;
  margin-top: 30px;
`;

const TodoDetails = styled.td`
  text-align: left;
  padding: 6px;
  border-collapse: initial;
  border: 1px solid #ccc;
`;
const TableHeader = styled.th`
  text-align: left;
  padding: 6px;
  border: 1px solid #ccc;
  border-collapse: initial;
`;
